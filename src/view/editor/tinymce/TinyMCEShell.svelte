<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { TJSTinyMCE }         from '@typhonjs-fvtt/svelte-standard/component';

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
      // document: game.items.get('cUZEGVZdhr6G9QcM'),   // A dummy test item to edit description.
      // fieldName: 'system.description.value',          // Path to data in `a.b.c`
      // collaborate: false,                             // Enables collaboration; requires document.

      // button: true      // Show edit button to launch editor when hovered.
      // editable: true,   // Enable / disable editing
      // DOMPurify         // You can pass DOMPurify from `@typhonjs-fvtt/runtime/dompurify though ProseMirror does
                           // essential client side sanitation; IE stripping `<script>` tags, etc.
   };

   /**
    * Just an example that you can also bind the content / enrichedContent.
    */
   let content = 'Hello from TinyMCE!';
   let enrichedContent;

   $: if (content) { console.log(`! bound content changed: ${content}`) }
   $: if (enrichedContent) { console.log(`! bound enrichedContent changed: ${enrichedContent}`) }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <TJSTinyMCE {options}
                   bind:content
                   bind:enrichedContent
                   on:editor:cancel={() => console.log('! event - editor:cancel')}
                   on:editor:enrichedContent={(event) => console.log(`! event - editor:enrichedContent - ${event.detail.enrichedContent}`)}
                   on:editor:save={(event) => console.log(`! event - editor:save - ${event.detail.content}`)}
                   on:editor:start={() => console.log('! event - editor:start')} />
                   <!-- You can subscribe to the above events if desired -->
</ApplicationShell>