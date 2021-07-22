export interface Point {
  x: number,
  y: number,
}

export const Point = (x: number, y: number): Point => ({x, y})

const getAroundBuilder = (diff: Array<number>) => (p: Point): Array<Point> => {
  const points = new Array(9)
  diff.forEach(i => {
    diff.forEach(j => {
      const q = Point(i, j)
      if (!PointHelper.isZero(q))
        points.push(PointHelper.add(p, q))
    })
  })
  return points
}

export const PointHelper = {
  isPositive: (p: Point) =>
    p.x >= 0 && p.y >= 0,

  isZero: (p: Point) => p.x === 0 && p.y === 0,

  area: (p: Point) => p.x * p.y,

  getPointsAround: getAroundBuilder([-1, 0, 1]),

  getPointsAdjacent: getAroundBuilder([-1, 1]),

  add: (p: Point, q: Point): Point => Point(p.x + q.x, p.y + q.y),

  isInBounds: (p: Point, bound: Point) =>
    PointHelper.isPositive(p) && p.x < bound.x && p.y < bound.y,
}
