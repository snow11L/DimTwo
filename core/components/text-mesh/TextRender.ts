import type { Color } from "../../math/color/color";
import type { Render } from "../render/Render";

export interface TextMeshXComponent extends Render {
    text: string;
    font: string;
    color: Color;
}