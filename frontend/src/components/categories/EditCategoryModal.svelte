<script>
    import axios from "axios";

    export let editCat = {
        name: ""
    };
    export let getCategories = () => {}

    function editCategory() {
        axios
            .put("https://idea-tracker-pt.herokuapp.com/api/categories/"+editCat._id, editCat)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolder");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Category edited successfully</div>",
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
                    "   <div>Failed to edit category!</div>",
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

<button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#edit" + editCat._id}>
    Edit
</button>
<div class="modal fade" id={"edit" + editCat._id} tabindex="-1" aria-labelledby="editCategoryLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editCategoryLabel">Edit category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <input class="form-control" type="text" placeholder="Category name" bind:value={editCat.name} />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button on:click={editCategory} type="button" class="btn btn-primary" data-bs-dismiss="modal">
                    Edit
                </button>
            </div>
        </div>
    </div>
</div>
