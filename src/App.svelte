<script lang="ts">
  import Cell from './Cell.svelte'
  import _ from 'lodash'

  export let name: string
  const  matrix = _.map(_.range(9), () => _.range(9))
</script>

<main>
    <h1>Hello {name}!</h1>
    <table class="table">
        <tbody>
        {#each matrix as row}
            <tr>
                {#each row as num}
                    <Cell number="{num}"/>
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
