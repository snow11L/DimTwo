import { createBoxCollider2D } from "../../../api/builders";
import { Builders } from "../../../api/TwoD";
import type { Sprite } from "../../../api/types";
import { CollisionMask } from "../../../TwoD/components/physics/collisionMatrix/CollisionMaskTypes";
import { Vec3 } from "../../../TwoD/math/vec3/vec3";

export function createTreeEntity(
    name: string,
    sprite: Sprite,
    position: Vec3
) {
    const gameEntity = Builders.createGameEntity(name, "Tree");

    const transform = Builders.createTransformComponent(gameEntity, {
        position: position,
        scale: { x: 2, y: 3, z: 0 }
    });

    const spriteRener = Builders.createSpriteRenderComponent(gameEntity, {
        sprite: sprite,
        layer: 1,
        material: "advanced_material",
    });

    const boxCollider = createBoxCollider2D(gameEntity, { collisionMask: CollisionMask.TREE, isTrigger: true, size: Vec3.create(1, 1, 1) });
    // CollisionMatrix.setCollision(CollisionMask.TREE, CollisionMask.TREE, false);

    gameEntity.components = [
        transform,
        spriteRener,
        boxCollider
    ]

    return gameEntity;
}
