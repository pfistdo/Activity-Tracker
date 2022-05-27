<script>
	import axios from "axios";
	import AddTagModal from "../components/AddTagModal.svelte";

	export let categoryId;
	let tags = [];

	function getTags() {
		axios.get("http://localhost:8081/api/tags?category=" + categoryId).then((response) => {
			tags = response.data;
		});
	}
	getTags();
</script>

<div class="modal fade" id="manageTagsModal" tabindex="-1" aria-labelledby="manageTagsModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div id="alertPlaceHolderAddTag" />
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="manageTagsModalLabel">Manage tags</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<AddTagModal {categoryId}/>
				<hr>
				<div class="mb-3">
					{#each tags as tag}
						<div class="col-sm-12 mb-1">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">{tag.name}</h5>
								</div>
							</div>
						</div>
					{/each}
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<!-- <button
                    on:click={addIdea}
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal">Submit</button
                > -->
			</div>
		</div>
	</div>
</div>
