<script lang="ts">
  import { Playground, GameStatus } from './GameLogic'
  import type { CellData } from './GameLogic'
  import Cell from './Cell.svelte'
  import { Point } from './Point'

  export let name: string
  let game = new Playground(Point(30, 16), 99)
  let lastHighlight
  const onClick = (cell: CellData) => {
    game.discover(cell)
    game = game
  }
  const onRightClick = (cell: CellData) => {
    if (cell.explored && cell.bombsAround) {
      lastHighlight = cell
      game.highlightCellsAround(cell)
    } else {
      game.toggleFlag(cell)
    }
    game = game
  }
  const onDoubleClick = (cell: CellData) => {
    game.exploreAround(cell)
    game = game
  }
  const mouseUp = (evt: MouseEvent) => {
    if (evt.button === 2 && lastHighlight) {
      game.removeHighlight(lastHighlight)
      game = game
    }
  }
  $: face = game.status === GameStatus.GameOver ? '😭' : '😃'
  $: hideFace = game.status === GameStatus.Created
  $: win = game.status === GameStatus.Win
</script>

<main>
  <div class="row">
    <h1>Hello {name}!</h1>
    <span class="face" class:hidden={hideFace}>{face}</span>
  </div>
  <div class="app">
    <table class="table" on:mouseup={mouseUp}>
      <tbody>
        {#each game.matrix as row}
          <tr>
            {#each row as cellData}
              <Cell data={cellData} {onClick} {onRightClick} {onDoubleClick} />
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="win" class:hidden={!win}>
      <span>WIN</span>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  .app {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .win {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .win > span {
    transform: rotate(30);
    color: green;
    font-size: 80px;
  }

  .table {
    border-spacing: 0;
  }

  .hidden {
    display: none;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .face {
    font-size: 30px;
    margin: 0 12px;
  }
</style>
