<script lang="ts">
  import type { CellData } from "./GameLogic"
  import { CellHelper } from "./GameLogic"

  export let data: CellData
  export let onClick: (cell:CellData) => void
  const localClick = () => {
    onClick(data)
    data = data
  }

  $: text = CellHelper.getText(data)
</script>

<td class="{`container number-${text}`}"
    on:click={localClick}
>
    {text}
    <div class="bubble" class:hidden={data.explored}>

    </div>
</td>

<style>
    :root {
        --cell-size: 32px;
    }

    .container {
        color: black;
        height: var(--cell-size);
        min-width: 32px;
        min-height: 32px;
        width: var(--cell-size);
        background-color: darkgrey;
        border: grey solid 1px;
        font-weight: bolder;
        box-sizing: border-box;
        margin: 0;
        position: relative;
    }

    .hidden {
        display: none;
    }

    .bubble {
        z-index: 1;
        position: absolute;
        height: 32px;
        width: 32px;
        inset: 0;
        border-bottom: #333333 solid 3px;
        border-right: #333333 solid 3px;
        border-left: #dddddd solid 3px;
        border-top: #dddddd solid 3px;
        box-sizing: border-box;
    }

    .number-1 {
        color: blue;
    }

    .number-2 {
        color: green;
    }

    .number-3 {
        color: red;
    }

    .number-4 {
        color: purple;
    }

    .number-5 {
        color: maroon;
    }

    .number-6 {
        color: turquoise;
    }

    .number-7 {
        color: black;
    }

    .number-8 {
        color: grey;
    }

</style>
