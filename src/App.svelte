<script lang="ts">
  import { Playgroung } from "./GameLogic"
  import type { CellData } from "./GameLogic"
  import Cell from './Cell.svelte'
  import { Point } from "./Point"

  export let name: string
  let game = new Playgroung(Point(30, 16), 99)
  const onClick = (cell: CellData) => {
    cell.bombsAround = 3
    console.log(cell)
    game = game
  }
</script>

<main>
    <h1>Hello {name}!</h1>
    <div class="app">
        <table class="table">
            <tbody>
            {#each game.matrix as row}
                <tr>
                    {#each row as cellData}
                        <Cell data="{cellData}"
                              onClick="{onClick}"
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

</style>
