import { GestureRecogniser, RecognitionOptions } from ".";
import { Finger } from "../finger";

export enum PinchDirection {
  Inward,
  Outward,
}

export type PinchMetrics = {
  /**
   * The strength of the pinch. The value indicates the average travel distance of all the fingers.
   */
  strength: number;

  /**
   * The direction of the pinch.
   * - `PinchDirection.Inward` if the fingers are moving towards each other.
   * - `PinchDirection.Outward` if the fingers are moving away from each other.
   */
  direction: PinchDirection;
};

const DEFAULT_PINCH_ZOOM_OPTIONS: RecognitionOptions = {
  sensitivity: 0.5,
};

/**
 * Recognises a pinchZoom gesture.
 * @param metrics The metrics to recognise the gesture from.
 * @param options The options to use when recognising the gesture.
 * @param options.exactFingerCount The number of fingers required to recognise the gesture. If left undefined, the gesture recogniser is required to recognise any count that is valid for it. Defaults to `0.5`.
 * @param options.sensitivity The sensitivity of the gesture recogniser. The provided values should be normalised in the range [0, 1].
 * @returns A `RecognitionResult<PinchMetrics>` indicating whether the gesture was recognised or not.
 * @see PinchMetrics
 */
export const pinch_zoom: GestureRecogniser<PinchMetrics> = (
  metrics,
  options,
) => {
  const { exact_finger_count, sensitivity = 0.5 } =
    options ?? DEFAULT_PINCH_ZOOM_OPTIONS;

  const matches_finger_count =
    (Boolean(exact_finger_count) &&
      metrics.finger_count === exact_finger_count) ||
    (!exact_finger_count && metrics.finger_count > 1);

  let pinch_metrics: PinchMetrics | undefined;

  if (matches_finger_count) {
    const fingers = metrics.fingers.values();

    let { value: finger, done } = fingers.next();
    let moving_toward_centroid = finger.is_moving_toward_centroid();

    let all_moving_in_same_direction = true;

    while (!done && all_moving_in_same_direction) {
      all_moving_in_same_direction =
        moving_toward_centroid === finger.is_moving_toward_centroid();

      ({ value: finger, done } = fingers.next());
    }

    if (all_moving_in_same_direction) {
      const direction = moving_toward_centroid
        ? PinchDirection.Inward
        : PinchDirection.Outward;

      // We determine the strength of the pinch by taking the average of the distances that each finger has moved.
      let strength = 0;

      for (const finger of metrics.fingers.values()) {
        strength += finger.position_delta.length();
      }

      strength /= metrics.finger_count;
      strength *= sensitivity;

      pinch_metrics = { strength, direction };
    }
  }

  return pinch_metrics
    ? { is_recognised: true, metrics: pinch_metrics }
    : { is_recognised: false };
};
