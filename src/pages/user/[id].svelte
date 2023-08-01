<script>
    export let id;

    import { onMount } from "svelte";
    import { notification } from "../../library/store";
    import { getUser, updateUser, deleteUser } from "../../api/user";
    import { redirect } from "@roxi/routify";

    let data;

    let userForm;

    let buttonLoading = false;
    let modalButtonLoading = false;

    function deleteHandler() {
        modalButtonLoading = true;

        deleteUser(id).then(() => {
            $notification = "Delete User Success!";
            $redirect("/user");
        });
    }

    function updateHandler() {
        buttonLoading = true;

        const formData = new FormData(userForm);
        const jsonData = Object.fromEntries(formData.entries());

        updateUser(id, jsonData).then(() => {
            $notification = "Update User Success!";
            $redirect("/user");
        });
    }

    onMount(async () => {
        data = await getUser(id);
    });
</script>

{#if data}
    <div class="w-2/3 mx-auto">
        <form bind:this={userForm} on:submit|preventDefault={updateHandler}>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input name="name" class="input input-bordered" value={data.name} required />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input
                    name="username"
                    class="input input-bordered"
                    value={data.username}
                    required
                />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input name="email" class="input input-bordered" value={data.email} required />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Phone</span>
                </label>
                <input name="phone" class="input input-bordered" value={data.phone} required />
            </div>
            <div class="flex justify-between mt-10">
                <a href="/user" class="btn">Back</a>
                <div>
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
        <h3 class="font-bold text-lg">Delete User</h3>
        <p class="py-4">Are you sure you want to delete this User?</p>
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
