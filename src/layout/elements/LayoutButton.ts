import { LayoutElement } from "./LayoutElement";
import { LayoutIcon } from "./LayoutIcon";
import { LayoutText } from "./LayoutText";

export type LayoutButtonOptions = {
    text?: string;
    icon?: LayoutIcon;
    propagation?: boolean;
    value?: any;
    onClick?: (element: LayoutElement) => void;
}

export class LayoutButton extends LayoutElement {
    text?: LayoutText;
    icon?: LayoutIcon;
    value?: number;

    constructor(options: LayoutButtonOptions) {
        super();
        this.addClass("engine-option");

        if (options.text) {
            this.text = new LayoutText({ text: options.text });
            this.appendElements(this.text);
        }

        this.value = options.value;

        if (options.icon) {
            this.icon = options.icon;
            this.appendElements(this.icon);
        }

        if (options.onClick) {
            this.container.addEventListener("click", (e) => {
                if (options?.propagation == false) {
                    e.stopPropagation();
                }
                options.onClick?.(this)
            });
        }
    }
}