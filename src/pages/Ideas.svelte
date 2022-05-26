<script>
	import axios from "axios";
	import AddIdeaModal from "../components/AddIdeaModal.svelte";
	import ManageTagsModal from "../components/ManageTagsModal.svelte";

	export let params = {};

	let ideas = [];
	export var categoryId;
	categoryId = params.id;

	function getIdeas() {
		axios.get("http://localhost:8081/api/ideas?category=" + categoryId).then((response) => {
			ideas = response.data;
		});
	}
	getIdeas();
</script>

<main>
	<div class="container">
		<div id="alertPlaceHolder" />
		<div class="row">
			<div class="col-sm-3">
				<AddIdeaModal {categoryId} />
				<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addIdeaModal">
					Add idea
				</button>
			</div>
			<div class="col-sm-3">
				<ManageTagsModal {categoryId} />
				<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#manageTagsModal">
					Manage tags
				</button>
			</div>
			{#each ideas as idea}
				<div class="col-sm-3">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">{idea.name}</h5>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
