<script lang="ts">
    export let number: Number = 1
</script>

<div class="{`container number-${number}`}">
    {number}
</div>

<style>
    :root {
        --cell-size: 32px;
    }
    .container {
        color: black;
        height: var(--cell-size);
        width: var(--cell-size);
        background-color: #999999;
        border: grey solid 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
        box-sizing: border-box;
    }

    .number-1 {
        color: blue;
    }

</style>
