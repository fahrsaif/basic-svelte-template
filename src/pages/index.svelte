<script>
    import apps from "../data/apps";
</script>

<div class="flex gap-5">
    {#each apps as app}
        <a href={app.url} class="basis-1/3">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{app.name}</h2>
                    <p>{app.desc}</p>
                </div>
            </div>
        </a>
    {/each}
</div>
