import { SystemState } from "..";
import { Global } from "../managers/engine.manager";
import Time from "../time/time";

export const engine = new Time();

engine.on("start", () => {
    SystemState.callStart();
});

engine.on("fixedUpdate", () => {
    SystemState.callFixedUpdate();

});

engine.on("update", () => {
    SystemState.callUpdate();
    SystemState.callLateUpdate();
});

engine.on("render", () => {

    const WebGL = Global.WebGL;
    WebGL.clearColor(0, 0, 0, 1);
    WebGL.clear(WebGL.COLOR_BUFFER_BIT);
    SystemState.callRender();
    SystemState.callDrawGizmos();


});