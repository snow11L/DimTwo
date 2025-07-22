import { ENGINE } from "../managers/engine.manager";
import { generic_manager_add, generic_manager_get } from "../managers/generic_manager";
import { Colors } from "../math/color";
import type { Color } from "../math/color/types";
import type { Material } from "../resources/material/material";

export function material_create(name: string, color: Color = Colors.WHITE) {
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