<script>
	import axios from "axios";
	import AddTagModal from "../tags/AddTagModal.svelte";

	export let categoryId;
	export let getIdeas = () => {}

	// let callParentFunction = getIdeas();
	let tags = [];

	function getTags() {
		axios.get("http://0.0.0.0/api/tags?category=" + categoryId).then((response) => {
			tags = response.data;
		});
	}

	function editTag(tag) {
		axios
            .put("http://0.0.0.0/api/tags/"+tag._id, tag)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolderAddTag");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Tag edited successfully</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
				setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
				getIdeas()
            })
            .catch((error) => {
                console.log(error);
                const alertPlaceholder = document.getElementById("alertPlaceHolderAddTag");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible fade show" role="alert">',
                    "   <div>Failed to edit tag!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
				setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
            });
	}

	function deleteTag(tag) {
		axios
            .delete("http://0.0.0.0/api/tags/"+tag._id, tag)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolderAddTag");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Tag deleted successfully</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
				setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
				getIdeas()
				getTags()
            })
            .catch((error) => {
                console.log(error);
                const alertPlaceholder = document.getElementById("alertPlaceHolderAddTag");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible fade show" role="alert">',
                    "   <div>Failed to delete tag!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
				setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
            });
	}
	getTags();
</script>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#manageTagsModal">
	<i class="bi bi-pencil-square"></i>
	Manage tags
</button>

<div class="modal fade" id="manageTagsModal" tabindex="-1" aria-labelledby="manageTagsModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div id="alertPlaceHolderAddTag" />
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="manageTagsModalLabel">Manage tags</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<AddTagModal {categoryId} getTags={getTags}/>
				<hr>
				<div class="mb-3">
					{#each tags as tag}
						<div class="col-sm-12 mb-1">
							<div class="card">
								<div class="card-body">
									<div class="input-group">
										<input type="text" class="form-control" bind:value={tag.name}>
										<button on:click={editTag(tag)} class="btn btn-success" type="button">Save</button>
										<button on:click={deleteTag(tag)} class="btn btn-danger" type="button">Delete</button>
									  </div>
								</div>
							</div>
						</div>
					{/each}
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
