import type { SpriteType } from "../sprite/types.ts";

export interface AnimationFrame {
  sprite: SpriteType;
  duration?: number;
}

export interface AnimationClip {
  name: string;
  frames: AnimationFrame[];
  frameRate: number; 
}
