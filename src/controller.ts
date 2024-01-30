import { Metrics, ReadonlyMetrics } from "./metrics";
import { Finger } from "./finger";

export enum EventType {
  Start,
  Move,
  End,
  Cancel,
}

export type TouchHandler = (
  metrics: ReadonlyMetrics,
  event: TouchEvent,
) => void;

type InternalTouchEventHandler = (event: TouchEvent) => void;

export class GestureController {
  private listeners = new Map<EventType, TouchHandler[]>();
  private metrics = new Metrics();

  private on_start: InternalTouchEventHandler;
  private on_move: InternalTouchEventHandler;
  private on_end: InternalTouchEventHandler;
  private on_cancel: InternalTouchEventHandler;

  private constructor(private element: HTMLElement) {
    const on_start: InternalTouchEventHandler = (event) =>
      this.handler(event, EventType.Start);

    const on_move: InternalTouchEventHandler = (event) =>
      this.handler(event, EventType.Move);

    const on_end: InternalTouchEventHandler = (event) =>
      this.handler(event, EventType.End);

    const on_cancel: InternalTouchEventHandler = (event) =>
      this.handler(event, EventType.Cancel);

    element.addEventListener("touchstart", on_start);
    element.addEventListener("touchmove", on_move);
    element.addEventListener("touchend", on_end);
    element.addEventListener("touchcancel", on_cancel);

    this.on_start = on_start;
    this.on_move = on_move;
    this.on_end = on_end;
    this.on_cancel = on_cancel;
  }

  add_listener(type: EventType, handler: TouchHandler): void {
    const handlers = this.listeners.get(type) ?? [];

    handlers.push(handler);

    this.listeners.set(type, handlers);
  }

  /** Removes the touch event listeners from the element */
  disableGestures(): void {
    this.element.removeEventListener("touchstart", this.on_start);
    this.element.removeEventListener("touchmove", this.on_move);
    this.element.removeEventListener("touchmove", this.on_end);
    this.element.removeEventListener("touchmove", this.on_cancel);
  }

  private handler(event: TouchEvent, type: EventType): void {
    event.preventDefault();

    switch (type) {
      case EventType.Start:
        this.initialise_touches(event.changedTouches);
        break;

      case EventType.Move:
        this.update_touches(event.changedTouches);
        break;

      case EventType.End:
        this.remove_touches(event.changedTouches);
        break;

      case EventType.Cancel:
        this.remove_all_touches();
        break;
    }

    const handlers = this.listeners.get(type);
    if (handlers) for (const handler of handlers) handler(this.metrics, event);
  }

  private initialise_touches(touches: TouchList): void {
    this.metrics.finger_count += touches.length;

    for (const touch of touches) {
      const finger = new Finger(touch.clientX, touch.clientY);
      this.metrics.fingers.set(touch.identifier, finger);
    }

    this.calculate_centroid();
  }

  private update_touches(touches: TouchList): void {
    for (const touch of touches) {
      const finger = this.metrics.fingers.get(touch.identifier);

      if (finger) {
        finger.position_delta.set(
          touch.clientX - finger.position.x,
          touch.clientY - finger.position.y,
        );

        finger.position.set(touch.clientX, touch.clientY);
      }
    }

    this.calculate_centroid();
  }

  private remove_touches(touches: TouchList): void {
    this.metrics.finger_count -= touches.length;

    for (const touch of touches) {
      this.metrics.fingers.delete(touch.identifier);
    }

    this.calculate_centroid();
  }

  private remove_all_touches(): void {
    this.metrics.finger_count = 0;
    this.metrics.fingers.clear();
    this.metrics.centroid.set(0, 0);
  }

  private calculate_centroid(): void {
    const { finger_count, fingers, centroid } = this.metrics;

    centroid.set(0, 0);

    for (const finger of fingers.values()) {
      centroid.add_assign(finger.position);
    }

    if (finger_count > 1) {
      centroid.div_assign(finger_count);
    }

    for (const finger of fingers.values()) {
      centroid.sub(finger.position, finger.centroid_direction);
    }
  }
}
