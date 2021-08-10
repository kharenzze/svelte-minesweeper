<script lang="ts">
  import { setContext } from 'svelte'
  const localRightClick = (evt: Event) => {
    evt.preventDefault()
  }

  const toggle = () => {
    window.document.body.classList.toggle('dark')
  }

  setContext('theme', {
    toggle,
  })
</script>

<main on:contextmenu={localRightClick}>
  <slot />
</main>

<style>
  :root {
    --background-color: white;
    --neutral-text-color: black;
  }

  :global(body) {
    background: var(--background-color);
  }

  :global(body.dark) {
    --background-color: #232323;
    --neutral-text-color: white;
  }

  :global(span) {
    color: var(--neutral-text-color);
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
