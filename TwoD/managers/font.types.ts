import { type Texture } from "../webgl/texture";

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
    texture: Texture;
    glyphs: Map<string, Glyph>;
}

