import { Global } from "../managers/engine.manager";
import { generic_manager_add, generic_manager_get } from "../managers/generic_manager";
import { Colors } from "../math/color";
import type { Color } from "../math/color/types";
import type { MaterialType } from "../resources/material/types";

export function material_create(name: string, color: Color = Colors.WHITE) {
    const material: MaterialType = {
        name: name,
        shaderName: null,
        props: [
            { name: "color", type: "color", value: color }
        ]
    }

    generic_manager_add(Global.ResourcesManager.MaterialManager, name, material);
}

export function material_get(name: string) {
    return generic_manager_get(Global.ResourcesManager.MaterialManager, name);
}