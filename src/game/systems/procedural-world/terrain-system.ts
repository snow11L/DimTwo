/* import { createGameEntity, createSpriteRenderComponent, createTransformComponent } from "../../../../api/builders";
import type { System } from "../../../../api/resources";
import { ECS } from "../../../../api/TwoD";
import type { ComponentStateType } from "../../../../api/types";
import { Mulberry32 } from "../../../../engine/core/algorithms/mulberry32/mulberry32";
import type { GameEntity } from "../../../../engine/core/base/gameEntity/types";
import type { Vec2 } from "../../../../engine/core/math/vec2/Vec2";
import { get_transform } from "../../../../engine/modules/generators/get_component";
import { createTreeEntity } from "../../entities/tree.entity";
import { OAK_TRE_0 } from "../../sprites/oak.trees.sprite";
import { BiomeName, getBiomeColor } from "./biome";
import { ChunkManager } from "./chunk/ChunkManager";
import { World, type TerrainCell } from "./Word";


export function TerrainSystem(componentState: ComponentStateType, player: GameEntity): System {
  let playerPos: Vec2;
  const world = new World(1221435);
  return {
    start() {
      
      const transform = get_transform(player);
      if(!transform) return;

      playerPos = transform.position;

      ChunkManager.on("chunkLoaded", (pos: Vec2) => {
        const chunk = ChunkManager.getChunk(pos.x, pos.y);
        if (chunk) {
          generateTerrainEntities(componentState, chunk.cells, chunk.gameEntities);
          generateTrees(componentState, chunk.cells, chunk.gameEntities, chunk.position);

        }
      });

      ChunkManager.on("chunkUnloaded", (pos: Vec2) => {
        const chunk = ChunkManager.getChunk(pos.x, pos.y);
        if (chunk) {
          for (const entity of chunk.gameEntities) {
            ECS.Component.destroyEntityAndComponents(componentState, entity);
          }
          chunk.gameEntities = [];
        }
      });

      ChunkManager.updateAround(playerPos, 1, world);
    },

    render() {
      // ChunkManager.updateAround(playerPos, 1, world);
    },
  };
}

function generateTerrainEntities(
  componentState: ComponentStateType,
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

      const gameEntity: GameEntity = createGameEntity(`ground`, "Ground");

      const transform = createTransformComponent(gameEntity, { position: cell.position });
      ECS.Component.addComponent(componentState, gameEntity, transform, false);

      const spriteReder = createSpriteRenderComponent(gameEntity, { color: getBiomeColor(cell.biome ?? BiomeName.DEEP_WATER) });
      ECS.Component.addComponent(componentState, gameEntity, spriteReder, false);

      gameEntities.push(gameEntity);
    }
  }
}

function seedFromXY(x: number, y: number): number {
  const PRIME1 = 73856093;
  const PRIME2 = 19349663;
  return (x * PRIME1) ^ (y * PRIME2);
}

export function generateTrees(
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