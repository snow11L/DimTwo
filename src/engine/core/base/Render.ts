import { ComponentType } from "../../modules/components/component-type";
import { Color } from "../math/color/color";
import { Component } from "./Component";

export abstract class Render extends Component {
  color: Color;
  alpha: number;
  material: string;
  meshName: string | null;
  subMeshes: number[] | null;

  constructor(
    type: ComponentType,
    category: ComponentType,
    material: string,
    color: Color = Color.white,
    alpha: number = 1.0,
    meshName: string | null = null,
    subMeshes: number[] | null = null
  ) {
    super(type, category);
    this.material = material;
    this.color = color;
    this.alpha = alpha;
    this.meshName = meshName;
    this.subMeshes = subMeshes;
  }
}
