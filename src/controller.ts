import { Metrics, ReadonlyMetrics } from "./metrics";
import { Finger } from "./finger";

export type TouchHandler = (
  metrics: ReadonlyMetrics,
  event: TouchEvent,
) => void;

export type TouchHandlers = {
  on_start?: TouchHandler;
  on_move?: TouchHandler;
  on_end?: TouchHandler;
  on_cancel?: TouchHandler;
};

type InternalTouchEventHandler = (event: TouchEvent) => void;

export class GestureController {
  private metrics = new Metrics();

  private on_start: InternalTouchEventHandler;
  private on_move: InternalTouchEventHandler;
  private on_end: InternalTouchEventHandler;
  private on_cancel: InternalTouchEventHandler;

  constructor(
    private element: HTMLElement,

    handlers: TouchHandlers,
  ) {
    const on_start: InternalTouchEventHandler = (event) => {
      event.preventDefault();
      this.initialise_touches(event.changedTouches);
      handlers.on_start?.(this.metrics, event);
    };

    const on_move: InternalTouchEventHandler = (event) => {
      event.preventDefault();
      this.update_touches(event.changedTouches);
      handlers.on_move?.(this.metrics, event);
    };

    const on_end: InternalTouchEventHandler = (event) => {
      event.preventDefault();
      this.remove_touches(event.changedTouches);
      handlers.on_end?.(this.metrics, event);
    };

    const on_cancel: InternalTouchEventHandler = (event) => {
      event.preventDefault();
      this.remove_all_touches();
      handlers.on_cancel?.(this.metrics, event);
    };

    element.addEventListener("touchstart", on_start);
    element.addEventListener("touchmove", on_move);
    element.addEventListener("touchend", on_end);
    element.addEventListener("touchcancel", on_cancel);

    this.on_start = on_start;
    this.on_move = on_move;
    this.on_end = on_end;
    this.on_cancel = on_cancel;
  }

  /** Removes the touch event listeners from the element */
  disableGestures(): void {
    this.element.removeEventListener("touchstart", this.on_start);
    this.element.removeEventListener("touchmove", this.on_move);
    this.element.removeEventListener("touchmove", this.on_end);
    this.element.removeEventListener("touchmove", this.on_cancel);
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
