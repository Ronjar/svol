<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  export let form;
  import { slide } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  let showError = false;
  let timeoutId: number;

  $: if (form?.error) {
      showError = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
          showError = false;
      }, 3000);
  }

  onDestroy(() => {
      clearTimeout(timeoutId);
  });
</script>

<div class="flex items-center justify-center h-full relative">
<div class="card w-96 bg-base-100 shadow-xl mt-48">
  <div class="card-body">
    <h2 class="card-title">Login</h2>
    <form method="POST">
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="input input-bordered w-full"
      />
      <div class="card-actions justify-end mt-4">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</div>
</div>
{#if showError}
  <div
    class="alert alert-error error-message"
    transition:slide={{ duration: 500 }}
  >
    <div class="flex-1">
      <label>{form.error}</label>
    </div>
  </div>
{/if}

<style>
.error-message {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 80%;
  max-width: 500px;
}
</style>
