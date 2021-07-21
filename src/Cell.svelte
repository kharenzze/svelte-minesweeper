<script lang="ts">
    export let number: Number = 1
</script>

<td class="{`container number-${number}`}">
    {number}
</td>

<style>
    :root {
        --cell-size: 32px;
    }
    .container {
        color: black;
        height: var(--cell-size);
        width: var(--cell-size);
        background-color: darkgrey;
        border: grey solid 1px;
        font-weight: bolder;
        box-sizing: border-box;
        margin: 0;
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
