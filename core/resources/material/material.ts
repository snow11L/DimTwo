import type { Color } from "../../math/color/color";
import type { Vec3 } from "../../math/vec3/vec3";

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

export interface Material {
    name: string;
    shaderName: string | null;
    props?: MaterialPropUnion[];
}
