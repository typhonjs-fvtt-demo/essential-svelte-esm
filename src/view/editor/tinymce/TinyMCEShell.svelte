<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   import { TJSTinyMCE }         from '@typhonjs-fvtt/svelte-standard/component';

   // Provides several helper functions to provide various TinyMCE configuration.
   import { TinyMCEHelper }      from '@typhonjs-fvtt/svelte-standard/component';

   // Not always necessary, but you can use DOMPurify to sanitize user input client side.
   // import { DOMPurify }          from '@typhonjs-fvtt/runtime/dompurify';

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
      // document: game.items.get('cUZEGVZdhr6G9QcM'),   // An item to edit description; note: replace w/ valid doc.
      // fieldName: 'system.description.value',          // Path to data in `a.b.c`; note: this is a v10 field name.

      // button: true      // Show edit button to launch editor when hovered; when false editor is open by default.
      // editable: true,   // Enable / disable editing
      // DOMPurify         // You can pass DOMPurify from `@typhonjs-fvtt/runtime/dompurify though ProseMirror does
                           // essential client side sanitation; IE stripping `<script>` tags, etc.

      // styles: { '--tjs-editor-toolbar-background': 'red' }, // Apply any inline styles / CSS variables

      // `mceConfig` is for
      // mceConfig: TinyMCEHelper.configBasic(),
      // mceConfig: TinyMCEHelper.configStandard()
      // mceConfig: TinyMCEHelper.configTJS(),

      // preventPaste: false,    // Prevents pasting.
      // preventEnterKey: false, // Prevents <enter> key / new lines.
      // saveOnEnter: false,     // Saves editor on <enter> key.
      // saveOnBlur: true,       // Saves editor when it blurs / loses focus; useful for inline editing w/ no toolbar.

      ...TinyMCEHelper.configSingleLine({ contentStyleBody: { 'font-size': '22pt' } }),
      styles: { '--tjs-editor-content-font-size': '22pt' }
   };

   /**
    * Just an example that you can also bind the content / enrichedContent. You can also bind Svelte stores.
    */
   let content = 'Hello from TinyMCE!';
   let enrichedContent;

   $: if (content) { console.log(`! bound content changed: ${content}`) }
   $: if (enrichedContent) { console.log(`! bound enrichedContent changed: ${enrichedContent}`) }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
<!--   <button on:click={() => options.editable = !options.editable}>Test</button>-->
   <TJSTinyMCE {options}
                   bind:content
                   bind:enrichedContent
                   on:editor:cancel={() => console.log('! event - editor:cancel')}
                   on:editor:enrichedContent={(event) => console.log(`! event - editor:enrichedContent - ${event.detail.enrichedContent}`)}
                   on:editor:save={(event) => console.log(`! event - editor:save - ${event.detail.content}`)}
                   on:editor:start={() => console.log('! event - editor:start')} />
                   <!-- You can subscribe to the above events if desired -->
</ApplicationShell>