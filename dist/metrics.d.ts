import { Vector, ReadonlyPoint } from "./vector";
import { Finger, ReadonlyFinger } from "./finger";
export declare class Metrics {
    finger_count: number;
    fingers: Map<number, Finger>;
    centroid: Vector;
}
export interface ReadonlyMetrics {
    /** The number of fingers currently touching the screen */
    readonly finger_count: number;
    /** The finger data */
    readonly fingers: ReadonlyMap<number, ReadonlyFinger>;
    /** The average position of the fingers */
    readonly centroid: ReadonlyPoint;
}
//# sourceMappingURL=metrics.d.ts.map