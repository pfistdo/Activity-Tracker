<script>
  import axios from "axios";
  import AddCategoryModal from "../components/categories/AddCategoryModal.svelte";
  import EditCategoryModal from "../components/categories/EditCategoryModal.svelte";
  import DeleteCategoryModal from "../components/categories/DeleteCategoryModal.svelte";

  let categories = [];

  function getCategories() {
    axios.get("https://idea-tracker-pt.herokuapp.com/api/categories").then((response) => {
      categories = response.data;
    });
  }
  getCategories();
</script>

<main>
  <div class="container">
    <div class="row">
      <div id="alertPlaceHolder" />
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      {#each categories as category}
        <div class="col">
          <div class="card">
            <a href={"#/categories/" + category._id}>
              <div class="card-body">
                <h5 class="card-title">{category.name}</h5>
              </div>
            </a>
            <div class="card-body">
              <div class="d-grid gap-1 d-md-flex justify-content-md-end">
                <EditCategoryModal editCat={category} {getCategories} />
                <DeleteCategoryModal deleteCat={category} {getCategories} />
              </div>
            </div>
          </div>
        </div>
      {/each}
      <div class="col">
        <div class="card">
          <a href={"#"}>
            <div class="card-body">
              <h5 class="card-title"> </h5>
              <AddCategoryModal {getCategories} />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>
