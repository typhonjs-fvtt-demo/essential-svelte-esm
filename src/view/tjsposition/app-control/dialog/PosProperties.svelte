<script>
   /**
    * @type {import('#runtime/svelte/store/position').TJSPosition}
    */
   export let position = void 0;

   let top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex;

   let minWidth, minHeight, maxWidth, maxHeight;

   ({top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex} = position.stores);

   ({minWidth, minHeight, maxWidth, maxHeight} = position.stores);

   let innerWidth, innerHeight;
   let nullishRotateX, nullishRotateY, nullishRotateZ, nullishScale;

   $: if (rotateX) { nullishRotateX = Number.isFinite($rotateX) ? $rotateX : 'null'; }
   $: if (rotateY) { nullishRotateY = Number.isFinite($rotateY) ? $rotateY : 'null'; }
   $: if (rotateZ) { nullishRotateZ = Number.isFinite($rotateZ) ? $rotateZ : 'null'; }

   $: if (scale) { nullishScale = Number.isFinite($scale) ? $scale : 'null'; }

   let nullishMinWidth, nullishMinHeight, nullishMaxWidth, nullishMaxHeight;

   $: if (minWidth) { nullishMinWidth = Number.isFinite($minWidth) ? $minWidth : 'null'; }
   $: if (minHeight) { nullishMinHeight = Number.isFinite($minHeight) ? $minHeight : 'null'; }
   $: if (maxWidth) { nullishMaxWidth = Number.isFinite($maxWidth) ? $maxWidth : 'null'; }
   $: if (maxHeight) { nullishMaxHeight = Number.isFinite($maxHeight) ? $maxHeight : 'null'; }
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<section>
   <div>
      <label>top:
         <input type=range min=0 max={innerHeight} bind:value={$top}>
         <input type=text bind:value={$top} readonly>
      </label>

      <label>left:
         <input type=range min=0 max={innerWidth} bind:value={$left}>
         <input type=text bind:value={$left} readonly>
      </label>
   </div>

   <div>
      <label>width:
         <input type=range min=395 max={innerWidth} bind:value={$width}>
         <input type=text bind:value={$width} readonly>
      </label>

      <label>height:
         <input type=range min=240 max={innerHeight} bind:value={$height}>
         <input type=text bind:value={$height} readonly>
      </label>
   </div>

   <div>
      <label>rotateX:
         <input type=range min=0 max=360 bind:value={$rotateX}>
         <input type=text bind:value={nullishRotateX} readonly>
      </label>

      <label>Y:
         <input type=range min=0 max=360 bind:value={$rotateY}>
         <input type=text bind:value={nullishRotateY} readonly>
      </label>

      <label>Z:
         <input type=range min=0 max=360 bind:value={$rotateZ}>
         <input type=text bind:value={nullishRotateZ} readonly>
      </label>
   </div>

   <div>
      <label>minWidth:
         <input type=range min=0 max=450 bind:value={$minWidth}>
         <input type=text bind:value={nullishMinWidth} readonly>
      </label>

      <label>minHeight:
         <input type=range min=0 max=450 bind:value={$minHeight}>
         <input type=text bind:value={nullishMinHeight} readonly>
      </label>
   </div>

   <div>
      <label>maxWidth:
         <input type=range min=0 max={innerWidth} bind:value={$maxWidth}>
         <input type=text bind:value={nullishMaxWidth} readonly>
      </label>

      <label>maxHeight:
         <input type=range min=0 max={innerHeight} bind:value={$maxHeight}>
         <input type=text bind:value={nullishMaxHeight} readonly>
      </label>
   </div>

   <div>
      <label>scale:
         <input type=range min=0 max=5 step=0.01 bind:value={$scale}>
         <input type=text class=small bind:value={nullishScale} readonly>
      </label>

      <label>zIndex:
         <input type=range min=0 max=500 bind:value={$zIndex}>
         <input type=text class=small bind:value={$zIndex} readonly>
      </label>

      <label>Transform Origin:
         <select bind:value={$transformOrigin}>
            {#each transformOrigin.values as transform}
               <option value={transform}>
                  {transform}
               </option>
            {/each}
         </select>
      </label>
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      border: 0.1em solid var(--content-link-border-color);
      border-radius: 1em;
      background: var(--section-background-color);

      padding: 0.5em;

      input[type=text] {
         max-width: 4em;
         pointer-events: none;
         text-align: center;
      }

      input[type=text].small {
         max-width: 3em;
      }

      select {
         width: fit-content;
      }

      div {
         display: flex;
         align-items: center;
         justify-content: center;
         gap: 0.75em;
      }

      label {
         display: flex;
         align-items: center;
         flex: 1;
         gap: 0.5em;
         text-align: right;
      }
   }
</style>
