import { LayoutButton, type LayoutButtonOptions } from "./LayoutButton";
import { LayoutElement } from "./LayoutElement";
import type { LayoutIconOptions } from "./LayoutIcon";

export type LayoutDropdownOptions = {
    text?: string;
    initialOptionIndex?: number;
    icon?: LayoutIconOptions;
    options?: LayoutButtonOptions[];
    onOptionClick?: (option: LayoutButton) => void;
}

export class LayoutDropdown extends LayoutElement {
    optionsContainer: LayoutElement;
    mainButton: LayoutButton;

    constructor(options: LayoutDropdownOptions) {
        super();
        this.addClass("engine-dropdown");

        this.mainButton = new LayoutButton({
            propagation: false,
            text: options.text,
            onClick: () => {
                this.optionsContainer.toggleClass("visible");
            }
        });

        this.mainButton.addClass("engine-dropdown__main");
        this.appendElements(this.mainButton);

        this.optionsContainer = new LayoutElement();
        this.optionsContainer.addClass("engine-dropdown__options");

        if (options.options) {
            for (const config of options.options) {

                config.propagation = false;

                config.onClick = () => {
                    if (options.onOptionClick) {
                        options.onOptionClick(option);
                    }
                    this.optionsContainer.toggleClass("visible");
                }

                const option = new LayoutButton(config);

                option.addClass("engine-dropdown__option")
                this.optionsContainer.appendElements(option);
            }
        };

        this.appendElements(this.optionsContainer);

        document.addEventListener("click", () => {
            this.optionsContainer.removeClass("visible");
        })
    }
}