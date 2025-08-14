import type { Color } from "../../../core/math/Color";
import type { Vec3 } from "../../../core/math/Vec3";


export type MaterialPropType = "float" | "int" | "bool" | "vec3" | "color" | "texture";

type TypeMap = {
    float: number;
    int: number;
    bool: boolean;
    vec3: Vec3;
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
