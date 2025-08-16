import type { Engine } from "../../Engine";
import { Display } from "./Display";
import { LayoutHelper } from "./LayoutHelper";

export class GameDisplay extends Display {
    constructor(engine: Engine) {
        super();

        const startBtn = LayoutHelper.createButton(undefined, () => {
            engine.time.start();
            engine.loadScene("simple_scene", true);
        });

        startBtn.appendChild(LayoutHelper.loadSvg("./src/layout/play-fill.svg"));

        const pauseBtn = LayoutHelper.createButton(undefined, () => {
            engine.time.pause();
        });

        pauseBtn.appendChild(LayoutHelper.loadSvg("./src/layout/pause-fill.svg"));

        const resumeBtn = LayoutHelper.createButton(undefined, () => {
            engine.time.resume();
        });

        resumeBtn.appendChild(LayoutHelper.loadSvg("./src/layout/resume-fill.svg"));

        const stopBtn = LayoutHelper.createButton(undefined, () => {
            engine.time.stop();
            engine.unloadScene();

        });

        stopBtn.appendChild(LayoutHelper.loadSvg("./src/layout/stop-fill.svg"));

        this.optionsBar.appendChild(LayoutHelper.createFitContentDiv(true, false));
        this.optionsBar.appendChild(startBtn);
        this.optionsBar.appendChild(pauseBtn);
        this.optionsBar.appendChild(resumeBtn);
        this.optionsBar.appendChild(stopBtn);
        this.optionsBar.appendChild(LayoutHelper.createFitContentDiv(true, false));
        this.optionsBar.classList.add("game");

    }
}
