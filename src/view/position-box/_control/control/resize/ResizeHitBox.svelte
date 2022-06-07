<script>
   import { applyStyles } from '@typhonjs-fvtt/runtime/svelte/action'

   export let data;

   const capture = () => null;
</script>

<div use:applyStyles={data.styles}
     on:pointerdown|preventDefault|stopPropagation={capture}
     on:pointermove|preventDefault|stopPropagation={capture}
     on:pointerover|preventDefault|stopPropagation={capture}
     on:pointerup|preventDefault|stopPropagation={capture}
/>

<style>
   div {
      position: absolute;
   }
</style>