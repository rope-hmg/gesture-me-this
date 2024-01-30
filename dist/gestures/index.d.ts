export * from "./pinch";
import { ReadonlyMetrics } from "../metrics";
export type RecognitionResult<T> = {
    is_recognised: false;
} | {
    is_recognised: true;
    metrics: T;
};
export type RecognitionOptions = {
    /**
     * The number of fingers required to recognise the gesture. If left undefined,
     * the gesture recogniser is required to recognise any count that is valid for it.
     *
     * Example:
     * @see pinchZoom
     */
    exact_finger_count?: number;
    /**
     * The sensitivity of the gesture recogniser. The provided values should be
     * a floating point value normalised in the range `[0, 1]`.
     * - A sensitivity of `0` means no gesture will be recognised.
     * - A sensitivity of `1` means the slightest twitch will be recognised.
     */
    sensitivity?: number;
};
/**
 * This function signature describes the standards interface for a recogniser function.
 * Clients of the library are free to disregard this and use whatever best suits their applications.
 * Library writers MUST adhere to this interface.
 */
export type GestureRecogniser<T> = (metrics: ReadonlyMetrics, options?: RecognitionOptions) => RecognitionResult<T>;
//# sourceMappingURL=index.d.ts.map