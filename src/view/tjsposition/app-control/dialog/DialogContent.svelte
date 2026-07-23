<script>
   import { writable }        from 'svelte/store';

   import { TJSSvgFolder }    from '#standard/component/folder';

   import PosAnimateTo        from './PosAnimateTo.svelte';
   import PosDraggable        from './draggable/PosDraggable.svelte';
   import PosGsap             from './PosGsap.svelte';
   import PosProperties       from './PosProperties.svelte';

   /** 
    * @import { PositionApp } from '../PositionApp';
    */

   /** @type {PositionApp} */
   export let application;

   const storeDebug = application.storeDebug;

   const alwaysOnTop = application.dialog ? application.dialog.reactive.storeAppOptions.alwaysOnTop : writable(false);

   const position = application.position;
</script>

<main>
   <!-- svelte-ignore a11y-missing-attribute -->
   <h4>Adjust `Position` of <a role=presentation on:click={() => application.bringToTop({ focus: false })}><u>parent application</u></a>:</h4>

   <TJSSvgFolder label={'Properties:'}>
      <PosProperties {position} />
   </TJSSvgFolder>

   <TJSSvgFolder label={'AnimateTo / Save / Restore / Reset:'}>
      <PosAnimateTo {application}/>
   </TJSSvgFolder>

   <TJSSvgFolder label={'GSAP Timeline / Tween:'}>
      <PosGsap {position} />
   </TJSSvgFolder>

   <TJSSvgFolder label={'Draggable:'}>
      <PosDraggable />
   </TJSSvgFolder>

   <hr>

   <div style="justify-content: flex-start">
      <input type=checkbox bind:checked={$storeDebug}>
      Debug: Show transform bounding rectangle.
   </div>
   <div style="justify-content: flex-start">
      <input type=checkbox bind:checked={$alwaysOnTop}>
      Dialog: Always on top.
   </div>
</main>

<style lang=scss>
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      div {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   hr { width: 96% }
</style>
