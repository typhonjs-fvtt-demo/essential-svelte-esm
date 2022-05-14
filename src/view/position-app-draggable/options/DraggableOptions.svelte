<script>
   export let options;
</script>

<section>
   <div class=flex>
      <input type=checkbox bind:checked={options.ease}/>
      <span>Ease:</span>
   </div>

   <div class=flex>
      <label class=duration for=duration>Duration:</label>
      <input type=range min=0 max=3000 id=duration bind:value={options.easeDuration}>
      <input type=text bind:value={options.easeDuration} readonly>
   </div>

</section>

<style lang=scss>
   section {
      text-align: center;
      display: flex;
      flex-direction: column;
   }

   .flex {
      display: flex;
      height: fit-content;
      align-items: center;
   }
</style>