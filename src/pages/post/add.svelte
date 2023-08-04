<script>
    import { notification } from "../../library/store";
    import { addPost } from "../../api/post";
    import { redirect } from "@roxi/routify";

    let postForm;

    let buttonLoading = false;

    function addHandler() {
        buttonLoading = true;

        const formData = new FormData(postForm);
        const jsonData = Object.fromEntries(formData.entries());

        addPost(jsonData).then(() => {
            $notification = "Add Post Success!";
            $redirect("/post");
        });
    }
</script>

<div class="w-2/3 mx-auto">
    <form bind:this={postForm} on:submit|preventDefault={addHandler}>
        <input type="hidden" name="userId" value={1} />
        <div class="form-control">
            <label class="label">
                <span class="label-text">Title</span>
            </label>
            <input name="title" class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Content</span>
            </label>
            <textarea name="body" class="textarea textarea-bordered h-24" required />
        </div>
        <div class="flex justify-between mt-10">
            <a href="/post" class="btn">Back</a>
            <div class="flex gap-2">
                <button type="reset" class="btn btn-ghost">Reset</button>
                <button class="btn btn-primary" disabled={buttonLoading}>
                    {#if buttonLoading}
                        <span class="loading loading-spinner" />
                    {/if}
                    Submit
                </button>
            </div>
        </div>
    </form>
</div>
