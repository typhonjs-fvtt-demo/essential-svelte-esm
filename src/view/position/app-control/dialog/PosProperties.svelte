<script>
   export let position = void 0;

   let top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex;

   let minWidth, minHeight, maxWidth, maxHeight;

   ({top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex} = position.stores);

   ({minWidth, minHeight, maxWidth, maxHeight} = position.stores);

   let innerWidth, innerHeight
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
   <div class=flex>
      <label for=top>top:</label>
      <input type=range min=0 max={innerHeight} id=top bind:value={$top}>
      <input type=text bind:value={$top} readonly>

      <label for=left>left:</label>
      <input type=range min=0 max={innerWidth} id=left bind:value={$left}>
      <input type=text bind:value={$left} readonly>
   </div>

   <div class=flex>
      <label for=width>width:</label>
      <input type=range min=395 max={innerWidth} id=width bind:value={$width}>
      <input type=text bind:value={$width} readonly>

      <label for=height>height:</label>
      <input type=range min=240 max={innerHeight} id=height bind:value={$height}>
      <input type=text bind:value={$height} readonly>
   </div>

   <div class=flex>
      <label for=rotateX>rotateX:</label>
      <input type=range min=0 max=360 id=rotateX bind:value={$rotateX}>
      <input type=text bind:value={nullishRotateX} readonly>

      <label for=rotateY>Y:</label>
      <input type=range min=0 max=360 id=rotateY bind:value={$rotateY}>
      <input type=text bind:value={nullishRotateY} readonly>

      <label for=rotateZ>Z:</label>
      <input type=range min=0 max=360 id=rotateZ bind:value={$rotateZ}>
      <input type=text bind:value={nullishRotateZ} readonly>
   </div>

   <div class=flex>
      <label for=minWidth>minWidth:</label>
      <input type=range min=0 max=450 id=minWidth bind:value={$minWidth}>
      <input type=text bind:value={nullishMinWidth} readonly>

      <label for=minHeight>minHeight:</label>
      <input type=range min=0 max=450 id=minHeight bind:value={$minHeight}>
      <input type=text bind:value={nullishMinHeight} readonly>
   </div>

   <div class=flex>
      <label for=maxWidth>maxWidth:</label>
      <input type=range min=0 max={innerWidth} id=maxWidth bind:value={$maxWidth}>
      <input type=text bind:value={nullishMaxWidth} readonly>

      <label for=maxHeight>maxHeight:</label>
      <input type=range min=0 max={innerHeight} id=maxHeight bind:value={$maxHeight}>
      <input type=text bind:value={nullishMaxHeight} readonly>
   </div>

   <div class=flex>
      <label for=scale>scale:</label>
      <input type=range min=0 max=5 step=0.01 id=scale bind:value={$scale}>
      <input type=text class=small bind:value={nullishScale} readonly>

      <label for=zIndex>zIndex:</label>
      <input type=range min=0 max=500 id=zIndex bind:value={$zIndex}>
      <input type=text class=small bind:value={$zIndex} readonly>

      <label for=transformOrigin>Transform Origin:</label>
      <select id=transformOrigin bind:value={$transformOrigin}>
         {#each transformOrigin.values as transform}
            <option value={transform}>
               {transform}
            </option>
         {/each}
      </select>
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;

      border: 0.1em solid rgba(0, 0, 0, 0.2);
      border-radius: 1em;
      background: rgba(0, 0, 0, 0.1);

      padding: 0.25em;

      input { margin: 0.5em; }
      input[type=text] { max-width: 3.5em; pointer-events: none; }

      input[type=text].small { max-width: 2.5em; }

      select { margin: 0.5em; width: fit-content; }

      div {
         display: flex;
         align-items: center;
         justify-content: center;

         .flex {
            height: fit-content;

            *:not(:last-child) {
               margin-right: 0.25em;
            }

            label:not(:first-child) {
               margin-left: 0.5em;
            }
         }
      }

      label {
         text-align: right;
         width: 6em;
      }
   }
</style>