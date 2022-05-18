<script>
    import { onMount } from "svelte";
    import Color from "./Color.svelte";
    // define the data holding variable
    let colors;

    onMount(async () => {
        await fetch(`http://localhost:3001/`)
            .then((r) => r.json())
            .then((data) => {
                colors = data;
            });
    });
</script>

{#if colors}
  {#each colors as color }
    <ul>
      <li>    
        <Color {color} />
      </li>
    </ul>
  {/each}
{:else}
  <p class="loading">loading...</p>
{/if}