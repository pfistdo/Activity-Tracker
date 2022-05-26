<script>
    import axios from "axios";

    export let categoryId;

    let idea = {
        name: "",
        category: categoryId,
    };

    function addIdea() {
        axios
            .post("http://localhost:8081/api/ideas", idea)
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
            });
    }
</script>

<div class="modal fade" id="addIdeaModal" tabindex="-1" aria-labelledby="addIdeaLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addIdeaLabel">Create a new idea</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <input class="form-control" type="text" placeholder="Idea name" bind:value={idea.name} />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button on:click={addIdea} type="button" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
            </div>
        </div>
    </div>
</div>
