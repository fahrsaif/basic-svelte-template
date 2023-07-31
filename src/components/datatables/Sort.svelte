<script>
    import { ArrowDown, ArrowUp, ArrowsUpDown } from "svelte-heros-v2";

    export let handler;
    export let orderBy = null;

    const identifier = orderBy?.toString();
    const sorted = handler.getSorted();

    const size = 16;
</script>

<th on:click={() => handler.sort(orderBy)} class="cursor-pointer">
    <div class="flex">
        <slot />
        &nbsp;
        {#if $sorted.identifier === identifier}
            {#if $sorted.direction === "asc"}
                <ArrowUp {size} />
            {/if}
            {#if $sorted.direction === "desc"}
                <ArrowDown {size} />
            {/if}
        {:else}
            <ArrowsUpDown {size} />
        {/if}
    </div>
</th>
