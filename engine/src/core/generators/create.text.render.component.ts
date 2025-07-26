import type { GameEntityType } from "../base/gameEntity/types";
import { ComponentTypes } from "../components/component-type";
import type { TextMeshXComponent } from "../components/render/textMesh/TextRender";
import { Colors } from "../math/color";
import { createIncrementalId } from "./create.incremental.id";

export function TextMesh(entity: GameEntityType, text: string = "this is a text") {
    const textRender: TextMeshXComponent = {
        color: Colors.GRAY,
        alpha: 1.0,
        meshID: null,
        subMeshs: null,
        font: "roboto",
        material: "text_material",
        category: ComponentTypes.Render,
        enabled: true,
        gameEntity: entity,
        instanceID: createIncrementalId(),
        text: text,
        type: ComponentTypes.TextMesh
    }

    return textRender;
}