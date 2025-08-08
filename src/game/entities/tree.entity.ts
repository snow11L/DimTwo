import { Builder } from "../../../TwoD/core";
import { CollisionMask } from "../../../TwoD/core/core/collisionMask/types";
import { BoxCollider2D } from "../../../TwoD/core/generators";
import { Vec3 } from "../../../TwoD/core/math/vec3/ Vec3";

import type { SpriteType } from "../../../TwoD/core/resources/sprite";

export function createTreeEntity(
    name: string,
    sprite: SpriteType,
    position:  Vec3
) {
    const gameEntity = Builder.BuildGameEntity(name, "Tree");

    const transform = Builder.Transform(gameEntity, {
        position: position,
        scale: { x: 2, y: 3, z: 0 }
    });

    const spriteRener = Builder.SpriteRender(gameEntity, {
        sprite: sprite,
        layer: 1,
        material: "advanced_material",
    });

    const boxCollider = BoxCollider2D(gameEntity, { collisionMask: CollisionMask.TREE, isTrigger: true, size: new Vec3(1, 1, 1) });
    // CollisionMatrix.setCollision(CollisionMask.TREE, CollisionMask.TREE, false);

    gameEntity.components = [
        transform,
        spriteRener,
        boxCollider
    ]

    return gameEntity;
}
