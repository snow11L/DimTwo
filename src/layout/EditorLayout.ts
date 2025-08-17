import { Display } from "../engine/core/display/Display";
import { LayoutButton } from "./elements/LayoutButton";
import { ResolutionSelector } from "./elements/ResolutionSelector";

export class EditorLayout extends Display {
    constructor() {
        super();

        const loadBtn = new LayoutButton({
            text: "Load",
            onClick: () => {
                console.log("Load clicked");
            }
        });
        this.optionsBar.appendChild(loadBtn.getRenderElement());

        const saveBtn = new LayoutButton({
            text: "Save",
            onClick: () => {
                console.log("Save clicked");
            }
        });
        this.optionsBar.appendChild(saveBtn.getRenderElement());

        const dropdown = ResolutionSelector(this);
        this.optionsBar.appendChild(dropdown.getRenderElement());
        this.optionsBar.classList.add("editor")
    }
}