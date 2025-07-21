import { Gizmos } from "../core/debug/gizmos/gizmos";
import Time from "../core/time/time";
import { ENGINE } from "../engine/engine.manager";
import { ECS } from "../engine/TwoD";
import { GameMain } from "../game/game.main";

await GameMain();

const time = new Time();

time.on("start", () => {
  ECS.System.callStart();
});

time.on("fixedUpdate", () => {
  ECS.System.callFixedUpdate();

});

time.on("update", () => {
  ECS.System.callUpdate();
  ECS.System.callLateUpdate();
});

time.on("render", () => {
  ENGINE.WEB_GL.clearColor(0, 0, 0, 1);
  ENGINE.WEB_GL.clear(ENGINE.WEB_GL.COLOR_BUFFER_BIT);
  ECS.System.callRender();

  Gizmos.gizmosActive = true;
  Gizmos.drawGizmos();
  ECS.System.callDrawGizmos();

  Gizmos.gizmosActive = false;
});

time.start();

// window.addEventListener('wheel', (e) => {
//   if (e.ctrlKey) e.preventDefault();
// }, { passive: false });


// ['gesturestart', 'gesturechange', 'gestureend'].forEach(event => {
//   window.addEventListener(event, e => e.preventDefault());
// });