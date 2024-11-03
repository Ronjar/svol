<!-- src/components/DeviceCard.svelte -->
<script lang="ts">
    export let device;
  
    const wakeDevice = async () => {
      await fetch('/api/wake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mac: device.mac })
      });
  
      // Update the status
      const checkStatus = async () => {
        const response = await fetch(`/api/ping?ip=${device.ip}`);
        const status = await response.json();
        device.status = status.online ? 'online' : 'offline';
        if (!status.online) {
          setTimeout(checkStatus, 5000);
        }
      };
  
      checkStatus();
    };
  </script>
  
  <div class="card card-side bg-base-100 shadow-xl">
    <figure class={`w-24 h-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></figure>
    <div class="card-body">
      <h2 class="card-title">{device.name}</h2>
      <p>IP: {device.ip}</p>
      <p>MAC: {device.mac}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" on:click={wakeDevice}>Wake Up</button>
      </div>
    </div>
  </div>
  