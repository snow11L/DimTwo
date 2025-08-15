import { GameEntity } from "../../../engine/core/base/GameEntity";
import { System } from "../../../engine/core/base/System";
import { Vec2 } from "../../../engine/core/math/Vec2";
import type { Scene } from "../../../engine/core/scene/scene";
import { SpriteRender } from "../../../engine/modules/components/render/SpriteRender";
import { Transform } from "../../../engine/modules/components/spatial/Transform";
import { ComponentType } from "../../../engine/modules/enums/ComponentType";
import { BiomeName, getBiomeColor } from "./biome";
import { ChunkManager } from "./chunk/ChunkManager";
import { World, type TerrainCell } from "./Word";


export class TerrainSystem extends System {
  private playerPosition: Vec2 = new Vec2();
  private world = new World(1221435);

  start() {

    const scene = this.getScene();

    const playerEntity = scene.entities.getByTag("Player");
    if(!playerEntity) return;

    const playerTranform = scene.components.getComponent<Transform>(playerEntity, ComponentType.Transform);
    if(!playerTranform) return;

    this.playerPosition = playerTranform.position;

    ChunkManager.on("chunkLoaded", (pos: Vec2) => {
      const chunk = ChunkManager.getChunk(pos.x, pos.y);
      if (chunk) {
        generateTerrainEntities(this.getScene(), chunk.cells, chunk.gameEntities);
      }
    });

    /* ChunkManager.on("chunkUnloaded", (pos: Vec2) => {
      const chunk = ChunkManager.getChunk(pos.x, pos.y);
      if (chunk) {
        for (const entity of chunk.gameEntities) {
          ECS.Component.destroyEntityAndComponents(componentState, entity);
        }
        chunk.gameEntities = [];
      }
    }); */

    ChunkManager.updateAround(this.playerPosition, 1, this.world);
  }

  render() {
    
  }


}

function generateTerrainEntities(
  scene: Scene,
  terrainCells: TerrainCell[],
  gameEntities: GameEntity[],
): void {
  for (const cell of terrainCells) {

    if (cell.biome === BiomeName.SHALLOW_WATER) {

      // const gameEntity: GameEntity = createGameEntity(`ground`, "Ground");

      // const transform = createTransformComponent(gameEntity, { position: cell.position, });
      // ECS.Component.addComponent(componentState, gameEntity, transform, false);

      // const spriteReder = createSpriteRenderComponent(gameEntity, { material: "water_material" });
      // ECS.Component.addComponent(componentState, gameEntity, spriteReder, false);

      // gameEntities.push(gameEntity);
    } else {

      const gameEntity: GameEntity = new GameEntity(`ground`, "Ground");

      const transform = new Transform(cell.position);
      scene.components.addComponent(gameEntity, transform);

      const spriteReder = new SpriteRender();
      spriteReder.material = "simpleMaterial";
      spriteReder.color = getBiomeColor(cell.biome ?? BiomeName.DEEP_WATER);


      scene.components.addComponent(gameEntity, spriteReder);

      gameEntities.push(gameEntity);
    }
  }
}

function seedFromXY(x: number, y: number): number {
  const PRIME1 = 73856093;
  const PRIME2 = 19349663;
  return (x * PRIME1) ^ (y * PRIME2);
}

/* export function generateTrees(
  componentState: ComponentStateType,
  terrainCells: TerrainCell[],
  gameEntities: GameEntity[],
  chunkPos: Vec2
) {

  const seed = seedFromXY(chunkPos.x, chunkPos.y);
  const rng = new Mulberry32(seed);

  for (const cell of terrainCells) {
    const treeChance = rng.nextFloat();
    if (cell.biome === BiomeName.DENSE_FOREST || cell.biome === BiomeName.SPARSE_FOREST) {
      if (treeChance < 0.1) {

        const treeEntity = createTreeEntity(componentState, "tree", OAK_TRE_0, cell.position);
        gameEntities.push(treeEntity);
      }
    }
  }
} */