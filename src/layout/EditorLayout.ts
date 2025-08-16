import { Display, Resolution } from "../engine/core/display/Display";
import { LayoutHelper } from "./LayoutHelper";

export class EditorLayout extends Display {
    constructor() {
        super();

        const loadBtn = LayoutHelper.createOption({
            text: {
                name: "load"
            },
            onClick() {
                console.log("Load clicked");
            }
        });

        const saveBtn = LayoutHelper.createOption({
            text: {
                name: "save"
            },
            onClick() {
                console.log("Save clicked");
            }
        });

        const dropdown = LayoutHelper.createDropdown({
            initialOption: Resolution.R1920x1080,
            options: [
                { text: { name: "3840x2160" }, value: Resolution.R3840x2160, icon: { svgSrc: "./src/layout/svg/badge-4k-fill.svg" } },
                { text: { name: "2560x1440" }, value: Resolution.R2560x1440, icon: { svgSrc: "./src/layout/svg/badge-4k-fill.svg" } },
                { text: { name: "1920x1080" }, value: Resolution.R1920x1080, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1680x1050" }, value: Resolution.R1680x1050, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1600x900" }, value: Resolution.R1600x900, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1440x900" }, value: Resolution.R1440x900, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1366x768" }, value: Resolution.R1366x768, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1280x1024" }, value: Resolution.R1280x1024, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1280x800" }, value: Resolution.R1280x800, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1280x720" }, value: Resolution.R1280x720, icon: { svgSrc: "./src/layout/svg/badge-hd-fill.svg" } },
                { text: { name: "1024x768" }, value: Resolution.R1024x768, icon: { svgSrc: "./src/layout/svg/badge-sd-fill.svg" } },
                { text: { name: "800x600" }, value: Resolution.R800x600, icon: { svgSrc: "./src/layout/svg/badge-sd-fill.svg" } },
                { text: { name: "640x480" }, value: Resolution.R640x480, icon: { svgSrc: "./src/layout/svg/badge-sd-fill.svg" } }
            ],

            onOptionClick: (option) => {
                this.setResolution(option.value);
            }
        });




        this.optionsBar.appendChild(loadBtn);
        this.optionsBar.appendChild(saveBtn);
        this.optionsBar.appendChild(dropdown);
        this.optionsBar.classList.add("editor")
    }
}