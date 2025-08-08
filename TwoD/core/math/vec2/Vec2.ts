export class Vec2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public static normalize(v: Vec2, out: Vec2): Vec2 {
    const len = Math.sqrt(v.x * v.x + v.y * v.y);
    if (len === 0) {
      out.x = 1;
      out.y = 0;
    } else {
      out.x = v.x / len;
      out.y = v.y / len;
    }
    return out;
  }

  public static subtract(a: Vec2, b: Vec2, out: Vec2): Vec2 {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }

  public static add(a: Vec2, b: Vec2, out: Vec2): Vec2 {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }

  public static perpendicular(v: Vec2, out: Vec2): Vec2 {
    out.x = -v.y;
    out.y = v.x;
    return out;
  }

  public static dot(a: Vec2, b: Vec2): number {
    return a.x * b.x + a.y * b.y;
  }

  public static divScalar(a: Vec2, scalar: number, out: Vec2): Vec2 {
    out.x = a.x / scalar;
    out.y = a.y / scalar;
    return out;
  }

  public static length(v: Vec2): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  public static lengthSquared(v: Vec2): number {
    return v.x * v.x + v.y * v.y;
  }

  public static distance(a: Vec2, b: Vec2): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static distanceSquared(a: Vec2, b: Vec2): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
  }

  public static createZero(out: Vec2): Vec2 {
    out.x = 0;
    out.y = 0;
    return out;
  }

  public static create(x: number, y: number, out: Vec2): Vec2 {
    out.x = x;
    out.y = y;
    return out;
  }
}
