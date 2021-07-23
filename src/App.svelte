<script lang="ts">
  import { Playgroung } from "./GameLogic"
  import type { CellData } from "./GameLogic"
  import Cell from './Cell.svelte'
  import { Point } from "./Point"

  export let name: string
  let game = new Playgroung(Point(30, 16), 99)
  const onClick = (cell: CellData) => {
    game.discover(cell)
    game = game
  }
  const onClickStart = () => {
    game.quickStart()
    game = game
  }
  const onRightClick = (cell:CellData) => {
    if (cell.explored) {
      //highlight
    } else {
      game.toggleFlag(cell)
    }
    game = game
  }
  const onDoubleClick = (cell:CellData) => {
    game.exploreAround(cell)
    game = game
  }
  $: face = game.gameOver ? '😭' : '😃'
</script>

<main>
    <div class="row">
        <h1>Hello {name}!</h1>
        <button class="start"
                class:hidden={game.started}
                on:click={onClickStart}
        >
            Start
        </button>
        <span class="face" class:hidden={!game.started}>{face}</span>
    </div>
    <div class="app">
        <table class="table">
            <tbody>
            {#each game.matrix as row}
                <tr>
                    {#each row as cellData}
                        <Cell data="{cellData}"
                              onClick="{onClick}"
                              onRightClick="{onRightClick}"
                              onDoubleClick="{onDoubleClick}"
                        />
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

    h1 > span {
        position: relative;
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
