<script>
    import axios from "axios";

    export let deleteIdeaPtr = {
        name: ""
    };
    export let getIdeas = () => {}

    function deleteIdea() {
        axios
            .delete("http://0.0.0.0/api/ideas/"+deleteIdeaPtr._id, deleteIdeaPtr)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Idea deleted successfully</div>",
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
                    "   <div>Failed to delete idea!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
            });
    }
</script>

<button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target={"#delete" + deleteIdeaPtr._id}>
    Delete
</button>
<div class="modal fade" id={"delete" + deleteIdeaPtr._id} tabindex="-1" aria-labelledby="deleteIdeaLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteIdeaLabel">Confirm delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <p>Are you sure you want to delete idea <b>{deleteIdeaPtr.name}?</b></p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button on:click={deleteIdea} type="button" class="btn btn-danger" data-bs-dismiss="modal">
                    Delete
                </button>
            </div>
        </div>
    </div>
</div>
