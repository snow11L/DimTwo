export class LayoutElement {
    protected container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
    }

    public getRenderElement(): HTMLDivElement {
        return this.container;
    }

    public appendElements(...elements: LayoutElement[]) {
        elements.forEach(el => this.container.appendChild(el.getRenderElement()));
    }

    public addClass(...classNames: string[]) {
        this.container.classList.add(...classNames);
    }

    public toggleClass(className: string) {
        this.container.classList.toggle(className);
    }

    public removeClass(className: string) {
        this.container.classList.remove(className);
    }
    public setInnerHTML(html: string) {
        this.container.innerHTML = html;
    }
    public setText(text: string) {
        this.container.innerText = text;
    }

}
