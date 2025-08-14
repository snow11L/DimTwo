import { ComponentGroup, ComponentType } from "../../modules/components/component-type";
import { Color } from "../math/Color";
import { Component } from "./Component";

export abstract class Render extends Component {
  color: Color;
  alpha: number;
  materialName: string;
  meshName: string | null;
  subMeshes: number[] | null;
  layer: number = 0;

  constructor(
    type: ComponentType,
    group: ComponentGroup,
    material: string,
    color: Color = Color.white,
    alpha: number = 1.0,
    meshName: string | null = "fillSquare",
    subMeshes: number[] | null = null
  ) {
    super(type, group);
    this.materialName = material;
    this.color = color;
    this.alpha = alpha;
    this.meshName = meshName;
    this.subMeshes = subMeshes;
  }
}
