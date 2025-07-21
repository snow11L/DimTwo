import { Gizmos } from "../core/debug/gizmos/gizmos";
import Time from "../core/time/time";
import { ENGINE } from "./engine.manager";
import { ECS } from "./TwoD";

export const engine = new Time();

engine.on("start", () => {
    ECS.System.callStart();
});

engine.on("fixedUpdate", () => {
    ECS.System.callFixedUpdate();

});

engine.on("update", () => {
    ECS.System.callUpdate();
    ECS.System.callLateUpdate();
});

engine.on("render", () => {
    ENGINE.WEB_GL.clearColor(0, 0, 0, 1);
    ENGINE.WEB_GL.clear(ENGINE.WEB_GL.COLOR_BUFFER_BIT);
    ECS.System.callRender();

    Gizmos.gizmosActive = true;
    Gizmos.drawGizmos();
    ECS.System.callDrawGizmos();

    Gizmos.gizmosActive = false;
});