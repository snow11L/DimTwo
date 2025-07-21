import { ENGINE } from "../../api/engine.manager";
import { createTexture } from "../webgl/texture";
import type { Glyph } from "./font.types";
import { generic_manager_add } from "./generic_manager";

async function loadFont(name: string, imageUrl: string, csvUrl: string): Promise<void> {
    const gl = ENGINE.WEB_GL;
    const image = await loadImage(imageUrl);
    const imageBitmap = await createImageBitmap(image);
    const texture = createTexture(gl, imageBitmap, {
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
    });
    generic_manager_add(ENGINE.MANAGER.TEXTURE, name, texture);

    const text = await loadText(csvUrl);
    const glyphs = parseCSV(text);
    generic_manager_add(ENGINE.MANAGER.FONT, name, { texture, glyphs })
}

function parseCSV(text: string): Map<string, Glyph> {
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

async function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

async function loadText(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load text from ${url}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
}

export const Loader = {
    loadFont,
    loadImage, 
    loadText
}
