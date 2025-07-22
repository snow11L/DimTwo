import { get_category } from "../../../generators/get_component";
import { ComponentType } from "../../../types/component-type";
import type { CameraType } from "./types";

export function getActivedCamera(): CameraType | null {
    const cameras = get_category<CameraType>(ComponentType.Camera);
    if (cameras.length === 0) return null;
    return cameras[0];
}