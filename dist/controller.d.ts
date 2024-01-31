import { ReadonlyMetrics } from "./metrics";
export declare enum EventType {
    OnStart = 0,
    OnMove = 1,
    OnEnd = 2,
    OnCancel = 3
}
export type TouchHandler = (metrics: ReadonlyMetrics, event: TouchEvent) => void;
export declare class GestureController {
    private element;
    private listeners;
    private metrics;
    private on_start;
    private on_move;
    private on_end;
    private on_cancel;
    constructor(element: HTMLElement, listeners: Map<EventType, TouchHandler[]>);
    /** Removes the touch event listeners from the element */
    disableGestures(): void;
    private run_user_handlers;
    private initialise_touches;
    private update_touches;
    private remove_touches;
    private remove_all_touches;
    private calculate_centroid;
}
//# sourceMappingURL=controller.d.ts.map