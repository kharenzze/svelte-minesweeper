<script lang="ts">
  import { Playgroung } from "./GameLogic"
  import type { CellData } from "./GameLogic"
  import Cell from './Cell.svelte'
  import { Point } from "./Point"

  export let name: string
  const game = new Playgroung(Point(20, 20), 40)
  const onClick = (cell: CellData) => {
    console.log(cell)
  }
</script>

<main>
    <h1>Hello {name}!</h1>
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
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    .table {
        border-spacing: 0;
    }

</style>
