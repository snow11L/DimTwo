import type { MaterialType } from "../../core";
import { Color } from "../../core/math/color/color";
import { ResourcesManager } from "../../global/manager/manager";

export function material_create(name: string, color: Color = Color.white) {
    const material: MaterialType = {
        name: name,
        shaderName: null,
        props: [
            { name: "color", type: "color", value: color }
        ]
    }

    ResourcesManager.MaterialManager.add(name, material);
}

export function material_get(name: string) {
    return ResourcesManager.MaterialManager.get(name);
}