import { Color } from "../math/color/color";
import type { TextMeshXComponent } from "../components/text-mesh/TextRender";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createTextRenderComponent(entity: GameEntity, text: string = "this is a text") {
    const textRender: TextMeshXComponent = {
        color: Color.GRAY,
        alpha: 1.0,
        mesh: null,
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