
import { Create } from "../../../TwoD";
import { CollisionMask } from "../../../TwoD/components/physics/collisionMatrix/CollisionMaskTypes";
import { BoxCollider2D } from "../../../TwoD/generators";
import { Vec3 } from "../../../TwoD/math/vec3/vec3";
import type { Sprite } from "../../../TwoD/resources/sprite";

export function createTreeEntity(
    name: string,
    sprite: Sprite,
    position: Vec3
) {
    const gameEntity = Create.GameEntity(name, "Tree");

    const transform = Create.Transform(gameEntity, {
        position: position,
        scale: { x: 2, y: 3, z: 0 }
    });

    const spriteRener = Create.SpriteRender(gameEntity, {
        sprite: sprite,
        layer: 1,
        material: "advanced_material",
    });

    const boxCollider = BoxCollider2D(gameEntity, { collisionMask: CollisionMask.TREE, isTrigger: true, size: Vec3.create(1, 1, 1) });
    // CollisionMatrix.setCollision(CollisionMask.TREE, CollisionMask.TREE, false);

    gameEntity.components = [
        transform,
        spriteRener,
        boxCollider
    ]

    return gameEntity;
}
