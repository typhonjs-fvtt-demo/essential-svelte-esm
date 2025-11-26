<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import { TJSCodeMirror }      from '#standard/component/fvtt/editor';

   export let elementRoot = void 0;

   /**
    * You can set a document to load / save content from given a `fieldName` in the format of `a.b.c`.
    *
    * The simplest example is:
    *
    * <TJSCodeMirror options={{document: <doc>, fieldName: 'some.data.path'}} />
    *
    * The following options data is mostly commented out. For the most part though the values shown for configuration
    * show the default values _or_ in some cases the type of data that you need to set.
    *
    * @type {import('#standard/component/fvtt/editor').TJSCodeMirrorOptions}
    */
   const options = {
      /**
       * To set up automatic serialization to a document you must provide a valid Foundry document _and_ a field name
       * to reference for content. This will automatically pull from and save content to that field name.
       */
      // document: game.items.get('0MYOJFx3vkYA95B4'),   // An item to edit description; note: replace w/ valid doc.
      // fieldName: 'system.description.value',          // Path to data in `a.b.c`; note: this is a v10 field name.

      /**
       * Specific CodeMirror options:
       */
      language: 'javascript', // CM language support; options: `html`, `javascript`, `json`, `markdown`, `plain`.
      // indent: 0,              // CM indentation level; positive integer between 0-8.
      // nowrap: true            // CM wrap lines option.

      /**
       *  Standard TRL editor options.
       *  Note: The CM editor doesn't support as many options as the contenteditable editor.
       */
      // button: true,      // Show edit button to launch editor when hovered; when false editor is open by default.
      // classes: ['foo', 'bar'],   // Adds additional classes to `.tjs-editor` element.
      // clickToEdit: false,  // Clicking editor content initializes the editor; hides the edit button.
      // editable: true,   // Explicitly enable / disable editing; default: user is GM or when a document is
                           // assigned the user has ownership.

      // keyCode: 'Enter',    // Defines the key event code to activate the editor when focused.

      // styles: { '--tjs-editor-border': '2px solid red' } // Apply any inline styles / CSS variables
   };

   /**
    * Just an example that you can also bind the content. You can also bind Svelte stores.
    */
   let content = `const foo = 'bar'; // Hello from CodeMirror!`;

   $: if (content) { console.log(`! bound content changed: ${content}`) }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <TJSCodeMirror {options}
                   bind:content
                   on:editor:cancel={() => console.log('! event - editor:cancel')}
                   on:editor:document:deleted={() => console.log('! event - editor:document:deleted')}
                   on:editor:save={(event) => console.log(`! event - editor:save - ${event.detail.content}`)}
                   on:editor:start={() => console.log('! event - editor:start')} />
                   <!-- Optionally, you can subscribe to the above events if desired -->
</ApplicationShell>
