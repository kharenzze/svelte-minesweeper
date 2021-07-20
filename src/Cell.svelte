<script lang="ts">
    let number = 1
</script>

<div class="{`container number-${number}`}">
    {number}
</div>

<style>
    :root {
        --cell-size: 32px;
    }
    .container {
        color: blue;
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
</style>
