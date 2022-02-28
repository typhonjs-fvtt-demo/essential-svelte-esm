<script>
   import * as easingFuncs from 'svelte/easing';

   export let application = void 0;

   let position;

   let top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex;

   $:
   {
      position = application.position;

      ({top, left, width, height, rotateX, rotateY, rotateZ, scale, transformOrigin, zIndex} = position.stores);
   }

   let innerWidth, innerHeight
   let nullishRotateX, nullishRotateY, nullishRotateZ, nullishScale;

   $: if (rotateX) { nullishRotateX = Number.isFinite($rotateX) ? $rotateX : 'null'; }
   $: if (rotateY) { nullishRotateY = Number.isFinite($rotateY) ? $rotateY : 'null'; }
   $: if (rotateZ) { nullishRotateZ = Number.isFinite($rotateZ) ? $rotateZ : 'null'; }
   $: if (scale) { nullishScale = Number.isFinite($scale) ? $scale : 'null'; }

   let easing = easingFuncs.linear;

   let duration = 1000;
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
      <label for=zIndex>zIndex:</label>
      <input type=range min=0 max=500 id=zIndex bind:value={$zIndex}>
      <input type=text bind:value={$zIndex} readonly>
   </div>

   <hr>

   <div>
      <label class=duration for=duration>Duration:</label>
      <input type=range min=100 max=3000 id=duration bind:value={duration}>
      <input type=text bind:value={duration} readonly>
   </div>

   <div>
      <label for=easing>Easing:</label>
      <select id=easing bind:value={easing}>
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

   <div>
      <button on:click={() => position.animateTo({ rotateY: position.rotateY < 360 ? 360 : 0 }, { duration, easing })}>Animate flip</button>
      <button on:click={() => position.reset()}>Reset</button>
   </div>

   <div>
      <button on:click={() => application.state.save({ name: 'save-1' })}>Save Position</button>
      <button on:click={() => application.state.restore({ name: 'save-1', animateTo: true, easing, duration })}>Restore Position</button>
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