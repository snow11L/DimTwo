import { Global } from "../core/managers/engine.manager";
import { Color } from "../core/math/color/color";

import type { MaterialType } from "../core/resources/material/types";

export function material_create(name: string, color: Color = Color.white) {
    const material: MaterialType = {
        name: name,
        shaderName: null,
        props: [
            { name: "color", type: "color", value: color }
        ]
    }

    Global.ResourcesManager.MaterialManager.generic_manager_add(name, material);
}

export function material_get(name: string) {
    return Global.ResourcesManager.MaterialManager.generic_manager_get(name);
}