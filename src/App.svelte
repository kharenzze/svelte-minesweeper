<script lang="ts">
  import { Playground } from './GameLogic'
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
  $: face = game.gameOver ? '😭' : '😃'
</script>

<main>
  <div class="row">
    <h1>Hello {name}!</h1>
    <span class="face" class:hidden={!game.started}>{face}</span>
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

  button.start {
    font-size: medium;
    margin: 0 12px;
  }

  .app {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
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
