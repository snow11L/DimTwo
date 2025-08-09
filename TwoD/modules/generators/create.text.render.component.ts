/* import type { GameEntity } from "../base/gameEntity/types";
import { Id } from "../base/Id";
import { ComponentTypes } from "../components/component-type";
import type { TextMeshXComponent } from "../components/render/textMesh/TextRender";


export function TextMesh(entity: GameEntity, text: string = "this is a text") {
    const textRender: TextMeshXComponent = {
        color: Color,
        alpha: 1.0,
        meshID: null,
        subMeshs: null,
        font: "roboto",
        material: "text_material",
        category: ComponentTypes.Render,
        enabled: true,
        gameEntity: entity,
        instanceID: new Id(),
        text: text,
        type: ComponentTypes.TextMesh
    }

    return textRender;
} */