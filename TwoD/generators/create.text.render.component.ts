import type { GameEntityType } from "../base/gameEntity/types";
import type { TextMeshXComponent } from "../components/render/textMesh/TextRender";
import { Colors } from "../math/color";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function TextMesh(entity: GameEntityType, text: string = "this is a text") {
    const textRender: TextMeshXComponent = {
        color: Colors.GRAY,
        alpha: 1.0,
        meshID: null,
        subMeshs: null,
        font: "roboto",
        material: "text_material",
        category: ComponentType.Render,
        enabled: true,
        gameEntity: entity,
        instanceID: createIncrementalId(),
        text: text,
        type: ComponentType.TextMesh
    }

    return textRender;
}