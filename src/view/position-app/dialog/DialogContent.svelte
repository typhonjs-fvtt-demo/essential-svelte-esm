<script>
   import { TJSSvgFolder } from '@typhonjs-fvtt/svelte-standard/component';

   import PosAnimateTo     from './PosAnimateTo.svelte';
   import PosDraggable     from './draggable/PosDraggable.svelte';
   import PosGsap          from './PosGsap.svelte';
   import PosProperties    from './PosProperties.svelte';

   export let application = void 0;

   const storeDebug = application.storeDebug;

   const position = application.position;
</script>

<main>
   <h3>Adjust `Position` of <a on:click={() => application.bringToTop()}><u>parent application</u></a>:</h3>

   <hr>

   <TJSSvgFolder label={'Properties:'}>
      <PosProperties {position} />
   </TJSSvgFolder>

   <TJSSvgFolder label={'AnimateTo / Save / Restore:'}>
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
      <input type=checkbox id=debug bind:checked={$storeDebug}>
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