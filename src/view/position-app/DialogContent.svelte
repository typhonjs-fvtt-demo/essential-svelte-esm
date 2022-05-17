<script>
   import * as easingFuncs from 'svelte/easing';

   import {
      optionComponents,
      optionStores,
      optionValues,
      storeDraggable }     from './options/index.js';

   export let application = void 0;

   const storeDebug = application.storeDebug;

   let position;

   let top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex;

   let minWidth, minHeight, maxWidth, maxHeight;

   let draggableOptions, draggableOptionComp;

   $: {
      draggableOptionComp = optionComponents[$storeDraggable];
      draggableOptions = optionStores[$storeDraggable];
   }

   $:
   {
      position = application.position;

      ({top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex} = position.stores);

      ({minWidth, minHeight, maxWidth, maxHeight} = position.stores);
   }

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

   let ease = easingFuncs.linear;

   let duration = 1;
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<main>
   <h3>Adjust `position` of parent application:</h3>

   <div>
      <label for=top>top:</label>
      <input type=range min=0 max={innerHeight} id=top bind:value={$top}>
      <input type=text bind:value={$top} readonly>
   </div>

   <div>
      <label for=left>left:</label>
      <input type=range min=0 max={innerWidth} id=left bind:value={$left}>
      <input type=text bind:value={$left} readonly>
   </div>

   <div>
      <label for=width>width:</label>
      <input type=range min=395 max={innerWidth} id=width bind:value={$width}>
      <input type=text bind:value={$width} readonly>
   </div>

   <div>
      <label for=height>height:</label>
      <input type=range min=240 max={innerHeight} id=height bind:value={$height}>
      <input type=text bind:value={$height} readonly>
   </div>

   <div>
      <label for=rotateX>rotateX:</label>
      <input type=range min=0 max=360 id=rotateX bind:value={$rotateX}>
      <input type=text bind:value={nullishRotateX} readonly>
   </div>

   <div>
      <label for=rotateY>rotateY:</label>
      <input type=range min=0 max=360 id=rotateY bind:value={$rotateY}>
      <input type=text bind:value={nullishRotateY} readonly>
   </div>

   <div>
      <label for=rotateZ>rotateZ:</label>
      <input type=range min=0 max=360 id=rotateZ bind:value={$rotateZ}>
      <input type=text bind:value={nullishRotateZ} readonly>
   </div>

   <div>
      <label for=scale>scale:</label>
      <input type=range min=0 max=5 step=0.01 id=scale bind:value={$scale}>
      <input type=text bind:value={nullishScale} readonly>
   </div>

   <div>
      <label for=minWidth>minWidth:</label>
      <input type=range min=0 max=360 id=minWidth bind:value={$minWidth}>
      <input type=text bind:value={nullishMinWidth} readonly>
   </div>

   <div>
      <label for=minHeight>minHeight:</label>
      <input type=range min=0 max=360 id=minHeight bind:value={$minHeight}>
      <input type=text bind:value={nullishMinHeight} readonly>
   </div>

   <div>
      <label for=maxWidth>maxWidth:</label>
      <input type=range min=0 max=360 id=maxWidth bind:value={$maxWidth}>
      <input type=text bind:value={nullishMaxWidth} readonly>
   </div>

   <div>
      <label for=maxHeight>maxHeight:</label>
      <input type=range min=0 max=360 id=maxHeight bind:value={$maxHeight}>
      <input type=text bind:value={nullishMaxHeight} readonly>
   </div>

   <div>
      <label for=zIndex>zIndex:</label>
      <input type=range min=0 max=500 id=zIndex bind:value={$zIndex}>
      <input type=text bind:value={$zIndex} readonly>
   </div>

   <hr>

   <div>
      <label for=duration>Duration:</label>
      <input type=range min=0 max=3 step=0.1 id=duration bind:value={duration}>
      <input type=text bind:value={duration} readonly>
   </div>

   <div>
      <label for=easing>Easing:</label>
      <select id=easing bind:value={ease}>
         {#each Object.keys(easingFuncs) as prop}
            <option value={easingFuncs[prop]}>
               {prop}
            </option>
         {/each}
      </select>

      <label for=transformOrigin>Transform Origin:</label>
      <select id=transformOrigin bind:value={$transformOrigin}>
         {#each transformOrigin.values as transform}
            <option value={transform}>
               {transform}
            </option>
         {/each}
      </select>
   </div>

   <hr>

   <div>
      <button on:click={() => position.animateTo({ rotateY: position.rotateY < 360 ? 360 : 0 }, { duration, ease })}>Animate flip</button>
      <button on:click={() => position.reset()}>Reset</button>
   </div>

   <div>
      <button on:click={() => application.state.save({ name: 'save-1' })}>Save Position</button>
      <button on:click={() => application.state.restore({ name: 'save-1', animateTo: true, ease, duration })}>Restore Position</button>
   </div>

   <hr>

   <div>
      <label for=draggableSelect>Draggable Implementation:</label>
      <select id=draggableSelect bind:value={$storeDraggable}>
         {#each Object.entries(optionValues) as [key, value]}
            {(console.log(`! template - option - value name: ${value?.name}; key: ${key}`), '')}
            <option value={value}>{key}</option>
         {/each}
      </select>
   </div>

   <hr>
      <svelte:component this={draggableOptionComp} options={$draggableOptions} />
   <hr>

   <div style="justify-content: flex-start">
      <input type=checkbox id=debug bind:checked={$storeDebug}>
      Debug: Show transform bounding rectangle.
   </div>
</main>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;

      input { margin: 6px }
      input[type=text] { max-width: 6em }

      select { margin: 6px; width: fit-content; }

      button { margin: 3px; }

      div {
         display: flex;
         align-items: center;
         justify-content: center;
      }

      label {
         text-align: right;
         width: 6em;
      }

      hr { width: 96% }
   }
</style>