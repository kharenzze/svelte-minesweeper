<script lang="ts">
  import { Playground, GameStatus } from './GameLogic'
  import type { CellData } from './GameLogic'
  import Cell from './Cell.svelte'
  import { Point } from './Point'
  import { getContext } from 'svelte'
  import packageJson from '../package.json'

  let game = new Playground(Point(30, 16), 99)
  let version = `v${packageJson.version}`
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

  console.log('a')

  const { toggle } = getContext('theme') ?? {}
  const onClickToggle = () => toggle()

  $: face = game.status === GameStatus.GameOver ? '😭' : '😃'
  $: hideFace = game.status === GameStatus.Created
  $: win = game.status === GameStatus.Win
  $: progress = `${game.flagged}/${game.bombs}`
</script>

<div class="row">
  <h1>MINESWEEPER!</h1>
  <div class:hidden={hideFace}>
    <span class="face">{face}</span>
    <span>{progress}</span>
    <button on:click={onClickToggle}>t</button>
  </div>
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
<span class="version">{version}</span>

<style>
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .win > span {
    transform: rotate(-10deg);
    color: green;
    font-size: 290px;
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

  .version {
    font-size: smaller;
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
