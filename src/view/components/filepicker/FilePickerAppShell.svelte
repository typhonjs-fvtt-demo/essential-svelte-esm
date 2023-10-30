<script>
   import { ApplicationShell }   from '#runtime/svelte/component/core';
   import TJSFileButtonBasic     from './TJSFileButtonBasic.svelte';

   export let elementRoot = void 0;

   let filepath = '';

   const pickerOptions = {
      id: 'test-fp',
      width: 800,
      top: 100
   };

   $: console.log(`!!!! Filepath: `, filepath);
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <div>
      <input type=text bind:value={filepath} readonly />
      <TJSFileButtonBasic bind:filepath {pickerOptions} />
   </div>
</ApplicationShell>

<style>
   div {
      display: flex;
      gap: 0.5em;
   }
</style>