<script>
    import { notification } from "../../library/store";
    import { addUser } from "../../api/user";
    import { redirect } from "@roxi/routify";

    let userForm;

    let buttonLoading = false;

    function addHandler() {
        buttonLoading = true;

        const formData = new FormData(userForm);
        const jsonData = Object.fromEntries(formData.entries());

        addUser(jsonData).then(() => {
            $notification = "Add User Success!";
            $redirect("/user");
        });
    }
</script>

<div class="w-2/3 mx-auto">
    <form bind:this={userForm} on:submit|preventDefault={addHandler}>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Name</span>
            </label>
            <input name="name" class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Username</span>
            </label>
            <input name="username" class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Email</span>
            </label>
            <input name="email" class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Phone</span>
            </label>
            <input name="phone" class="input input-bordered" required />
        </div>
        <div class="flex justify-between mt-10">
            <a href="/user" class="btn">Back</a>
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
