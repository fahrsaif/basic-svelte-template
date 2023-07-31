<script>
    export let handler;
    const pageNumber = handler.getPageNumber();
    const pageCount = handler.getPageCount();
    const pages = handler.getPages({ ellipsis: true });
</script>

<div class="join">
    <button
        class="join-item btn"
        disabled={$pageNumber === 1}
        on:click={() => handler.setPage("previous")}
    >
        Previous
    </button>
    {#each $pages as page}
        <button
            class="join-item btn"
            class:btn-active={$pageNumber === page}
            class:ellipse={page === null}
            on:click={() => handler.setPage(page)}
        >
            {page ?? "..."}
        </button>
    {/each}
    <button
        class="join-item btn"
        disabled={$pageNumber === $pageCount}
        on:click={() => handler.setPage("next")}
    >
        Next
    </button>
</div>

<style>
    .ellipse:hover {
        @apply bg-inherit;
        @apply cursor-default;
    }
</style>
