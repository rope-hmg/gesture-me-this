import { ReadonlyMetrics } from "./metrics";
export type TouchHandler = (metrics: ReadonlyMetrics, event: TouchEvent) => void;
export type TouchHandlers = {
    on_start?: TouchHandler;
    on_move?: TouchHandler;
    on_end?: TouchHandler;
    on_cancel?: TouchHandler;
};
export declare class GestureController {
    private element;
    private metrics;
    private on_start;
    private on_move;
    private on_end;
    private on_cancel;
    constructor(element: HTMLElement, handlers: TouchHandlers);
    /** Removes the touch event listeners from the element */
    disableGestures(): void;
    private initialise_touches;
    private update_touches;
    private remove_touches;
    private remove_all_touches;
    private calculate_centroid;
}
//# sourceMappingURL=controller.d.ts.map