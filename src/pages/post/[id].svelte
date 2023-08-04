<script>
    export let id;

    import { onMount } from "svelte";
    import { notification } from "../../library/store";
    import { getPost, updatePost, deletePost } from "../../api/post";
    import { redirect } from "@roxi/routify";

    let data;

    let postForm;

    let buttonLoading = false;
    let modalButtonLoading = false;

    function deleteHandler() {
        modalButtonLoading = true;

        deletePost(id).then(() => {
            $notification = "Delete Post Success!";
            $redirect("/post");
        });
    }

    function updateHandler() {
        buttonLoading = true;

        const formData = new FormData(postForm);
        const jsonData = Object.fromEntries(formData.entries());

        updatePost(id, jsonData).then(() => {
            $notification = "Update Post Success!";
            $redirect("/post");
        });
    }

    onMount(async () => {
        data = await getPost(id);
    });
</script>

{#if data}
    <div class="w-2/3 mx-auto">
        <form bind:this={postForm} on:submit|preventDefault={updateHandler}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="userId" value={data.userId} />
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Title</span>
                </label>
                <input name="title" class="input input-bordered" value={data.title} required />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Content</span>
                </label>
                <textarea
                    name="body"
                    class="textarea textarea-bordered h-24"
                    value={data.body}
                    required
                />
            </div>
            <div class="flex justify-between mt-10">
                <a href="/post" class="btn">Back</a>
                <div class="flex gap-2">
                    <button
                        type="button"
                        class="btn btn-outline btn-error"
                        onclick="deleteModal.showModal()"
                    >
                        Delete
                    </button>
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
{/if}

<dialog id="deleteModal" class="modal">
    <form class="modal-box">
        <h3 class="font-bold text-lg">Delete Post</h3>
        <p class="py-4">Are you sure you want to delete this Post?</p>
        <div class="modal-action">
            <button type="button" class="btn btn-ghost" onclick="deleteModal.close()">Cancel</button
            >
            <button
                type="button"
                class="btn btn-error"
                on:click={deleteHandler}
                disabled={modalButtonLoading}
            >
                {#if modalButtonLoading}
                    <span class="loading loading-spinner" />
                {/if}
                Delete
            </button>
        </div>
    </form>
</dialog>
