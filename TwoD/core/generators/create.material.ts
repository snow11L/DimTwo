import { Global } from "../managers/engine.manager";
import { generic_manager_add, generic_manager_get } from "../managers/generic_manager";
import { Color } from "../math/color/color";

import type { MaterialType } from "../resources/material/types";

export function material_create(name: string, color: Color = Color.white) {
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