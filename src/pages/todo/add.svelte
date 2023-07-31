<script>
    import { onMount } from "svelte";
    import { notification } from "../../library/store";
    import { addResolution } from "../../api/resolution";
    import { getServiceCatalog, getServiceCatalogGroup } from "../../api/service";
    import { getLevels } from "../../api/level";
    import { redirect } from "@roxi/routify";

    let serviceCatalogGroup = [];
    let serviceCatalog = [];
    let levels = [];

    let resolutionForm;

    let buttonLoading = false;

    function addHandler() {
        const formData = new FormData(resolutionForm);

        buttonLoading = true;

        addResolution(formData).then(() => {
            $notification = "Add Resolution Success!";
            $redirect("/kedb");
        });
    }

    async function updateServiceCatalog(e) {
        const id = e.target.value;

        serviceCatalog = await getServiceCatalog(id);
    }

    onMount(async () => {
        serviceCatalogGroup = await getServiceCatalogGroup();
        levels = await getLevels();
    });
</script>

<div class="w-2/3 mx-auto">
    <form bind:this={resolutionForm} on:submit|preventDefault={addHandler}>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Subject</span>
            </label>
            <input name="subject" class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Deskripsi Laporan</span>
            </label>
            <textarea
                name="incident_description"
                class="textarea textarea-bordered h-24"
                required
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Jenis Layanan</span>
                </label>
                <select
                    name="service_catalog_group_id"
                    class="select select-bordered"
                    required
                    on:change={updateServiceCatalog}
                >
                    <option value="" selected>Pilih Jenis Layanan</option>
                    {#each serviceCatalogGroup as item}
                        <option value={item.id}>{item.name}</option>
                    {/each}
                </select>
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Layanan / Aset</span>
                </label>
                <select name="service_catalog_id" class="select select-bordered" required>
                    <option value="" selected>Pilih Layanan / Aset</option>
                    {#each serviceCatalog as item}
                        <option value={item.id}>{item.name}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Resolusi</span>
            </label>
            <textarea
                name="resolution_description"
                class="textarea textarea-bordered h-24"
                required
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Level</span>
                </label>
                <select name="level_id" class="select select-bordered" required>
                    <option value="" selected>Pilih Level</option>
                    {#each levels as item}
                        <option value={item.id}>{item.name}</option>
                    {/each}
                </select>
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Kategori</span>
                </label>
                <select name="category_id" class="select select-bordered" required>
                    <option value="" selected>Pilih Kategori</option>
                    <option value={1}>Internal</option>
                    <option value={2}>Publik</option>
                </select>
            </div>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text"> File </span>
            </label>
            <input type="file" name="file" class="file-input file-input-bordered w-full" />
        </div>
        <div class="flex justify-between mt-10">
            <a href="/kedb" class="btn">Back</a>
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
