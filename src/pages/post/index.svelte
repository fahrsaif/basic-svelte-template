<script>
    import { onMount } from "svelte";
    import { DataHandler } from "@vincjo/datatables";
    import { Pagination, RowCount, RowsPerPage, Search, Sort } from "../../components/datatables";
    import { getPosts } from "../../api/post";

    let data;

    let handler;
    let rows;

    onMount(async () => {
        data = await getPosts();

        handler = new DataHandler(data, { rowsPerPage: 10 });
        rows = handler.getRows();
    });
</script>

{#if data}
    <div class="flex justify-between mb-10">
        <a href="/" class="btn">Back</a>
        <a href="/post/add" class="btn btn-primary">Add</a>
    </div>
    <div class="flex justify-between mb-10">
        <RowsPerPage {handler} />
        <Search {handler} />
    </div>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <Sort {handler} orderBy={(row) => row.userId}>User ID</Sort>
                    <Sort {handler} orderBy={(row) => row.id}>Post ID</Sort>
                    <Sort {handler} orderBy={(row) => row.title}>Title</Sort>
                    <Sort {handler} orderBy={(row) => row.body}>Body</Sort>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.userId}</td>
                        <td>{row.id}</td>
                        <td>{row.title}</td>
                        <td>{row.body}</td>
                        <td>
                            <a class="btn" href="/post/{row.id}">Detail</a>
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
