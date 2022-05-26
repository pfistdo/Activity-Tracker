<script>
	import axios from "axios";
	import AddIdeaModal from "../components/AddIdeaModal.svelte";
	import ManageTagsModal from "../components/ManageTagsModal.svelte";

	export let params = {};

	let ideas = [];
	export var categoryId;
	categoryId = params.id;

	function getIdeas() {
		axios.get("http://localhost:8081/api/ideas/*?category=" + categoryId).then((response) => {
			ideas = response.data;
		});
	}

	function getTags() {}
	getIdeas();
</script>

<main>
	<div class="container">
		<div id="alertPlaceHolder" />
		<AddIdeaModal {categoryId} />
		<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addIdeaModal">
			Add idea
		</button>
		<ManageTagsModal {categoryId} />
		<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#manageTagsModal">
			Manage tags
		</button>
		<div class="row">
			{#each ideas as idea}
				<div class="col-sm-3">
					<div class="card">
						<div class="card-body">
							{#each idea.tagsObject as tag}
									<span class="badge rounded-pill text-bg-secondary">{tag.name}</span>
								{/each}
							<h5 class="card-title">
								{idea.name}
							</h5>
							<p class="card-text"></p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	.rounded-pill {
		margin-right: 5px; 
	}
</style>