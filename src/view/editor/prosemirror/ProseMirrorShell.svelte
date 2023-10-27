<script>
   import { ApplicationShell }   from '#runtime/svelte/component/core';

   import { TJSProseMirror }     from '#standard/component';

   // Not always necessary, but you can use DOMPurify to sanitize user input client side.
   // import { DOMPurify }          from '#runtime/dompurify';

   export let elementRoot = void 0;

   /**
    * You can set a document to load / save content from given a `fieldName` in the format of `a.b.c`.
    * When you set a document you can also enable collaboration.
    *
    * The simplest example is:
    *
    * <TJSProseMirror options={{document: <doc>, fieldName: 'some.data.path'}} />
    *
    * The following options data is mostly commented out. For the most part though the values shown for configuration
    * show the default values _or_ in some cases the type of data that you need to set.
    */
   const options = {
      /**
       * To set up automatic serialization to a document you must provide a valid Foundry document _and_ a field name
       * to reference for content. This will automatically pull from and save content to that field name.
       */
      // document: game.items.get('g1duUdZZ2kUVFXc8'),   // An item to edit description; note: replace w/ valid doc.
      // fieldName: 'system.description.value',          // Path to data in `a.b.c`; note: this is a v10 field name.

      /**
       * Specific ProseMirror options:
       */
      // collaborate: false,                             // Enables collaboration; requires document.
      // plugins: {  // Additional PM plugins to load; example below includes the highlight document matches plugin.
      //    highlightDocumentMatches: ProseMirror.ProseMirrorHighlightMatchesPlugin.build(ProseMirror.defaultSchema)
      // }

      /**
       *  Standard TRL editor options.
       *  Note: The PM editor doesn't support as many options as the TinyMCE / contenteditable editor.
       */
      // button: true      // Show edit button to launch editor when hovered; when false editor is open by default.
      // classes: ['foo', 'bar'],   // Adds additional classes to `.tjs-editor` element.
      // clickToEdit: false,  // Clicking editor content initializes the editor; hides the edit button.
      // DOMPurify,        // You can pass DOMPurify from `#runtime/dompurify though ProseMirror does
                           // essential client side sanitation; IE stripping `<script>` tags, etc.
      // editable: true,   // Explicitly enable / disable editing; default: user is GM or when a document is
                           // assigned the user has ownership.
      // enrichContent: true  // The default is true, but if you set it to false content is not enriched.
      // enrichOptions: {}    // Additional `TextEditor.enrichHTML` options. See: EnrichmentOptions

      // initialSelection: 'start', // The initial selection / cursor position: 'all', 'end', or 'start'.
      // keyCode: 'Enter',    // Defines the key event code to activate the editor when focused.

      // styles: { '--tjs-editor-toolbar-background': 'red' } // Apply any inline styles / CSS variables
   };

   /**
    * Just an example that you can also bind the content / enrichedContent. You can also bind Svelte stores.
    */
   let content = 'Hello from ProseMirror!';
   let enrichedContent;

   $: if (content) { console.log(`! bound content changed: ${content}`) }
   $: if (enrichedContent) { console.log(`! bound enrichedContent changed: ${enrichedContent}`) }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <TJSProseMirror {options}
                   bind:content
                   bind:enrichedContent
                   on:editor:cancel={() => console.log('! event - editor:cancel')}
                   on:editor:document:deleted={() => console.log('! event - editor:document:deleted')}
                   on:editor:enrichedContent={(event) => console.log(`! event - editor:enrichedContent - ${event.detail.enrichedContent}`)}
                   on:editor:save={(event) => console.log(`! event - editor:save - ${event.detail.content}`)}
                   on:editor:start={() => console.log('! event - editor:start')} />
                   <!-- Optionally, you can subscribe to the above events if desired -->
</ApplicationShell>