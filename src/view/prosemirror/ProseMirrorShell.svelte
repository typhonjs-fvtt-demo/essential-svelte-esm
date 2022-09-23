<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { TJSProseMirror }     from '@typhonjs-fvtt/svelte-standard/component';

   export let elementRoot = void 0;

   /**
    * You can set a document to load / save content from given a `fieldName` in the format of `a.b.c`.
    * When you set a document you can also enable collaboration.
    *
    * The simplest example is:
    *
    * <TJSProseMirror options={{document: <doc>, fieldName: 'some.data.path'}} />
    *
    * The following options data is commented out as it is set to a specific document for the DnD5e system.
    */
   const options = {
      // document: game.items.get('cUZEGVZdhr6G9QcM'),  // A dummy test item to edit description.
      // fieldName: 'system.description.value',
      // collaborate: true
   };

   /**
    * Just an example that you can also bind the content.
    */
   let content = 'Hello from ProseMirror!';

   $: if (content) { console.log(`! bound content saved: ${content}`) }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <TJSProseMirror {options}
                   bind:content
                   on:editor:cancel={() => console.log('! editor:cancel')}
                   on:editor:save={(event) => console.log(`! editor:save - ${event.detail.content}}`)}
                   on:editor:start={() => console.log('! editor:start')} />
                   <!-- You can subscribe to the above events if desired -->
</ApplicationShell>