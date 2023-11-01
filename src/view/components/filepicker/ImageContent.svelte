<script>
   import { getContext } from 'svelte';

   /**
    * The `filepath` store from the parent `TJSFileSlotButton` component.
    *
    * @type {import('svelte/store').Writable<string>}
    */
   const filepath = getContext('filepath');

   /**
    * `filepath` is a string, however if it is undefined / null / or a string of length 0 IE '' then use the
    * `mystery-man` path as the image source.
    */
   $: imageSrc = $filepath?.length ? $filepath : 'icons/svg/mystery-man.svg';
</script>

<img src={imageSrc} alt="Profile" />

<style>
   img {
      display: block;
      height: 75px;
      width: 75px;

      object-fit: contain;
      border: none;
   }
</style>