import { ReadonlyMetrics } from "./metrics";
export declare enum EventType {
    OnStart = 0,
    OnMove = 1,
    OnEnd = 2,
    OnCancel = 3
}
export type TouchHandler<T> = (metrics: ReadonlyMetrics, event: TouchEvent, user_data?: T) => void;
export declare class GestureController<T> {
    private element;
    private listeners;
    private user_data?;
    private metrics;
    private on_start;
    private on_move;
    private on_end;
    private on_cancel;
    constructor(element: HTMLElement, listeners: Map<EventType, TouchHandler<T>[]>, user_data?: T | undefined);
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