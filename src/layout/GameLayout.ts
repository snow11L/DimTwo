import type { Engine } from "../engine/Engine";
import { Display, Resolution } from "../engine/core/display/Display";
import { LayoutHelper } from "./LayoutHelper";

export class GameLayout extends Display {
    constructor(engine: Engine) {
        super();

        const playBtn = LayoutHelper.createOption({
            icon: {
                svgSrc: "./src/layout/svg/play-fill.svg"
            },
            onClick() {
                engine.time.play();
                engine.loadScene("simple_scene", true);
            },
        });

        const pauseBtn = LayoutHelper.createOption({
            icon: {
                svgSrc: "./src/layout/svg/pause-fill.svg"
            },
            onClick() {
                engine.time.pause();
            },
        });

        const resumeBtn = LayoutHelper.createOption({
            icon: {
                svgSrc: "./src/layout/svg/resume-fill.svg"
            },
            onClick() {
                engine.time.resume();
            },
        });

        const stopBtn = LayoutHelper.createOption({
            icon: {
                svgSrc: "./src/layout/svg/stop-fill.svg"
            },
            onClick() {
                engine.time.stop();
                engine.unloadScene();
            },
        });

        const dropdown = LayoutHelper.createDropdown({
            initialOption: Resolution.R1920x1080,
            options: [
                { text: { name: "3840x2160" }, value: Resolution.R3840x2160 },
                { text: { name: "2560x1440" }, value: Resolution.R2560x1440 },
                { text: { name: "1920x1080" }, value: Resolution.R1920x1080 },
                { text: { name: "1680x1050" }, value: Resolution.R1680x1050 },
                { text: { name: "1600x900" }, value: Resolution.R1600x900 },
                { text: { name: "1440x900" }, value: Resolution.R1440x900 },
                { text: { name: "1366x768" }, value: Resolution.R1366x768 },
                { text: { name: "1280x1024" }, value: Resolution.R1280x1024 },
                { text: { name: "1280x800" }, value: Resolution.R1280x800 },
                { text: { name: "1280x720" }, value: Resolution.R1280x720 },
                { text: { name: "1024x768" }, value: Resolution.R1024x768 },
                { text: { name: "800x600" }, value: Resolution.R800x600 },
                { text: { name: "640x480" }, value: Resolution.R640x480 }
            ],

            onOptionClick: (option) => {
                this.setResolution(option.value);
            }
        });

        this.optionsBar.appendChild(dropdown);
        this.optionsBar.appendChild(LayoutHelper.createFitContentDiv(true, false));
        this.optionsBar.appendChild(playBtn);
        this.optionsBar.appendChild(pauseBtn);
        this.optionsBar.appendChild(resumeBtn);
        this.optionsBar.appendChild(stopBtn);
        this.optionsBar.appendChild(LayoutHelper.createFitContentDiv(true, false));
        this.optionsBar.classList.add("game");

    }
}
