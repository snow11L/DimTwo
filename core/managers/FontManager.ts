import { ENGINE } from "../../api/engine.manager";
import { createTexture, type Texture } from "../webgl/texture";
import { generic_manager_add } from "./generic_manager";

interface Glyph {
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

export class FontManager {
    private fonts: Map<string, FontData> = new Map();

    async loadFont(name: string, imageUrl: string, csvUrl: string) {

        const gl = ENGINE.WEB_GL;
      
        const image = await this.loadImage(imageUrl);
        const imageBitmap = await createImageBitmap(image);
        const texture = createTexture(gl, imageBitmap);
        generic_manager_add(ENGINE.MANAGER.TEXTURE, name, texture);

        const text = await this.loadText(csvUrl);

        const glyphs = this.parseCSV(text);
        this.fonts.set(name, { texture, glyphs });
    }

    getFont(name: string): FontData | undefined {
        return this.fonts.get(name);
    }

    getGlyph(name: string, char: string): Glyph | undefined {
        const font = this.fonts.get(name);
        return font?.glyphs.get(char);
    }

    private async loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    private async loadText(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load text from ${url}: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    }


    private parseCSV(text: string): Map<string, Glyph> {
        const lines = text.trim().split("\n");
        const header = lines[0].split(",");

        const glyphs: Map<string, Glyph> = new Map();

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",");
            const obj: any = {};
            header.forEach((h, idx) => {
                obj[h.trim()] = row[idx].trim();
            });
            const char = obj.char ?? String.fromCharCode(parseInt(obj.id));

            glyphs.set(char, {
                char,
                x: parseInt(obj.x),
                y: parseInt(obj.y),
                width: parseInt(obj.width),
                height: parseInt(obj.height),
                xoffset: parseInt(obj.xoffset),
                yoffset: parseInt(obj.yoffset),
                xadvance: parseInt(obj.xadvance),
            });
        }
        return glyphs;
    }
}
