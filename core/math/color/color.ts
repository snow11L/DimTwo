export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

function rgba(r: number, g: number, b: number, a: number = 1): Color {
    return {
        r: r / 255,
        g: g / 255,
        b: b / 255,
        a,
    };
}

function random(alpha: boolean = false): Color {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
        a: alpha ? Math.random() : 1.0,
    };
}

export const Color = {
    rgba,
    random,

    RED: Object.freeze(rgba(255, 0, 0, 1)),
    GREEN: Object.freeze(rgba(0, 255, 0, 1)),
    BLUE: Object.freeze(rgba(0, 0, 255, 1)),
    YELLOW: Object.freeze(rgba(255, 255, 0, 1)),
    CYAN: Object.freeze(rgba(0, 255, 255, 1)),
    MAGENTA: Object.freeze(rgba(255, 0, 255, 1)),
    WHITE: Object.freeze(rgba(255, 255, 255, 1)),
    BLACK: Object.freeze(rgba(0, 0, 0, 1)),
    GRAY: Object.freeze(rgba(128, 128, 128, 1)),
    LIGHT_GRAY: Object.freeze(rgba(211, 211, 211, 1)),
    DARK_GRAY: Object.freeze(rgba(105, 105, 105, 1)), 
    ORANGE: Object.freeze(rgba(255, 165, 0, 1)),
    PURPLE: Object.freeze(rgba(128, 0, 128, 1)),
    PINK: Object.freeze(rgba(255, 192, 203, 1)),
    BROWN: Object.freeze(rgba(165, 42, 42, 1)),   
    TRANSPARENT: Object.freeze(rgba(0, 0, 0, 0)),

    SNOW: Object.freeze(rgba(255, 250, 250, 1)),     
    IVORY: Object.freeze(rgba(255, 255, 240, 1)),      
    GAINSBORO: Object.freeze(rgba(220, 220, 220, 1)),  
    SLATE_GRAY: Object.freeze(rgba(112, 128, 144, 1)),   
    DARK_SLATE_GRAY: Object.freeze(rgba(47, 79, 79, 1)), 

    TEAL: Object.freeze(rgba(0, 128, 128, 1)),
    OLIVE: Object.freeze(rgba(128, 128, 0, 1)),
    NAVY: Object.freeze(rgba(0, 0, 128, 1)),
    GOLD: Object.freeze(rgba(255, 215, 0, 1)),      
    SILVER: Object.freeze(rgba(192, 192, 192, 1)),      
    TAN: Object.freeze(rgba(210, 180, 140, 1)),           
    LIGHT_GREEN: Object.freeze(rgba(144, 238, 144, 1)),   
    LIGHT_BLUE: Object.freeze(rgba(173, 216, 230, 1)),     
    LIGHT_CORAL: Object.freeze(rgba(240, 128, 128, 1)),    
    THISTLE: Object.freeze(rgba(216, 191, 216, 1)),        
};
