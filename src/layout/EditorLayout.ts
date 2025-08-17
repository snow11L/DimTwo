import { Display } from "../engine/core/display/Display";
import { LayoutButton } from "./elements/LayoutButton";
import { LayoutDropdown } from "./elements/LayoutDropdown";


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

        const dropdown = new LayoutDropdown({
            text: "teste",
            options: [
                {
                    text: "terer"
                },
                {
                    text: "ola mundo"
                },
                {
                    text: "ola mundo"
                },
                {
                    text: "ola mundo"
                }
            ]
        })
       
        this.optionsBar.appendChild(dropdown.getRenderElement());
        this.optionsBar.classList.add("editor")
    }
}