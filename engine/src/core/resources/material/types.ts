import type { Mathf } from "../..";
import type { Color } from "../../math/color/types";


export type MaterialPropType = "float" | "int" | "bool" | "vec3" | "color" | "texture";

type TypeMap = {
    float: number;
    int: number;
    bool: boolean;
    vec3: Mathf.Vec3Type;
    color: Color;
    texture: string;
};

type MaterialPropUnion = {
    [K in MaterialPropType]: {
        name: string;
        type: K;
        value: TypeMap[K];
        uint?: number;
    }
}[MaterialPropType];

export interface MaterialType {
    name: string;
    shaderName: string | null;
    props?: MaterialPropUnion[];
}
