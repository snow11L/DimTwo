export interface ResolutionSize {
    width: number;
    height: number;
}

export enum Resolution {
    R1920x1080,
    R1600x900,
    R1440x900,
    R1366x768,
    R1280x1024,
    R1280x800,
    R1280x720,
    R1024x768,
    R800x600,
    R640x480
}

export const ResolutionValues: Record<Resolution, ResolutionSize> = {
    [Resolution.R1920x1080]: { width: 1920, height: 1080 },
    [Resolution.R1600x900]: { width: 1600, height: 900 },
    [Resolution.R1440x900]: { width: 1440, height: 900 },
    [Resolution.R1366x768]: { width: 1366, height: 768 },
    [Resolution.R1280x1024]: { width: 1280, height: 1024 },
    [Resolution.R1280x800]: { width: 1280, height: 800 },
    [Resolution.R1280x720]: { width: 1280, height: 720 },
    [Resolution.R1024x768]: { width: 1024, height: 768 },
    [Resolution.R800x600]: { width: 800, height: 600 },
    [Resolution.R640x480]: { width: 640, height: 480 },
};

export class Display {
    
    private readonly context: WebGL2RenderingContext;
    private readonly canvas: HTMLCanvasElement;
    protected readonly container: HTMLDivElement;

    private static focused: Display | null = null;

    public width: number = 800;  
    public height: number = 600;

    constructor() {
        this.container = document.createElement("div");
        this.container.className = "engine-container";

        this.canvas = document.createElement("canvas");
        this.canvas.className = "engine-canvas";
        this.container.appendChild(this.canvas);

        const gl = this.canvas.getContext("webgl2");
        if (!gl) throw new Error("WebGL2 not supported");
        this.context = gl;

        this.handleEvents();
    }

    public getAspectRatio(): number {
        return this.width / this.height;
    }

    public getInternalAspectRatio(): number {
        return this.canvas.width / this.canvas.height;
    }
    public setResolution(resolution: Resolution) {
        const { width: renderWidth, height: renderHeight } = ResolutionValues[resolution];

        this.canvas.width = renderWidth;
        this.canvas.height = renderHeight;

        this.updateDimensions();

        this.context.viewport(0, 0, renderWidth, renderHeight);
    }

    private updateDimensions() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
    }

    public addToDocument(parent: HTMLElement) {
        parent.appendChild(this.container);
        this.updateDimensions();
    }

    private handleEvents() {
        this.container.addEventListener("click", () => this.setFocused(this));

        window.addEventListener("resize", () => {
            this.updateDimensions();
            this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
        });
    }

    public getContext(): WebGL2RenderingContext {
        return this.context;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getContainer(): HTMLDivElement {
        return this.container;
    }

    public static getFocused(): Display | null {
        return this.focused;
    }

    public setFocused(display: Display) {
        if (Display.focused) Display.focused.container.classList.remove("focused");

        display.container.classList.add("focused");
        Display.focused = display;
    }
}
