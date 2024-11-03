<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import DeviceCard from '$lib/components/DeviceCard.svelte';
  
    export let data;
  
    let devices = data.devices;
  
    const pingDevice = async (device) => {
      const response = await fetch(`/api/ping?ip=${device.ip}`);
      const status = await response.json();
      device.status = status.online ? 'online' : 'offline';
    };
  
    onMount(() => {
      devices.forEach((device) => {
        pingDevice(device);
      });
    });
  
    // If no devices are set, show a message
    let noDevices = devices.length === 0;
  </script>
  
  {#if noDevices}
    <div class="flex items-center justify-center h-full">
      <div class="card w-96 bg-base-100 shadow-xl mt-48">
        <div class="card-body">
          <h2 class="card-title">No devices found</h2>
          <p>Please add devices to the environment variables.</p>
          <div class="card-actions justify-end">
            <a href="YOUR_LINK_HERE" class="btn btn-primary">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each devices as device}
        <DeviceCard {device} />
      {/each}
    </div>
  {/if}
  