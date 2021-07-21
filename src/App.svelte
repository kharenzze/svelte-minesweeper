<script lang="ts">
  import Cell from './Cell.svelte'
  import { minilodash as _ } from './MiniLodash'

  export let name: string
  const  matrix = _.range(9).map(() => _.range(9))
  const onClick = (x, y) => {
    console.log(x, y)
  }
</script>

<main>
    <h1>Hello {name}!</h1>
    <table class="table">
        <tbody>
        {#each matrix as row, y}
            <tr>
                {#each row as num, x}
                    <Cell number="{num}"
                          x="{x}"
                          y="{y}"
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
