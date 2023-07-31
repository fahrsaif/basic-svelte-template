<script>
    export let handler;
    const rowCount = handler.getRowCount();
</script>

<span class="text-base">
    {#if $rowCount.total > 0}
        Showing <b>{$rowCount.start}</b>
        to <b>{$rowCount.end}</b>
        from <b>{$rowCount.total}</b>
    {:else}
        No entries found
    {/if}
</span>
