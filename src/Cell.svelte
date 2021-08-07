<script lang="ts">
  import type { CellData } from './GameLogic'
  import { CellHelper } from './GameLogic'

  export let data: CellData
  export let onClick: (cell: CellData) => void
  export let onRightClick: (cell: CellData) => void
  export let onDoubleClick: (cell: CellData) => void
  const localClick = (evt: MouseEvent) => {
    if (evt.buttons === 2) {
      onDoubleClick(data)
    } else {
      onClick(data)
    }
  }
  const localRightClick = (evt: Event) => {
    evt.preventDefault()
  }

  const localDoubleClick = () => {
    onDoubleClick(data)
  }

  const localMouseDown = (evt: MouseEvent) => {
    if (evt.button === 2) {
      onRightClick(data)
    }
  }

  $: text = CellHelper.getText(data)
</script>

<td
  class={`container number-${text}`}
  class:explosion={data.explode}
  class:highlight={data.highlight}
  on:click={localClick}
  on:dblclick={localDoubleClick}
  on:contextmenu={localRightClick}
  on:mousedown={localMouseDown}
>
  {text}
  <div class="bubble" class:hidden={data.explored} />
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
    user-select: none;
  }

  .hidden {
    display: none;
  }

  .explosion {
    background: red;
  }

  .highlight {
    background: cornflowerblue;
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
