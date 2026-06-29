<script>

</script>

<section>
   You can add a custom Svelte component as a unique section and provide whatever custom interface that may configure
   / serialize state for your application. You may also define a `summary end` component as seen in the light red
   background area to the far right of the folder summary. You can see how to retrieve the tracking store from
   this component: `CustomSummaryEnd`.
</section>

<style lang=scss>
   section {
      display: flex;
      justify-content: center;
      align-items: center;
      height: fit-content;
      padding: var(--tjs-content-padding);
   }
</style>
