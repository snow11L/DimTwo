import type { Sprite } from "../../resources/sprite/sprite.types.ts";

export interface AnimationFrame {
  sprite: Sprite;
  duration?: number;
}

export interface AnimationClip {
  name: string;
  frames: AnimationFrame[];
  frameRate: number; 
}
