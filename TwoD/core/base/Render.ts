import { ComponentTypes } from "../../components/component-type";
import { Color } from "../math/color/color";
import { Component } from "./Component";

export abstract class Render extends Component {
  color: Color;
  alpha: number;
  material: string;
  meshID: number | null;
  subMeshes: number[] | null;

  constructor(
    type: ComponentTypes,
    category: ComponentTypes,
    material: string,
    color: Color = Color.white,
    alpha: number = 1.0,
    meshID: number | null = null,
    subMeshes: number[] | null = null
  ) {
    super(type, category);
    this.material = material;
    this.color = color;
    this.alpha = alpha;
    this.meshID = meshID;
    this.subMeshes = subMeshes;
  }
}
