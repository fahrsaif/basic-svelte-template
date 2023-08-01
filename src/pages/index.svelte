<script>
    import modules from "../data/modules";
</script>

<div class="flex gap-5">
    {#each modules as module}
        <a href={module.url} class="basis-1/3">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{module.name}</h2>
                    <p>{module.desc}</p>
                </div>
            </div>
        </a>
    {/each}
</div>
