<script>
	import axios from "axios";
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
		<div class="row">
			{#each categories as category}
				<div class="col-sm-3">
					<a href="{"#/categories/" + category._id}">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">{category.category}</h5>
							</div>
						</div>
					</a>
				</div>
			{/each}
			<!-- New category button -->
			<div class="col-sm-3">
				<a href="#">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">+</h5>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</main>
