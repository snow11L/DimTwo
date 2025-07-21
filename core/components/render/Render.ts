import type { Color } from "../../math/color/color";
import type { Component } from "../component/component";

export interface Render extends Component {
    color: Color;
    alpha: number;
    material: string;
    mesh: number | null;
    subMeshs: number[] | null;
}