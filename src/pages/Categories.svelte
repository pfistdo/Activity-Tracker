<script>
	import axios from "axios";
	import AddCategoryModal from "../components/categories/AddCategoryModal.svelte";
	import EditCategoryModal from "../components/categories/EditCategoryModal.svelte";

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
					<div class="card">
						<a href={"#/categories/" + category._id}>
							<div class="card-body">
								<h5 class="card-title">{category.name}</h5>
							</div>
						</a>
						<EditCategoryModal editCat={category}/>
						<button type="button" class="btn btn-danger btn-sm">Delete</button>
					</div>
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
