export interface Point {
  x: number
  y: number
}

export const Point = (x: number, y: number): Point => ({ x, y })

const abs = (i: number) => (i < 0 ? -i : i)

const ADJACENT = [Point(1, 0), Point(0, 1), Point(-1, 0), Point(0, -1)]

export const PointHelper = {
  isPositive: (p: Point) => p.x >= 0 && p.y >= 0,

  isZero: (p: Point) => p.x === 0 && p.y === 0,

  area: (p: Point) => p.x * p.y,

  getPointsAround: (p: Point): Array<Point> => {
    const diff = [-1, 0, 1]
    const points = new Array(9)
    diff.forEach((i) => {
      diff.forEach((j) => {
        const q = Point(i, j)
        if (!PointHelper.isZero(q)) points.push(PointHelper.add(p, q))
      })
    })
    return points
  },

  getAdjacentPoints: (p: Point) => ADJACENT.map((q) => PointHelper.add(p, q)),

  add: (p: Point, q: Point): Point => Point(p.x + q.x, p.y + q.y),

  subtract: (p: Point, q: Point): Point => Point(p.x - q.x, p.y - q.y),

  abs: (p: Point): Point => Point(abs(p.x), abs(p.y)),

  isAround: (p: Point, q: Point) => {
    const diff = PointHelper.abs(PointHelper.subtract(p, q))
    return PointHelper.isInBounds(diff, Point(1, 1))
  },

  isInBounds: (p: Point, bound: Point) =>
    PointHelper.isPositive(p) && p.x < bound.x && p.y < bound.y,
}
