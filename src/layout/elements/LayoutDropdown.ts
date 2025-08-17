import { LayoutButton, type LayoutButtonOptions } from "./LayoutButton";
import { LayoutElement } from "./LayoutElement";
import type { LayoutIcon } from "./LayoutIcon";

export type LayoutDropdownOptions = {
    text?: string;
    initialOptionIndex?: number;
    icon?: LayoutIcon;
    options?: LayoutButtonOptions[];
}

export class LayoutDropdown extends LayoutElement {
    optionsContainer: LayoutElement;
    mainButton: LayoutButton;

    constructor(options: LayoutDropdownOptions) {
        super();
        this.addClass("engine-dropdown");

        this.mainButton = new LayoutButton({
            text: options.text,
            onClick: () => {
                console.log("main clicado");
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
                    console.log("option clicado")
                    this.optionsContainer.removeClass("visible");
                }

                const option = new LayoutButton(config);

                option.addClass("engine-dropdown__option")
                this.optionsContainer.appendElements(option);
            }
        };

        this.appendElements(this.optionsContainer);

        document.addEventListener("click", () => {
            this.optionsContainer.toogleClass("visible");
        })
    }
}

/*  public static createDropdown(dropdown: LayoutDropDown): HTMLDivElement {
        const dropdownContainer = this.createContainer();
        dropdownContainer.className = "engine-dropdown";

        let initial: { text?: LayoutTextOptons, icon?: LayoutIcon } = { text: dropdown.text, icon: dropdown.icon };

        if (typeof dropdown.initialOption === "number" && dropdown.options && dropdown.options[dropdown.initialOption]) {
            initial.text = dropdown.options[dropdown.initialOption].text;
            initial.icon = dropdown.options[dropdown.initialOption].icon;
        }

        const mainButton = this.createOption({
            text: initial.text,
            icon: initial.icon,
            onClick: dropdown.onClick
        });

        const optionsContainer = this.createContainer();
        optionsContainer.classList.add("engine-dropdown__options");

        dropdown.options?.forEach(opt => {
            const optionEl = this.createOption({
                ...opt,
                onClick: () => {

                    if (dropdown.onOptionClick) {
                        dropdown.onOptionClick(opt);
                    }

                    if (opt.text) {
                        mainButton.innerText = opt.text.text ?? "";
                    }

                    if (opt.icon) {

                    }

                    optionsContainer.classList.remove("engine-dropdown__options--open");
                }
            });
            optionsContainer.appendChild(optionEl);
        });

        mainButton.addEventListener("click", (e) => {
            e.stopPropagation();
            optionsContainer.classList.toggle("engine-dropdown__options--open");
        });

        document.addEventListener("click", () => {
            optionsContainer.classList.remove("engine-dropdown__options--open");
        });

        dropdownContainer.appendChild(mainButton);
        dropdownContainer.appendChild(optionsContainer);
        return dropdownContainer;
    }
 */