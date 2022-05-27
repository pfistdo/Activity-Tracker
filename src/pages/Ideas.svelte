<script>
	import axios from "axios";
	import AddIdeaModal from "../components/ideas/AddIdeaModal.svelte";
	import EditIdeaModal from "../components/ideas/EditIdeaModal.svelte";
	import DeleteIdeaModal from "../components/ideas/DeleteIdeaModal.svelte";
	import ManageTagsModal from "../components/tags/ManageTagsModal.svelte";

	export let params = {};

	let ideas = [];
	export let categoryId;
	categoryId = params.id;

	function getIdeas() {
		axios.get("http://localhost:8081/api/ideas/*?category=" + categoryId).then((response) => {
			ideas = response.data;
		});
	}
	getIdeas();
</script>

<main>
	<div class="container">
		<div class="row">
			<div id="alertPlaceHolder" />
			<AddIdeaModal {categoryId} getIdeas={getIdeas}/>
			<ManageTagsModal {categoryId} getIdeas={getIdeas}/>
		</div>
		<div class="row">
			{#each ideas as idea}
				<div class="col-sm-3 mb-1">
					<div class="card">
						<div class="card-body">
							{#each idea.tagsObject as tag}
								<span class="badge rounded-pill text-bg-secondary">{tag.name}</span>
							{/each}
							<h5 class="card-title">
								{idea.name}
							</h5>
							<p class="card-text" />
						</div>
						<EditIdeaModal editIdeaPtr={idea} getIdeas={getIdeas}/>
						<DeleteIdeaModal deleteIdeaPtr={idea} getIdeas={getIdeas}/>
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
