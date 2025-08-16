import { Display, Resolution, ResolutionValues } from "./Display";
import { LayoutHelper } from "./LayoutHelper";

export class EditorDisplay extends Display {
    constructor() {
        super();

        const loadBtn = LayoutHelper.createSimpleButton("Load", () => {
            console.log("Load clicked");
        });
        const saveBtn = LayoutHelper.createSimpleButton("Save", () => {
            console.log("Save clicked");
        });

        const resolutionSelect = document.createElement("select");
        for (const resKey in Resolution) {
            if (isNaN(Number(resKey))) {
                const option = document.createElement("option");
                option.value = resKey;
                const { width, height } = ResolutionValues[Resolution[resKey as keyof typeof Resolution]];
                option.textContent = `${width} x ${height}`;
                resolutionSelect.appendChild(option);
            }
        }

        resolutionSelect.addEventListener("change", () => {
            const selected = resolutionSelect.value as keyof typeof Resolution;
            this.setResolution(Resolution[selected]);
        });

        this.optionsBar.appendChild(loadBtn);
        this.optionsBar.appendChild(saveBtn);
        this.optionsBar.appendChild(resolutionSelect);
        this.optionsBar.classList.add("editor")
    }
}