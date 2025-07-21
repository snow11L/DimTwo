import type { Color } from "../../../game/systems/procedural-world/color";
import type { Render } from "../render/sprite_render";

export interface TextMeshXComponent extends Render {
    text: string;
    font: string;
    color: Color;
}