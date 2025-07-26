import { get_category } from "../../../generators/get_component";
import { ComponentTypes } from "../../component-type";
import type { CameraType } from "./types";

export function getActivedCamera(): CameraType | null {
    const cameras = get_category<CameraType>(ComponentTypes.Camera);
    if (cameras.length === 0) return null;
    return cameras[0];
}