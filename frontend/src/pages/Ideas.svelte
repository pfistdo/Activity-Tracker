<script>
  import axios from "axios";
  import AddIdeaModal from "../components/ideas/AddIdeaModal.svelte";
  import EditIdeaModal from "../components/ideas/EditIdeaModal.svelte";
  import DeleteIdeaModal from "../components/ideas/DeleteIdeaModal.svelte";
  import ManageTagsModal from "../components/tags/ManageTagsModal.svelte";

  export let params = {};

  let originalIdeas = []; //contains all ideas. will never be modifed
  let ideas = []; //contains all idea to be displayed. ideas will be removed when searching
  export let categoryId;
  categoryId = params.id;

  let searchString = ""; //for search bar

  function getIdeas() {
    axios.get("https://idea-tracker-pt.herokuapp.com/api/ideas/*?category=" + categoryId).then((response) => {
      originalIdeas = response.data;
      ideas = originalIdeas;
    });
  }

  function searchbarKeyPressed(e) {
    if (e.keyCode == 8) {
      // == backspace
      searchString = searchString.slice(0, -1);
    } else if (e.keyCode >= 65 && (e.keyCode <= 90) | (e.keyCode == 32) | (e.keyCode == 189)) {
      searchString += e.key;
    }
    // filter
    let searchResult = [];
    originalIdeas.forEach(function (idea) {
      if (idea.name.toLowerCase().includes(searchString.toLowerCase())) {
        searchResult.push(idea);
      }
    });
    ideas = searchResult;
  }
  
  getIdeas();
</script>

<main>
  <div class="container">
    <!-- Action bar (filter, add, etc.) -->
    <div class="row">
      <div id="alertPlaceHolder" />
      <div class="col-sm-4 mb-1">
        <div class="d-grid gap-2">
          <AddIdeaModal {categoryId} {getIdeas} />
          <ManageTagsModal {categoryId} {getIdeas} />
        </div>
      </div>
      <div class="col-sm-4 mb-1">
        <div class="d-grid gap-2">
          <form class="d-flex" role="search">
            <input on:keydown={searchbarKeyPressed} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-primary" type="submit">Search</button>
          </form>
          <button type="button" class="btn btn-primary">
            <i class="bi bi-filter-square" />
            Filter by tags
          </button>
        </div>
      </div>
      <div class="col-sm-4 mb-1">
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary">
            <i class="bi bi-lightbulb" />
            Suggest idea
          </button>
        </div>
      </div>
      <hr />
    </div>
    <div class="row">
      {#each ideas as idea}
        <div class="col-sm-3 mb-1">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {idea.name}
              </h5>
              <p class="card-text">
                {#each idea.tagsObject as tag}
                  <span class="badge rounded-pill text-bg-secondary">{tag.name}</span>
                {/each}
              </p>
            </div>
            <div class="card-body">
              <div class="d-grid gap-1 d-md-flex justify-content-md-end">
                <EditIdeaModal editIdeaPtr={idea} {getIdeas} />
                <DeleteIdeaModal deleteIdeaPtr={idea} {getIdeas} />
              </div>
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
