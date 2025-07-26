import type { Color } from "../math/color/types";
import type { Component } from "./Component";

export interface Render extends Component {
    color: Color;
    alpha: number;
    material: string;
    meshID: number | null;
    subMeshs: number[] | null;
}