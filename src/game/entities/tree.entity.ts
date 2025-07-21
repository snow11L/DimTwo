import { createBoxCollider2D } from "../../../api/builders";
import { type Types, Builders, ECS } from "../../../api/TwoD";
import type { Sprite } from "../../../api/types";
import { CollisionMask, Collision } from "../../../core/collider/types/LayerMask";
import { Vec3 } from "../../../core/math/vec3/vec3";

export function createTreeEntity(
    componentState: Types.ECSComponentState,
    name: string,
    sprite: Sprite,
    position: Vec3
) {
    const gameEntity = Builders.createGameEntity(name, "Tree");

    const transform = Builders.createTransformComponent(gameEntity, {
        position: position,
        scale: { x: 2, y: 3, z: 0 }
    });

    ECS.Component.addComponent(componentState, gameEntity, transform);

    const spriteRener = Builders.createSpriteRenderComponent(gameEntity, {
        sprite: sprite,
        layer: 1,
        material: "advanced_material",
    });

    ECS.Component.addComponent(componentState, gameEntity, spriteRener);

    const boxCollider = createBoxCollider2D(gameEntity, { collisionMask: CollisionMask.TREE, isTrigger: true, size: Vec3.create(1, 1, 1) });
    Collision.setCollision(CollisionMask.TREE, CollisionMask.TREE, false);

    ECS.Component.addComponent(componentState, gameEntity, boxCollider);
    return gameEntity;
}
