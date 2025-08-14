
export class Mathf {

    public static readonly sin = Math.sin;
    public static readonly cos = Math.cos;

    public static degToRad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }
}