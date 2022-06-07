<script>
    import axios from "axios";

    export let deleteCat = {
        name: ""
    };
    export let getCategories = () => {}

    function deleteCategory() {
        axios
            .delete("https://idea-tracker-pt.herokuapp.com/api/categories/"+deleteCat._id, deleteCat)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Category deleted successfully</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
                getCategories()
            })
            .catch((error) => {
                console.log(error);
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible fade show" role="alert">',
                    "   <div>Failed to deleted category!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
                alertPlaceholder.append(wrapper);
            });
    }
</script>

<button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target={"#delete" + deleteCat._id}>
    Delete
</button>
<div class="modal fade" id={"delete" + deleteCat._id} tabindex="-1" aria-labelledby="deleteCategoryLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteCategoryLabel">Confirm delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <p>Are you sure you want to delete category <b>{deleteCat.name}?</b></p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button on:click={deleteCategory} type="button" class="btn btn-danger" data-bs-dismiss="modal">
                    Delete
                </button>
            </div>
        </div>
    </div>
</div>
