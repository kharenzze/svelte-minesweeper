import { Point, PointHelper } from "./Point"
import { minilodash as _ } from "./MiniLodash"

export interface CellData {
  bomb: boolean,
  bombsAround: number,
  visible: boolean,
  p: Point,
}

const emptyCellData = (p: Point):CellData => ({
  bomb: false,
  bombsAround: 0,
  visible: true,
  p
})

export const CellHelper = {
  getText: (c: CellData): string => {
    if (!c.visible) {
      return ''
    } else if (c.bomb) {
      return '💣'
    } else if (c.bombsAround > 0) {
      return c.bombsAround + ''
    }
    return ''
  }
}

export class Playgroung {
  constructor(dimensions: Point, nBombs: number) {
    if (!PointHelper.isPositive(dimensions)) {
      throw new Error("Dimensions must be positive")
    }
    if (nBombs < 0) {
      throw new Error("Number of bombs must be positive")
    } else if (nBombs >= (PointHelper.area(dimensions) / 3)) {
      throw new Error("Too many bombs")
    }

    this.dimensions = dimensions
    this.bombs = nBombs
    this.buildMatrix()
    this.initBombs()
  }

  private buildMatrix() {
    this.matrix = _.range(this.dimensions.y)
      .map(i => _.range(this.dimensions.x)
        .map(j => emptyCellData(Point(j, i)))
      )
  }

  private initBombs() {
    
  }

  dimensions: Point
  bombs: number
  matrix: Array<Array<CellData>>
}
