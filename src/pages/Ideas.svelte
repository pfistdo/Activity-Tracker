<script>
	import axios from "axios";
	export let params = {};
	let ideas = [];
    let id;

    $: {
        id = params.id;
        getIdeas();
    }

	function getIdeas() {
		axios.get("http://localhost:8081/api/ideas?category="+id).then((response) => {
			ideas = response.data;
		});
	}
	getIdeas();
</script>

<main>
	<div class="container">
		<div class="row">
			{#each ideas as idea}
				<div class="col-sm-3">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">{idea.idea}</h5>
							</div>
						</div>
				</div>
			{/each}
		</div>
	</div>
</main>
