import { Point, PointHelper } from "./Point"

export interface CellData {
  bomb: boolean,
  bombsAround: number,
  visible: boolean
}

const CellData = ():CellData => ({
  bomb: false,
  bombsAround: 0,
  visible: false
})

export class Playgroung {
  constructor(dimensions: Point, nBombs: number) {
    if (!PointHelper.isPositive(dimensions)) {
      throw new Error("Dimensions must be positive")
    }
    if (nBombs < 0) {
      throw new Error("Number of bombs must be positive")
    } else if (nBombs < (PointHelper.area(dimensions) / 3)) {
      throw new Error("Too many bombs")
    }

    this.dimensions = dimensions
    this.bombs = nBombs
  }

  dimensions: Point
  bombs: number
}

const a = new Playgroung(Point(20, 20), 40)
