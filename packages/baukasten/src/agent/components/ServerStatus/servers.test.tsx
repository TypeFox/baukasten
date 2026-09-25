import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { serverId } from '../../types';
import type { ServerDescriptor, ToolDescriptor, UsageReadout } from '../../servers';
import { ServerList, ServerStatus } from './ServerStatus';
import { ToolPicker } from '../ToolPicker';
import { ResourcePreview } from '../ResourcePreview';
import { UsageMeter } from '../UsageMeter';

const ALPHA = serverId('alpha');
const BETA = serverId('beta');

function server(overrides: Partial<ServerDescriptor> = {}): ServerDescriptor {
    return { id: ALPHA, name: 'Telemetry tools', ...overrides };
}

describe('ServerStatus (T-58)', () => {
    it('says what is known rather than claiming a connection', () => {
        render(<ServerStatus server={server()} />);

        // There is no handshake in MCP 2026-07-28, so "not used yet" is the
        // honest state — not "disconnected", which would describe a machine
        // that no longer exists.
        expect(screen.getByText('Not used yet')).toBeInTheDocument();
    });

    it('shows a protocol mismatch with both versions, not just "incompatible"', () => {
        render(
            <ServerStatus
                server={server({
                    protocolVersion: '2025-06-18',
                    expectedProtocolVersion: '2026-07-28',
                })}
            />,
        );

        // The adapter refuses to map an unknown revision, and the user meeting
        // that failure needs to see which two versions disagree to act on it.
        expect(screen.getByText(/Advertises 2025-06-18/)).toBeInTheDocument();
        expect(screen.getByText(/this client speaks 2026-07-28/)).toBeInTheDocument();
    });

    it('treats a mismatch as the health state, whatever else was reported', () => {
        const { container } = render(
            <ServerStatus
                server={server({
                    health: 'ok',
                    protocolVersion: '2025-06-18',
                    expectedProtocolVersion: '2026-07-28',
                })}
            />,
        );

        // Responding correctly to a protocol we cannot speak is not "ok".
        expect(container.firstElementChild).toHaveAttribute('data-health', 'incompatible');
    });

    it('titles the name with the client-minted id, which is what disambiguates', () => {
        render(<ServerStatus server={server()} />);
        // `serverInfo.name` is explicitly not unique; two installs share it.
        expect(screen.getByText('Telemetry tools')).toHaveAttribute('title', 'alpha');
    });

    it('offers a refresh that identifies which server it is for', () => {
        const onRefresh = vi.fn();
        render(<ServerStatus server={server()} onRefresh={onRefresh} />);

        fireEvent.click(screen.getByRole('button', { name: /Check again/ }));
        expect(onRefresh).toHaveBeenCalledWith(ALPHA);
    });

    it('orders a list worst-first', () => {
        render(
            <ServerList
                servers={[
                    server({ id: ALPHA, name: 'Healthy', health: 'ok' }),
                    server({ id: BETA, name: 'Broken', health: 'unreachable' }),
                ]}
            />,
        );

        // The list is looked at when something is wrong; alphabetical order
        // would bury it.
        const cards = screen.getAllByText(/Healthy|Broken/);
        expect(cards[0]).toHaveTextContent('Broken');
    });
});

describe('ToolPicker (T-59)', () => {
    const tools: ToolDescriptor[] = [
        { name: 'search', serverId: ALPHA, description: 'Search the index' },
        { name: 'search', serverId: BETA, description: 'Search the wiki' },
        {
            name: 'deploy',
            serverId: ALPHA,
            availability: 'rejected',
            unavailableReason: 'Invalid x-mcp-header value',
        },
    ];

    it('keys by server, so two servers exposing the same name stay separate', () => {
        const onChange = vi.fn();
        render(
            <ToolPicker
                tools={tools}
                enabled={{ [ALPHA]: ['search'] }}
                onChange={onChange}
                servers={[server({ id: ALPHA, name: 'Alpha' }), server({ id: BETA, name: 'Beta' })]}
            />,
        );

        const beta = screen.getByText('Beta').closest('section')!;
        fireEvent.click(within(beta).getByLabelText('search'));

        // The specification's own collision example. A flat set of names would
        // have turned both on.
        expect(onChange).toHaveBeenCalledWith({ alpha: ['search'], beta: ['search'] });
    });

    it('shows a rejected tool with its reason instead of dropping it', () => {
        render(<ToolPicker tools={tools} enabled={{}} onChange={() => undefined} />);

        // A client MUST exclude these from tools/list and SHOULD log the name
        // and reason. Vanishing silently is how a missing tool becomes a
        // support ticket.
        expect(screen.getByText('Invalid x-mcp-header value')).toBeInTheDocument();
        expect(screen.getByLabelText('deploy')).toBeDisabled();
    });

    it('counts only what could be turned on', () => {
        render(
            <ToolPicker
                tools={tools}
                enabled={{ [ALPHA]: ['search'] }}
                onChange={() => undefined}
                servers={[server({ id: ALPHA, name: 'Alpha' })]}
            />,
        );

        const alpha = screen.getByText('Alpha').closest('section')!;
        // One of one — the rejected tool is shown but is not a choice.
        expect(within(alpha).getByText('1/1')).toBeInTheDocument();
    });

    it('turning a whole server on skips the tools that cannot be enabled', () => {
        const onChange = vi.fn();
        render(
            <ToolPicker
                tools={tools}
                enabled={{}}
                onChange={onChange}
                servers={[server({ id: ALPHA, name: 'Alpha' })]}
            />,
        );

        fireEvent.click(screen.getByLabelText('All tools from Alpha'));
        expect(onChange).toHaveBeenCalledWith({ alpha: ['search'] });
    });
});

describe('ResourcePreview (T-60)', () => {
    it('renders every content a read returned, not the first', () => {
        render(
            <ResourcePreview
                resource={{ uri: 'file:///src', name: 'src' }}
                contents={[
                    { uri: 'file:///src/a.ts', name: 'a.ts', text: 'alpha' },
                    { uri: 'file:///src/b.ts', name: 'b.ts', text: 'beta' },
                ]}
            />,
        );

        // A directory resource returns one content per file; rendering
        // contents[0] silently drops the rest.
        expect(screen.getByText('alpha')).toBeInTheDocument();
        expect(screen.getByText('beta')).toBeInTheDocument();
    });

    it('says so when a URI can be read but not looked up', () => {
        render(<ResourcePreview resource={{ uri: 'file:///tmp/x', listed: false }} />);

        // A tool's resource_link need not appear in resources/list, so this is
        // normal — but a reader seeing no metadata deserves to know whether
        // that means empty or unknowable.
        expect(screen.getByText(/Not listed by its server/)).toBeInTheDocument();
    });

    it('falls back to the URI, the only thing guaranteed to exist', () => {
        render(<ResourcePreview resource={{ uri: 'file:///tmp/x' }} />);
        expect(screen.getByText('file:///tmp/x')).toBeInTheDocument();
    });

    it('withholds a preview past the size limit, and offers it', () => {
        render(
            <ResourcePreview
                resource={{ uri: 'file:///big.bin', size: 40 * 1024 * 1024 }}
                contents={[{ text: 'enormous' }]}
            />,
        );

        expect(screen.queryByText('enormous')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Show anyway' }));
        expect(screen.getByText('enormous')).toBeInTheDocument();
    });

    it('names what it cannot draw rather than rendering an empty box', () => {
        render(
            <ResourcePreview
                resource={{ uri: 'file:///x.wasm' }}
                contents={[{ mimeType: 'application/wasm', blob: 'AGFzbQ==' }]}
            />,
        );

        expect(screen.getByText('No preview for application/wasm')).toBeInTheDocument();
    });
});

describe('UsageMeter (T-62)', () => {
    const usage: UsageReadout = {
        used: 48_000,
        total: 200_000,
        toolTokens: 12_000,
        toolCount: 47,
        cost: 0.42,
        currency: 'USD',
    };

    it('explains where the window went', () => {
        render(<UsageMeter usage={usage} />);
        expect(
            screen.getByText(/47 tools loaded · 12k tokens before you type/),
        ).toBeInTheDocument();
    });

    it('hides cost unless asked, because some clients may not show it', () => {
        const { rerender } = render(<UsageMeter usage={usage} />);
        expect(screen.queryByText(/0\.42/)).not.toBeInTheDocument();

        rerender(<UsageMeter usage={usage} showCost />);
        expect(screen.getByText('0.42 USD')).toBeInTheDocument();
    });

    it('draws no bar without a total, since a fill with no denominator is decoration', () => {
        render(<UsageMeter usage={{ used: 1000 }} />);

        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        expect(screen.getByText('1.0k')).toBeInTheDocument();
    });

    it('changes tone as the window fills', () => {
        const { container, rerender } = render(<UsageMeter usage={{ used: 10, total: 100 }} />);
        expect(container.firstElementChild).toHaveAttribute('data-tone', 'normal');

        rerender(<UsageMeter usage={{ used: 80, total: 100 }} />);
        expect(container.firstElementChild).toHaveAttribute('data-tone', 'warning');

        rerender(<UsageMeter usage={{ used: 95, total: 100 }} />);
        expect(container.firstElementChild).toHaveAttribute('data-tone', 'danger');
    });
});
