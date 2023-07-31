<script>
    export let handler;
    const rowsPerPage = handler.getRowsPerPage();
    const options = [5, 10, 20, 50, 100];
</script>

<span class="text-base">
    Show
    <select class="select select-bordered" bind:value={$rowsPerPage}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    entries
</span>
