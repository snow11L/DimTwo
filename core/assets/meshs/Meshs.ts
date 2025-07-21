import { createFillSquareMesh, createWireSquareMesh } from "./Square";

export const Meshs = {
    square: createFillSquareMesh("square_mesh", { x: 1, y: 1, z: 0 }),
    wireSquare: createWireSquareMesh("wire_square_mesh", { x: 1, y: 1, z: 0 })
}


