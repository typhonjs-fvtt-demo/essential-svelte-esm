<script>
   import { TJSSvgFolder } from '#standard/component/folder';

   import PosAnimateTo     from './PosAnimateTo.svelte';
   import PosDraggable     from './draggable/PosDraggable.svelte';
   import PosGsap          from './PosGsap.svelte';
   import PosProperties    from './PosProperties.svelte';

   export let application = void 0;

   const storeDebug = application.storeDebug;

   const position = application.position;
</script>

<main>
   <!-- svelte-ignore a11y-missing-attribute -->
   <h3>Adjust `Position` of <a role=presentation on:click={() => application.bringToTop({ focus: false })}><u>parent application</u></a>:</h3>

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
      <PosDraggable {position} />
   </TJSSvgFolder>

   <hr>

   <div style="justify-content: flex-start">
      <input type=checkbox bind:checked={$storeDebug}>
      Debug: Show transform bounding rectangle.
   </div>
</main>

<style lang=scss>
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      div {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   hr { width: 96% }
</style>
