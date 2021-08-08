import { Point, PointHelper } from './Point'
import { minilodash as _ } from './MiniLodash'

export interface CellData {
  bomb: boolean
  explode: boolean
  bombsAround: number
  explored: boolean
  flagged: boolean
  highlight: boolean
  forceSafe: boolean
  p: Point
}

const emptyCellData = (p: Point): CellData => ({
  bomb: false,
  explode: false,
  bombsAround: 0,
  explored: false,
  flagged: false,
  highlight: false,
  forceSafe: false,
  p,
})

const isSafe = (c: CellData) => !c.bomb && !c.flagged

export const CellHelper = {
  getText: (c: CellData): string => {
    if (c.flagged) {
      return '🚩️'
    }
    if (!c.explored) {
      return ''
    } else if (c.bomb) {
      return '💣'
    } else if (c.bombsAround > 0) {
      return c.bombsAround + ''
    }
    return ''
  },
}

export class Playground {
  dimensions: Point
  bombs: number
  matrix: Array<Array<CellData>>
  nCells: number
  started: boolean
  gameOver: boolean

  constructor(dimensions: Point, nBombs: number) {
    if (!PointHelper.isPositive(dimensions)) {
      throw new Error('Dimensions must be positive')
    }
    if (nBombs < 0) {
      throw new Error('Number of bombs must be positive')
    } else if (nBombs >= PointHelper.area(dimensions) / 3) {
      throw new Error('Too many bombs')
    }

    this.dimensions = dimensions
    this.nCells = PointHelper.area(this.dimensions)
    this.bombs = nBombs
    this.started = false
    this.gameOver = false
    this.buildMatrix()
  }

  private initGame = (cell: CellData) => {
    this.initBombs()
    this.populateNumbers()
  }

  private buildMatrix() {
    this.matrix = _.range(this.dimensions.y).map((i) =>
      _.range(this.dimensions.x).map((j) => emptyCellData(Point(j, i)))
    )
  }

  private intToPoint = (i: number): Point => {
    const local = i % this.nCells
    return {
      y: Math.floor(local / this.dimensions.x),
      x: local % this.dimensions.x,
    }
  }

  private initBombs() {
    let pending = this.bombs
    let counter = 0
    while (pending !== 0) {
      counter += _.random(97)
      const p = this.intToPoint(counter)
      const cell = this.matrix[p.y][p.x]
      if (!cell.bomb) {
        cell.bomb = true
        pending -= 1
      }
    }
  }

  inBounds = (p: Point) => PointHelper.isInBounds(p, this.dimensions)

  private populateNumbers = () => {
    const cellAtPointIsBomb = (p: Point) => this.getCell(p).bomb
    const isValid = (p: Point) => this.inBounds(p) && cellAtPointIsBomb(p)
    this.matrix.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.bomb) {
          cell.bombsAround = PointHelper.getPointsAround(cell.p).filter(isValid).length
        }
      })
    })
  }

  public discover(cell: CellData) {
    if (this.gameOver) {
      return
    }
    if (!this.started) {
      this.initGame(cell)
      this.started = true
    }
    cell.explored = true
    if (cell.bomb) {
      cell.explode = true
      this.gameOver = true
    } else if (isSafe(cell) && cell.bombsAround === 0) {
      this.autoDiscoverFrom(cell)
    }
  }

  private autoDiscoverFrom = (cell: CellData) => {
    this.getCellsAround(cell).forEach((c) => {
      if (!c.explored && isSafe(c)) {
        c.explored = true
        if (c.bombsAround === 0) {
          this.autoDiscoverFrom(c)
        }
      }
    })
  }

  private getCell = (p: Point) => this.matrix[p.y][p.x]

  public toggleFlag = (cell: CellData) => {
    if (this.started) {
      cell.flagged = !cell.flagged
    }
  }

  private getCellsAround = (cell: CellData) =>
    PointHelper.getPointsAround(cell.p)
      .filter(this.inBounds)
      .map((p) => this.getCell(p))

  public exploreAround = (cell: CellData) => {
    if (cell.explored && cell.bombsAround) {
      const cells = this.getCellsAround(cell)
      const flagsAround = _.sumBy(cells, (c) => (c.flagged ? 1 : 0))
      if (flagsAround === cell.bombsAround) {
        cells.forEach((c) => {
          if (!c.explored && !c.flagged) {
            this.discover(c)
          }
        })
      }
    }
  }

  public highlightCellsAround = (cell: CellData) => {
    this.getCellsAround(cell).forEach((c) => {
      if (!c.explored && !c.flagged) {
        c.highlight = true
      }
    })
  }

  public removeHighlight = (cell: CellData) => {
    this.getCellsAround(cell).forEach((c) => {
      c.highlight = false
    })
  }
}
