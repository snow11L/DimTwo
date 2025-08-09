import { type TextureType } from "../../modules/resources/texture/types";

export interface Glyph {
    char: string;
    x: number;
    y: number;
    width: number;
    height: number;
    xoffset: number;
    yoffset: number;
    xadvance: number;
}

export interface FontData {
    texture: TextureType;
    glyphs: Map<string, Glyph>;
}

