<script>
    import axios from "axios";

    export let categoryId;
    export let getTags = () => {}

    let tag = {
        name: "",
        category: categoryId
    };

    function addTag() {
        axios
            .post("http://localhost:8081/api/tags", tag)
            .then((response) => {
                const alertPlaceholder = document.getElementById("alertPlaceHolderAddTag");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">',
                    "   <div>Tag added successfully</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
				getTags()
            })
            .catch((error) => {
                console.log(error);
                const alertPlaceholder = document.getElementById("alertPlaceHolderAddTag");
                const wrapper = document.createElement("div");
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible fade show" role="alert">',
                    "   <div>Failed to add tag!</div>",
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                setTimeout(function() {
                    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
                }, 3000)
            });
            tag.name = ""
    }
</script>

<label for="addTag" class="form-label">Create a new tag</label>
<div class="input-group mb-3">
    <input bind:value={tag.name} type="text" class="form-control" placeholder="Tag name">
    <button on:click={addTag} class="btn btn-primary" type="button" id="addTag">Submit</button>
</div>