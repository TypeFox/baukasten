import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { serverId } from '../../types';
import type { ProtocolMessage } from '../../servers';
import { ProtocolLog } from './ProtocolLog';

const ALPHA = serverId('alpha');

const messages: ProtocolMessage[] = [
    {
        id: '1',
        direction: 'outgoing',
        method: 'tools/call',
        serverId: ALPHA,
        requestId: 'req-1',
        correlationId: 'op-1',
        payload: { params: { name: 'search', _meta: { requestState: 'AEAD:secret' } } },
        durationMs: 12.4,
    },
    {
        id: '2',
        direction: 'incoming',
        method: 'response',
        serverId: ALPHA,
        requestId: 'req-1',
        correlationId: 'op-1',
        payload: { result: { ok: true } },
    },
    // Same operation, fresh transport id — the retry shape that makes a
    // stateless protocol hard to follow in a plain log.
    {
        id: '3',
        direction: 'outgoing',
        method: 'tools/call',
        serverId: ALPHA,
        requestId: 'req-2',
        correlationId: 'op-1',
        payload: { params: { name: 'search' } },
    },
    {
        id: '4',
        direction: 'incoming',
        method: 'error',
        method_: undefined,
        serverId: ALPHA,
        correlationId: 'op-2',
        error: { code: -32603, message: 'Index is cold' },
        payload: {},
    } as ProtocolMessage,
];

function Harness(props: Partial<React.ComponentProps<typeof ProtocolLog>> = {}) {
    const [filter, setFilter] = useState('');
    const [reveal, setReveal] = useState(false);

    return (
        <ProtocolLog
            messages={messages}
            filter={filter}
            onFilterChange={setFilter}
            reveal={reveal}
            onRevealChange={setReveal}
            {...props}
        />
    );
}

describe('ProtocolLog (T-61)', () => {
    it('lists the traffic', () => {
        render(<Harness />);
        expect(screen.getAllByRole('button', { name: /tools\/call/ })).toHaveLength(2);
    });

    it('redacts requestState by default, and only reveals on a deliberate act', () => {
        render(<Harness />);
        fireEvent.click(screen.getAllByRole('button', { name: /tools\/call/ })[0]);

        // Servers put integrity-protected authorization context here and
        // clients must not inspect it; printing it by default would put a
        // credential in every screenshot taken of this component.
        expect(screen.getByText(/\[redacted\]/)).toBeInTheDocument();
        expect(screen.queryByText(/AEAD:secret/)).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('checkbox', { name: /show redacted/i }));
        expect(screen.getByText(/AEAD:secret/)).toBeInTheDocument();
    });

    it('offers the reveal as a visible control, not only a prop', () => {
        render(<Harness />);

        // So that withholding is legible, and turning it off is something the
        // reader did rather than a setting they inherited.
        expect(screen.getByRole('checkbox', { name: /show redacted/i })).toBeInTheDocument();
    });

    it('groups a retry chain back to one operation', () => {
        render(<Harness />);

        // Three messages share `op-1`. Under a stateless protocol every retry
        // carries a fresh transport id, so this is the thing a text log cannot
        // give you.
        expect(screen.getAllByTitle('3 messages for this operation').length).toBeGreaterThan(0);
    });

    it('does not mark a lone message as a chain', () => {
        render(<Harness />);
        expect(screen.queryByTitle('1 messages for this operation')).not.toBeInTheDocument();
    });

    it('can be told not to correlate at all', () => {
        render(<Harness correlate={false} />);
        expect(screen.queryByTitle(/messages for this operation/)).not.toBeInTheDocument();
    });

    it('filters by method, server and error message', () => {
        render(<Harness />);
        const input = screen.getByRole('textbox', { name: 'Filter traffic' });

        fireEvent.change(input, { target: { value: 'response' } });
        expect(screen.getAllByRole('button', { name: /response/ })).toHaveLength(1);
        expect(screen.queryByRole('button', { name: /tools\/call/ })).not.toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'index is cold' } });
        expect(screen.getAllByRole('button', { name: /error/ })).toHaveLength(1);
    });

    it('says how much it is hiding', () => {
        render(<Harness />);
        fireEvent.change(screen.getByRole('textbox', { name: 'Filter traffic' }), {
            target: { value: 'response' },
        });

        expect(screen.getByText('1 of 4')).toBeInTheDocument();
    });

    it('reports a filter change rather than owning it', () => {
        const onFilterChange = vi.fn();
        render(<ProtocolLog messages={messages} filter="" onFilterChange={onFilterChange} />);

        fireEvent.change(screen.getByRole('textbox', { name: 'Filter traffic' }), {
            target: { value: 'x' },
        });
        expect(onFilterChange).toHaveBeenCalledWith('x');
    });

    it('collapses a payload that was open when clicked again', () => {
        render(<Harness />);
        const row = screen.getAllByRole('button', { name: /tools\/call/ })[0];

        fireEvent.click(row);
        expect(row).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(row);
        expect(row).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows an empty state only when a filter hides everything', () => {
        render(<Harness empty="Nothing yet" />);
        expect(screen.queryByText('Nothing yet')).not.toBeInTheDocument();

        fireEvent.change(screen.getByRole('textbox', { name: 'Filter traffic' }), {
            target: { value: 'zzzz' },
        });
        expect(screen.getByText('Nothing yet')).toBeInTheDocument();
    });

    it('accepts extra keys to redact on top of the built-ins', () => {
        render(
            <ProtocolLog
                messages={[
                    {
                        id: 'x',
                        direction: 'outgoing',
                        method: 'tools/call',
                        payload: { sessionCookie: 'abc' },
                    },
                ]}
                redactKeys={['sessionCookie']}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /tools\/call/ }));
        expect(screen.getByText(/\[redacted\]/)).toBeInTheDocument();
    });
});
