<script>
    export let handler;
    let value = "";
</script>

<input
    class="input input-bordered"
    placeholder="Search..."
    bind:value
    on:input={() => handler.search(value)}
/>
