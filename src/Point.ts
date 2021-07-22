export interface Point {
  x: number,
  y: number,
}

export interface BoundedPoint extends Point {
  bounds: Point
}

export const Point = (x: number, y: number): Point => ({x, y})

export const PointHelper = {
  isPositive: (p: Point) =>
    p.x >= 0 && p.y >= 0,

  area: (p: Point) => p.x * p.y,
}
