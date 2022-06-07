<script>
   import { getContext }   from 'svelte';

   import { applyStyles }  from '@typhonjs-fvtt/runtime/svelte/action'

   import { resize }       from './resize.js';

   export let data;

   const control = getContext('pcControl');

   const capture = () => null;
</script>

<div use:applyStyles={data.styles}
     use:resize={{ id: data.id, control }}
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