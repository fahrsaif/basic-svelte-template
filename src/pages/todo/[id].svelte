<script>
    export let id;

    import { onMount } from "svelte";
    import { notification } from "../../library/store";
    import { getResolution, updateResolution, deleteResolution } from "../../api/todo";
    import { redirect } from "@roxi/routify";
    import { Trash } from "svelte-heros-v2";

    let data;

    let resolutionForm;

    let buttonLoading = false;
    let modalButtonLoading = false;

    function deleteHandler() {
        modalButtonLoading = true;

        deleteResolution(id).then(() => {
            $notification = "Delete Resolution Success!";
            $redirect("/kedb");
        });
    }

    function updateHandler() {
        const formData = new FormData(resolutionForm);

        buttonLoading = true;

        if (userDeletingFile) {
            formData.set("file", false);
        }

        updateResolution(id, formData).then(() => {
            $notification = "Update Resolution Success!";
            $redirect("/kedb");
        });
    }

    onMount(async () => {
        data = await getResolution(id);
    });
</script>

<div class="w-2/3 mx-auto">
    <div class="flex justify-between mb-10">
        <a href="/kedb" class="btn">Back</a>
    </div>
    <form bind:this={resolutionForm} on:submit|preventDefault={updateHandler}>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Subject</span>
            </label>
            <input name="subject" class="input input-bordered" value={data.subject} required />
        </div>
        <div class="flex justify-between mt-10">
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
    </form>
</div>

<dialog id="deleteModal" class="modal">
    <form class="modal-box">
        <h3 class="font-bold text-lg">Delete Resolution</h3>
        <p class="py-4">Are you sure you want to delete this resolution?</p>
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
