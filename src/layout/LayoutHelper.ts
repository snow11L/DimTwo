type Option = {
    text?: LayoutTextOptons;
    icon?: LayoutIcon;
    value?: any;
    onClick?: (option: Option) => void;
};


type LayoutIcon = {
    imageSrc?: string;
    svgSrc?: string;

}


type LayoutDropDown = {
    initialOption?: number;
    text?: LayoutTextOptons;
    icon?: LayoutIcon;
    onClick?: () => void;
    options?: Option[];
    onOptionClick?: (option: Option) => void;
};


















export class LayoutHelper {

    public static createButton(text: string = "", onClick: () => void): HTMLDivElement {
        const container = document.createElement("div");
        container.innerText = text;
        container.addEventListener("click", onClick);
        return container;
    }

    public static createSimpleButton(text: string, onClick: () => void): HTMLButtonElement {
        const container = document.createElement("button");
        container.innerText = text;
        container.addEventListener("click", onClick);
        return container;
    }

    public static loadSvg(path: string): HTMLDivElement {
        const container = document.createElement("div");
        fetch(path)
            .then(res => res.text())
            .then(svgContent => {
                container.innerHTML = svgContent;
                container.className = "svg-container";
            })
            .catch(err => console.error(`Erro carregando ${path}:`, err));

        return container;
    }

    public static createFitContentDiv(width: boolean = true, height: boolean = true): HTMLDivElement {
        const div = document.createElement("div");
        if (width) div.style.width = "100%";
        if (height) div.style.height = "100%";
        return div;
    }

    public static createIcon(options: LayoutIcon): HTMLDivElement {
        const container = document.createElement("div");
        container.classList.add("engine-icon");

        if (options.svgSrc) {
            fetch(options.svgSrc)
                .then(res => res.text())
                .then(svgContent => {
                    const svgWrapper = document.createElement("div");
                    svgWrapper.innerHTML = svgContent;
                    svgWrapper.classList.add("engine-icon__svg-container");
                    container.appendChild(svgWrapper);
                })
                .catch(err => console.error(`Erro carregando SVG ${options.svgSrc}:`, err));
        }

        if (options.imageSrc) {
            const img = document.createElement("img");
            img.src = options.imageSrc;
            img.classList.add("engine-icon__image");
            container.appendChild(img);
        }

        return container;
    }


    public static createOption(option: Option): HTMLDivElement {
        const container = this.createContainer();
        container.className = "engine-option";

        if (option.text) {
            const textEl = this.createText(option.text);
            container.appendChild(textEl);
        }

        if (option.onClick) {
            container.addEventListener("click", () => { option.onClick?.(option) });
        }

        if (option.icon) {
            const icon = this.createIcon(option.icon);
            container.appendChild(icon);
        }

        return container;
    }

    public static createText(options: LayoutTextOptons): HTMLDivElement {
        const container = document.createElement("div");
        container.className = "engine-text";

        const line = document.createElement("div");
        line.className = "engine-text__line";

        const text = document.createElement("div");
        text.className = "engine-text__text";

        if (options.text) text.innerText = options.text;

        if (options.onClick) {
            container.addEventListener("click", options.onClick);
        }

        line.appendChild(text);
        container.appendChild(line);
        return container;
    }

    public static createDropdown(dropdown: LayoutDropDown): HTMLDivElement {
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

    public static createContainer(...elements: HTMLDivElement[]) {
        const container = document.createElement("div");
        container.className = "engine-container";
        for (const el of elements) {
            container.appendChild(el);
        }

        return container;
    }
}
