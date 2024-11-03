<script lang="ts">
    import "../app.css";
    import { env } from '$env/dynamic/public';

	import { qr as svgQR } from '@svelte-put/qr/svg';

    import { onMount } from "svelte";
  import { goto } from '$app/navigation';

    import MaterialSymbolsDarkModeRounded from "~icons/material-symbols/dark-mode-rounded";
    import MaterialSymbolsLightModeRounded from "~icons/material-symbols/light-mode-rounded";
    import MaterialSymbolsPowerSettingsNewRounded from '~icons/material-symbols/power-settings-new-rounded';
    import MaterialSymbolsQrCode2Rounded from '~icons/material-symbols/qr-code-2-rounded';
    import MaterialSymbolsLogoutRounded from '~icons/material-symbols/logout-rounded';

    let isLight = false;

    onMount(() => {
        isLight = localStorage.getItem('theme') == 'light';
    });

    function setTheme(value: boolean) {
        localStorage.setItem('theme', value ? 'light' : 'dark');
    }

    let qrModal: HTMLDialogElement;
    let url = env.PUBLIC_BASE_URL; 

    function showQR() {
        qrModal.showModal();
    }

  function handleLogout() {
    // Navigate to the logout endpoint
    goto('/logout');
    }

    // Receive the 'user' data from the server
    export let data;
</script>

<div class="min-h-screen">
    <header>
        <div class="p-2">
            <div
                class="navbar bg-base-300 flex justify-between items-center p-2 rounded-2xl"
            >
                <a
                    href="/"
                    class="btn btn-ghost rounded-2xl m-2 text-xl flex items-center"
                >
                    <MaterialSymbolsPowerSettingsNewRounded class="text-accent fill-current h-8 w-8" />
                    <span class="text-2xl text-accent">SVOL</span>
                </a>
                <div class="m-2 space-x-2">
                    {#if url}
                    <button
                        class="btn btn-ghost rounded-2xl swap w-12 h-12"
                        on:click={showQR}
                    >
                        <MaterialSymbolsQrCode2Rounded
                            class="h-8 w-8"
                        />
                    </button>
                    {/if}
                    <label
                        class="btn btn-ghost rounded-2xl swap swap-rotate w-12 h-12"
                    >
                        <!-- this hidden checkbox controls the state -->
                        <input
                            type="checkbox"
                            class="theme-controller"
                            on:change={(e) => setTheme(e.target.checked)}
                            value="light"
                            checked={isLight}
                        />
                        <MaterialSymbolsLightModeRounded
                            class="swap-off fill-current h-8 w-8"
                        />
                        <MaterialSymbolsDarkModeRounded
                            class="swap-on fill-current h-8 w-8"
                        />
                    </label>
                    {#if data.user}
                    <button
                        class="btn btn-ghost rounded-2xl swap w-12 h-12"
                        on:click={handleLogout}
                    >
                        <MaterialSymbolsLogoutRounded
                            class="h-8 w-8"
                        />
                    </button>
                    {/if}
                </div>
            </div>
        </div>
    </header>
    <main class="flex-1 p-4">
        <slot />
    </main>
</div>
{#if url}
<dialog
    id="qr_modal"
    class="modal modal-bottom sm:modal-middle"
    bind:this={qrModal}
>
    <div class="modal-box">
        <h1 class="text-2xl font-bold">Svol-URL</h1>
        <svg use:svgQR={{ data: url }} />

    </div>

    <form method="dialog" class="modal-backdrop">
        <button>Close</button>
    </form>
</dialog>
{/if}
