export class LayoutHelper {

    public static createButton(text: string = "", onClick: () => void): HTMLDivElement {
        const container = document.createElement("div");
        container.innerText = text;
        container.addEventListener("click", onClick);
        return container;
    };

    public static createSimpleButton(text: string, onClick: () => void): HTMLButtonElement {
        const container = document.createElement("button");
        container.innerText = text;
        container.addEventListener("click", onClick);
        return container;
    };


    public static loadSvg(path: string): HTMLDivElement {
        const container = document.createElement("div");
        fetch(path)
            .then(res => res.text())
            .then(svgContent => {
                container.innerHTML = svgContent;
                container.className = "svg-container"
            })
            .catch(err => console.error(`Erro carregando ${path}:`, err));

        return container;
    }

    public static createFitContentDiv(width: boolean = true, height: boolean = true) {
        const div = document.createElement("div");
        if (width) {
            div.style.width = "100%";
        }
        if (height) {
            div.style.height = "100%";
        }

        return div;
    }
}