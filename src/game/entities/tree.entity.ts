import { Builder, Mathf } from "../../../TwoD";
import { CollisionMask } from "../../../TwoD/core/collisionMask/types";
import { BoxCollider2D } from "../../../TwoD/generators";

import type { SpriteType } from "../../../TwoD/resources/sprite";

export function createTreeEntity(
    name: string,
    sprite: SpriteType,
    position:  Mathf.Vec3Type
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

    const boxCollider = BoxCollider2D(gameEntity, { collisionMask: CollisionMask.TREE, isTrigger: true, size: Mathf.Vec3.create(1, 1, 1) });
    // CollisionMatrix.setCollision(CollisionMask.TREE, CollisionMask.TREE, false);

    gameEntity.components = [
        transform,
        spriteRener,
        boxCollider
    ]

    return gameEntity;
}
