import { Color } from "../../game/systems/procedural-world/color";
import type { TextMeshXComponent } from "../gears/text_render/TextRender";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createTextRenderComponent(entity: GameEntity, text: string = "this is a text") {
    const textRender: TextMeshXComponent = {
        color: Color.GRAY,
        mesh: "text_mesh",
        font: "roboto",
        material: "text_material",
        category: ComponentType.RENDER,
        enabled: true,
        gameEntity: entity,
        instance: createIncrementalId(),
        text: text,
        type: ComponentType.TEXT_RENDER
    }

    return textRender;
}