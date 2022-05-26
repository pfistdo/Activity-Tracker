<script>
    import axios from "axios";

    let category = {
        category: ""
    };

    function addCategory() {
        axios.post("http://localhost:8081/api/categories", category)
            .then((response) => {
                alert("Category added");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
</script>

<div class="mb-5">
    <h1 class="mt-3">Add a category</h1>

    <form>
        <div class="mb-3">
            <label for="" class="form-label">Category Name</label>
            <input class="form-control" type="text" bind:value={category.category} />
        </div>
        <button on:click={addCategory} type="button" class="btn btn-primary">
            Add Category
        </button>
    </form>
</div>
