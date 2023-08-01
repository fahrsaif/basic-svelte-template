<script>
    import { onMount } from "svelte";
    import { DataHandler } from "@vincjo/datatables";
    import { Pagination, RowCount, RowsPerPage, Search, Sort } from "../../components/datatables";
    import { getUsers } from "../../api/user";

    let data;

    let handler;
    let rows;

    onMount(async () => {
        data = await getUsers();

        handler = new DataHandler(data, { rowsPerPage: 10 });
        rows = handler.getRows();
    });
</script>

{#if data}
    <div class="flex justify-end mb-10">
        <a href="/user/add" class="btn btn-primary">Add</a>
    </div>
    <div class="flex justify-between mb-10">
        <RowsPerPage {handler} />
        <Search {handler} />
    </div>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <Sort {handler} orderBy={(row) => row.name}>Name</Sort>
                    <Sort {handler} orderBy={(row) => row.username}>Username</Sort>
                    <Sort {handler} orderBy={(row) => row.email}>Email</Sort>
                    <Sort {handler} orderBy={(row) => row.phone}>Phone</Sort>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.username}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>
                            <a class="btn" href="/user/{row.id}">Detail</a>
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
