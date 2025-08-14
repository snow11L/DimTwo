
import { Color } from "../../core/math/Color";
import { ResourcesManager } from "../../global/manager/manager";
import type { MaterialType } from "../resources";

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