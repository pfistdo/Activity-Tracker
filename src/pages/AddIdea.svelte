<script>
    import axios from "axios";
    export let params = {};


    let idea = {
        idea: "",
        category: params.id
    };
    console.log(idea)

    function addIdea() {
        axios.post("http://localhost:8081/api/ideas", idea)
            .then((response) => {
                alert("Idea added");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
</script>

<div class="mb-5">
    <h1 class="mt-3">Add an idea</h1>

    <form>
        <div class="mb-3">
            <label for="" class="form-label">Idea Name</label>
            <input class="form-control" type="text" bind:value={idea.idea} />
        </div>
        <button on:click={addIdea} type="button" class="btn btn-primary">
            Add Idea
        </button>
    </form>
</div>
