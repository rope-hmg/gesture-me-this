import { GestureRecogniser } from ".";
export declare enum PinchDirection {
    Inward = 0,
    Outward = 1
}
export type PinchMetrics = {
    /**
     * The strength of the pinch. The value indicates the average travel distance of all the fingers.
     */
    readonly strength: number;
    /**
     * The direction of the pinch.
     * - `PinchDirection.Inward` if the fingers are moving towards each other.
     * - `PinchDirection.Outward` if the fingers are moving away from each other.
     */
    readonly direction: PinchDirection;
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
export declare const pinch_zoom: GestureRecogniser<PinchMetrics>;
//# sourceMappingURL=pinch.d.ts.map