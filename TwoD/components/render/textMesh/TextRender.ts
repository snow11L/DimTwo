import type { Render } from "../../../base/Render";
import type { Color } from "../../../math/color/color";

export interface TextMeshXComponent extends Render {
    text: string;
    font: string;
    color: Color;
}