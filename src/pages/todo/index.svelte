<script>
    import { onMount } from "svelte";
    import { DataHandler } from "@vincjo/datatables";
    import { Pagination, RowCount, RowsPerPage, Sort } from "../../components/datatables";
    import { getResolutions } from "../../api/todo";

    let data;

    let handler;
    let rows;

    onMount(async () => {
        data = await getResolutions();

        handler = new DataHandler(data, { rowsPerPage: 10 });
        rows = handler.getRows();
    });
</script>

{#if data}
    <div class="flex justify-between mb-10">
        <RowsPerPage {handler} />
        <a href="/kedb/add" class="btn btn-primary">Add</a>
    </div>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <Sort {handler} orderBy={(row) => row.id}>ID</Sort>
                    <Sort {handler} orderBy={(row) => row.title}>Title</Sort>
                    <Sort {handler} orderBy={(row) => row.completed}>Completed</Sort>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.title}</td>
                        <td>{row.completed}</td>
                        <td>
                            <a class="btn" href="/kedb/{row.id}">Detail</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="flex justify-between mt-10">
        <RowCount {handler} />
        <Pagination {handler} />
    </div>
{/if}
