import type { Scene } from "./scene";

export abstract class SceneManager {
    private static current: Scene | null = null;
    private static scenes: Map<string, Scene> = new Map();

    public static getCurrentScene(): Scene {
        if (!this.current) {
            throw new Error("Nenhuma cena atribuída.");
        }
        return this.current;
    }

    public static addScene(scene: Scene): void {
        this.scenes.set(scene.name, scene);
    }

    public static loadScene(name: string): void {
        const scene = this.scenes.get(name);
        if (!scene) {
            throw new Error(`Cena '${name}' não encontrada.`);
        }
        this.current = scene;
    }
}
