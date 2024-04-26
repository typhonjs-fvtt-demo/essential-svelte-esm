<script>
   import {
      getGsapEasingFunc,
      gsapEasingList,
      GsapCompose }   from '#runtime/svelte/gsap';

   // Imports the loading code / automatic GSAP plugin registration.
   import '#runtime/svelte/gsap/plugin/CustomEase';
   import '#runtime/svelte/gsap/plugin/MotionPathPlugin';
   import '#runtime/svelte/gsap/plugin/bonus/CustomWiggle';

   export let position = void 0;

   // Defines a custom ease w/ the CustomWiggle plugin. This is used below to set a variable amount of wiggle count
   // depending on the duration of the animation; more wiggles the lower the duration.
   const customWiggle = (count = 10, type = 'anticipate') => `wiggle({ wiggles: ${count}, type: ${type} })`;

   let easeName = 'linear';
   let duration = 1;
   let gsapTimeline, gsapTween;
   let innerHeight, innerWidth;

   $: ease = getGsapEasingFunc(easeName);

   function getRandomInt(min, max)
   {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   function gsapTimelineCreate()
   {
      const width = innerWidth;
      const height = innerHeight;

      // width & height divided by 6; used for motion path.
      const width6 = width / 6;
      const height6 = height / 6;

      const doubleDuration = duration * 2;

      // Defines the Bézier curve to animate along which will vary from the starting position of each box. This curve
      // is based on current width / height. This data is for the MotionPathPlugin.
      const motionVars = {
         motionPath: {
            path: [
               { left: width6 * 3, top: height6 * 3 },
               { left: width6 * 2, top: height6 * 4 },
               { left: width6 * 2.5, top: height6 * 2 },
               { left: width6 * 3, top: height6 * 3 }
            ],
            alignOrigin: [0.5, 0.5],
         },
         duration: doubleDuration,
         ease
      };

      // Kill & stop any existing timeline.
      if (gsapTimeline !== void 0) { gsapTimeline.kill(); }

      // Create new GSAP timeline; in paused state.
      gsapTimeline = GsapCompose.timeline({ paused: true });

      gsapTimeline.add(GsapCompose.timeline(position, [
         { type: 'to', vars: { left: getRandomInt(width6 * 2, width6 * 4), duration, ease }, position: '<' },
         { type: 'to', vars: { rotation: getRandomInt(0, 360), duration, ease }, position: '<' },
         { type: 'to', target: 'element', vars: { opacity: 0.4, duration, ease }, position: duration / 2 },
         { type: 'to', vars: { top: getRandomInt(height6 * 2, height6 * 4), duration, ease } },
         { type: 'to', vars: { rotation: '+=20', duration: doubleDuration, ease: customWiggle() }, position: '<+=50%' },
         { type: 'to', vars: motionVars },
         { type: 'to', target: 'element', vars: { opacity: 1, duration, ease }, position: `-=${duration}` },
         { type: 'to', vars: { rotation: 720, duration, ease }, position: '<' },
      ]));
   }

   function gsapTimelinePause()
   {
      if (gsapTimeline !== void 0) { gsapTimeline.pause(); }
   }

   function gsapTimelinePlay()
   {
      if (gsapTimeline !== void 0) { gsapTimeline.play(); }
   }

   function gsapTimelineRestart()
   {
      if (gsapTimeline !== void 0) { gsapTimeline.restart(); }
   }

   function gsapTimelineReverse()
   {
      if (gsapTimeline !== void 0) { gsapTimeline.reverse(); }
   }

   function gsapWiggle()
   {
      position.set({ transformOrigin: 'center' });

      // Finish existing tween first!
      if (gsapTween !== void 0 && gsapTween.isActive()) { return; }

      gsapTween = GsapCompose.to(position, {
         rotation: '+=20',
         duration,
         ease: customWiggle(),
         onComplete: () => position.set({ transformOrigin: 'top left' })
      });
   }
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<section>
   <div>
      <label>Duration:
         <input type=range min=0 max=3 step=0.1 bind:value={duration}>
         <input type=text bind:value={duration} readonly>
      </label>

      <label>Easing:
         <select bind:value={easeName}>
            {#each gsapEasingList as easeFnName}
               <option value={easeFnName}>
                  {easeFnName}
               </option>
            {/each}
         </select>
      </label>
   </div>

   <div>
      <button class=fit-content on:click={gsapTimelineCreate}>New Timeline</button>
      <button on:click={gsapTimelinePlay}><i class="fas fa-play"></i></button>
      <button on:click={gsapTimelineReverse}><i class="fas fa-backward"></i></button>
      <button on:click={gsapTimelinePause}><i class="fas fa-pause"></i></button>
      <button on:click={gsapTimelineRestart}><i class="fas fa-arrow-left"></i></button>
      <button class=fit-content on:click={gsapWiggle}>Wiggle</button>
   </div>
</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      border: 0.1em solid rgba(0, 0, 0, 0.2);
      border-radius: 1em;
      background: rgba(0, 0, 0, 0.1);

      padding: 0.5em;

      input[type=text] {
         max-width: 2.5em;
         pointer-events: none;
         text-align: center;
      }

      select {
         width: fit-content;
      }

      button {
         white-space: nowrap;
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
