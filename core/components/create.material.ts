import { ENGINE } from "../../engine/engine.manager";
import { Color } from "../../game/systems/procedural-world/color";
import { generic_manager_add, generic_manager_get } from "../managers/generic_manager";
import type { Material } from "../webgl/material/material";

export function material_create(name: string, color: Color = Color.WHITE) {
    const material: Material = {
        name: name,
        shaderName: null,
        props: [
            { name: "color", type: "color", value: color }
        ]
    }

    generic_manager_add(ENGINE.MANAGER.MATERIAL, name, material);
}

export function material_get(name: string) {
    return generic_manager_get(ENGINE.MANAGER.MATERIAL, name);
}