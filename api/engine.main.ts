import { SystemState } from "../TwoD";
import { Gizmos } from "../TwoD/debug/gizmos/Gizmos";
import { ENGINE } from "../TwoD/managers/engine.manager";
import Time from "../TwoD/time/time";

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
    ENGINE.WEB_GL.clearColor(0, 0, 0, 1);
    ENGINE.WEB_GL.clear(ENGINE.WEB_GL.COLOR_BUFFER_BIT);
    SystemState.callRender();

    Gizmos.gizmosActive = true;
    Gizmos.drawGizmos();
    SystemState.callDrawGizmos();

    Gizmos.gizmosActive = false;
});