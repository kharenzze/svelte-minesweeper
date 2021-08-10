<script lang="ts">
  import { setContext } from 'svelte'
  const localRightClick = (evt: Event) => {
    evt.preventDefault()
  }
  let dark = false
  const toggle = () => {
    dark = !dark
  }

  setContext('theme', {
    toggle,
  })
</script>

<main on:contextmenu={localRightClick} class:dark>
  <slot />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background: red;
  }

  main.dark {
    background: green;
  }
</style>
