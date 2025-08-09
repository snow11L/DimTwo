
import { Global } from "../managers/engine.manager";
import { Scene } from "../resources/scene/scene";
import Time from "../time/time";

export const engine = new Time();


engine.on("start", () => {

    const scene = Scene.getCurrentScene();
    scene.ECSSystems.callStart();
});

engine.on("fixedUpdate", () => {
    const scene = Scene.getCurrentScene();
    scene.ECSSystems.callFixedUpdate();

});

engine.on("update", () => {
    const scene = Scene.getCurrentScene();
    scene.ECSSystems.callUpdate();
    scene.ECSSystems.callLateUpdate();
});

engine.on("render", () => {
    const scene = Scene.getCurrentScene();
    const WebGL = Global.WebGL;
    WebGL.clearColor(0, 0, 0, 1);
    WebGL.clear(WebGL.COLOR_BUFFER_BIT);
    scene.ECSSystems.callRender();
    scene.ECSSystems.callDrawGizmos();


});