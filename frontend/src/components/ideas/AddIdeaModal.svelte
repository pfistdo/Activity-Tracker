<script>
    import axios from "axios";

    export let categoryId;
    export let getIdeas = () => {}

    let idea = {
        name: "",
        category: categoryId,
        tags: []
    };
    let tags = []; //available tags for current category

    function addIdea() {
        axios
            .post("http://0.0.0.0/api/ideas", idea)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Idea added successfully</div>",
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
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible fade show" role="alert">',
                    "   <div>Failed to add idea!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
            });
        idea = {
            name: "",
            category: categoryId,
            tags: []
        };
    }

    function getTags() {
        axios.get("http://0.0.0.0/api/tags?category=" + categoryId).then((response) => {
            tags = response.data;
        });
    }
    getTags();
</script>

<button on:click={getTags} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addIdeaModal">
    <i class="bi bi-plus-square"></i>
    Add idea
</button>

<div class="modal fade" id="addIdeaModal" tabindex="-1" aria-labelledby="addIdeaLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addIdeaLabel">Create a new idea</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label class="form-label" for="ideaName">Idea</label>
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Idea name"
                            bind:value={idea.name}
                            id="ideaName"
                        />
                    </div>
                    <div class="mb-3">
                        {#each tags as tag}
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    bind:group={idea.tags}
                                    value={tag._id}
                                    id={"tag" + tag._id}
                                />
                                <label class="form-check-label" for={"tag" + tag._id}>
                                    {tag.name}
                                </label>
                            </div>
                        {/each}
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button on:click={addIdea} type="button" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
            </div>
        </div>
    </div>
</div>
