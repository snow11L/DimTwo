import { Builder } from "../../../TwoD/core";
import { CollisionLayer } from "../../../TwoD/modules/physics/collision/CollisionLayer";
import { Vec3 } from "../../../TwoD/core/math/vec3/ Vec3";
import { createBoxCollider2D } from "../../../TwoD/modules/generators";

import type { Sprite } from "../../../TwoD/modules/resources/sprite";

export function createTreeEntity(
    name: string,
    sprite: Sprite,
    position:  Vec3
) {
    const gameEntity = Builder.BuildGameEntity(name, "Tree");

    const transform = Builder.createTransform(gameEntity, {
        position: position,
        scale: { x: 2, y: 3, z: 0 }
    });

    const spriteRener = Builder.createSpriteRender(gameEntity, {
        sprite: sprite,
        layer: 1,
        material: "advanced_material",
    });

    const boxCollider = createBoxCollider2D(gameEntity, { collisionMask: CollisionLayer.TREE, isTrigger: true, size: new Vec3(1, 1, 1) });
    // CollisionMatrix.setCollision(CollisionMask.TREE, CollisionMask.TREE, false);

    gameEntity.components = [
        transform,
        spriteRener,
        boxCollider
    ]

    return gameEntity;
}
