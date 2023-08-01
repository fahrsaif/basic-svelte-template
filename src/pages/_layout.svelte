<script>
    import modules from "../data/modules";
    import { darkMode, notification } from "../library/store";
    import { initTheme, toggleTheme } from "../library/theme";
    import { onMount } from "svelte";
    import { Bars3, Moon, Sun } from "svelte-heros-v2";

    let sidebar = false;

    $: if ($notification != null) {
        setTimeout(() => {
            $notification = null;
        }, 3000);
    }

    onMount(() => {
        initTheme();
    });
</script>

<div class="drawer" class:drawer-open={sidebar}>
    <input id="my-drawer" type="checkbox" class="drawer-toggle hidden" />
    <div class="drawer-content">
        <div class="navbar bg-base-100 shadow-md">
            <div class="navbar-start">
                <div class="tooltip tooltip-right" data-tip="Toggle Sidebar">
                    <button
                        on:click={() => (sidebar = !sidebar)}
                        class="btn btn-ghost rounded-full"
                    >
                        <Bars3 />
                    </button>
                </div>
                <div class="tooltip tooltip-left" data-tip="Toggle Dark Mode">
                    <label class="swap swap-rotate mt-1">
                        <input type="checkbox" checked={$darkMode} on:click={toggleTheme} />
                        <Moon class="swap-on" />
                        <Sun class="swap-off" />
                    </label>
                </div>
            </div>
            <div class="navbar-center">
                <a href="/" class="normal-case text-xl">App Name</a>
            </div>
            <div class="navbar-end">
                <!-- logout button here -->
            </div>
        </div>
        <div class="container my-10">
            <slot />
        </div>
    </div>
    <div class="drawer-side">
        <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
            {#each modules as module}
                <li><a href={module.url}>{module.name}</a></li>
            {/each}
        </ul>
    </div>
</div>

{#if $notification != null}
    <div class="toast">
        <div class="alert alert-success">
            <span>{$notification}</span>
        </div>
    </div>
{/if}
