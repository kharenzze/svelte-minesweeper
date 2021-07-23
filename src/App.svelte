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
    game.toggleFlag(cell)
    game = game
  }
</script>

<main>
    <h1>
        <span>
            Hello {name}!
            <button class="start"
                    class:hidden={game.started}
                    on:click={onClickStart      }
            >
                Start
            </button>
        </span>
    </h1>
    <div class="app">
        <table class="table">
            <tbody>
            {#each game.matrix as row}
                <tr>
                    {#each row as cellData}
                        <Cell data="{cellData}"
                              onClick="{onClick}"
                              onRightClick="{onRightClick}"
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
        position: absolute;
        z-index: 1;
        right: -100px;
        font-size: medium;
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

</style>
