<script>
    import axios from "axios";

    export let editIdeaPtr = {
        name: "",
        category: "",
        tags: []
    };
    export let getIdeas = () => {}
    let tags = []; //available tags for current category

    function editIdea() {
        axios
            .put("https://idea-tracker-pt.herokuapp.com/api/ideas/"+editIdeaPtr._id, editIdeaPtr)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Idea edited successfully</div>",
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
                    "   <div>Failed to edit idea!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
            });
    }

    function getTags() {
        axios.get("https://idea-tracker-pt.herokuapp.com/api/tags?category=" + editIdeaPtr.category).then((response) => {
            tags = response.data;
        });
    }
    getTags();
</script>

<button on:click={getTags} type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#edit" + editIdeaPtr._id}>
    Edit
</button>
<div class="modal fade" id={"edit" + editIdeaPtr._id} tabindex="-1" aria-labelledby="editIdeaLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editIdeaLabel">Edit idea</h5>
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
                            bind:value={editIdeaPtr.name}
                            id="ideaName"
                        />
                    </div>
                    <div class="mb-3">
                        {#each tags as tag}
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    bind:group={editIdeaPtr.tags}
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
                <button on:click={editIdea} type="button" class="btn btn-primary" data-bs-dismiss="modal">Edit</button>
            </div>
        </div>
    </div>
</div>
