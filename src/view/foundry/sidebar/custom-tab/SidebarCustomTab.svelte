<script>
   export let message = '';
</script>

<main>
   <!-- Note this is demo code and you should not allow arbitrary user generated content to be inserted as HTML -->
   {@html message}
</main>

<style>
   main {
      padding: 8px;
      overflow-y: auto;
   }
</style>
