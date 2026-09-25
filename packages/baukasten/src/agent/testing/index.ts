/**
 * baukasten-ui/agent/testing
 *
 * A scripted agent and a fixture script, so a UI can be built and tested with
 * no model, no server and no keys — and so the unhappy paths are reachable on
 * demand rather than only when a real server happens to misbehave.
 *
 * Its own subpath, so it stays out of an application bundle that does not ask
 * for it.
 */

export { createMockAgent } from './createMockAgent';
export type {
    MockAgent,
    MockAgentOptions,
    MockApprovalStep,
    MockInputRequiredStep,
    MockMessageStep,
    MockPlanStep,
    MockStep,
    MockThoughtStep,
    MockToolStep,
    MockUserStep,
} from './createMockAgent';

export { DEMO_SCRIPT } from './demoScript';
