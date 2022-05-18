<script>
	import { onMount } from "svelte";
	const endpoint = "http://localhost:3001/api/colors";
	let colors = [];

	onMount(async function () {
		const response = await fetch(endpoint);
		const data = await response.json();
		console.log(data);
		colors = data;
	});
</script>

<main>
	<div class="container">
		<div class="row justify-content">
			<h1>Schöne Farben</h1>
			{#each colors as color}
			<div>
			  <p>{color.color}</p>
			</div>
		  {/each}
		</div>
	</div>
</main>