<script>
	import axios from "axios";
	import AddCategoryModal from "../components/AddCategoryModal.svelte";

	let categories = [];

	function getCategories() {
		axios.get("http://localhost:8081/api/categories").then((response) => {
			categories = response.data;
		});
	}
	getCategories();
</script>

<main>
	<div class="container">
		<div id="alertPlaceHolder" />
		<div class="row">
			{#each categories as category}
				<div class="col-sm-3 mb-1">
					<a href={"#/categories/" + category._id}>
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">{category.name}</h5>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
		<div class="row">
			<!-- New category button -->
			<AddCategoryModal />
			<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
				Add category
			</button>

		</div>
	</div>
</main>
