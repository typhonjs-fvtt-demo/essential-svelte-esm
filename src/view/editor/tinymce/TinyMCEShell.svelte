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
    * <TJSTinyMCE options={{document: <doc>, fieldName: 'some.data.path'}} />
    *
    * The following options data is commented out as it is set to a specific document for the DnD5e system.
    */
   const options = {
      /**
       * To set up automatic serialization to a document you must provide a valid Foundry document _and_ a field name
       * to reference for content. This will automatically pull from and save content to that field name.
       */
      // document: game.items.get('cUZEGVZdhr6G9QcM'),   // An item to edit description; note: replace w/ valid doc.
      // fieldName: 'system.description.value',          // Path to data in `a.b.c`; note: this is a v10 field name.

      // button: true         // Show edit button to initialize editor; when false editor is open by default.
      // classes: ['foo', 'bar'],   // Adds additional classes to `.editor` element.
      // clickToEdit: false,  // Clicking editor content initializes the editor; hides the edit button.
      // editable: true,      // Enable / disable editing
      // DOMPurify            // You can pass DOMPurify from `@typhonjs-fvtt/runtime/dompurify though TinyMCE does
                              // essential client side sanitation; IE stripping `<script>` tags, etc.

      /**
       * You can add specific fonts just for this editor by providing a {@link FontFamilyDefinition} object.
       * The object key is the name of the font to be displayed in the editor with the `FontFamilyDefinition` as the
       * value. For keys with spaces use 'quotes'. The URLS should point to a `woff2` file from your module.
       *
       * Note the `urls` are {@link FontFaceDescriptors} and can contain additional information like `weight`, etc.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/FontFace
       *
       * @see https://foundryvtt.com/api/interfaces/client.FontFamilyDefinition.html
       */
      fonts: {
         Almendra: {
            editor: true,
            fonts: [
               { urls: ['modules/forien-quest-log/assets/fonts/almendra-v15-latin-regular.woff2'] }
            ]
         },
         Audiowide: {
            editor: true,
            fonts: [
               { urls: ['modules/forien-quest-log/assets/fonts/audiowide-v9-latin-regular.woff2'] }
            ]
         },
         'Bilbo Swash Caps': {
            editor: true,
            fonts: [
               { urls: ['modules/forien-quest-log/assets/fonts/bilbo-swash-caps-v15-latin-regular.woff2'] }
            ]
         }
      },

      // initialSelection: 'start', // The initial selection / cursor position: 'all', 'end', or 'start'.

      // maxCharacterLength: 25, // Limits content / input to 25 characters; pasting is text only / any HTML stripped.

      /**
       * `mceConfig` is for the specific TinyMCE config. There are several helper presets available that customize these
       * options with further easy configurability by passing an object into the `configBasic`, `configStandard` and
       * `configTJS`. By default, if no `mceConfig` is specified then `configStandard` is applied.
       *
       * In short `configBasic` provides a minimal toolbar, but also removes `headings` and other options from TinyMCE
       * such that users can't use key combinations to add headers. This is useful for minimal editing sessions where
       * open style changes are not desired and just the standard `bold` / `italic` is exposed.
       *
       * `configStandard` matches the look and feel of what is provided in the ProseMirror editor and is the default
       * config used when `mceConfig` is not specified.
       *
       * `configTJS` is _my / TyphonJS'_ preferred configuration. It further groups various actions on the toolbar
       * creating a compact, but even more powerful view especially for font options in sub menus.
       *
       * You can check out the documentation for the config options in most IDEs:
       * {@link TinyMCEHelper.configBasic}
       * {@link TinyMCEHelper.configStandard}
       * {@link TinyMCEHelper.configTJS}
       *
       * At the moment there isn't API documentation, but do directly check the source code documentation here:
       * @see https://github.com/typhonjs-fvtt-lib/svelte-standard/blob/main/src/component/standard/editor/tinymce/TinyMCEHelper.js
       */
      // mceConfig: TinyMCEHelper.configBasic(),
      // mceConfig: TinyMCEHelper.configStandard(),   // This is the default config.
      // mceConfig: TinyMCEHelper.configTJS(),

      // preventEnterKey: false, // Prevents <enter> key / new lines.
      // preventPaste: false,    // Prevents pasting.
      // saveOnBlur: false,      // Saves editor when it blurs / loses focus; useful for inline editing w/ no toolbar.
      // saveOnEnterKey: false,  // Saves editor on <enter> key.

      /**
       * For a full listing of CSS variables available please refer to TJSTinyMCE source documentation:
       * @see https://github.com/typhonjs-fvtt-lib/svelte-standard/blob/main/src/component/standard/editor/tinymce/TJSTinyMCE.svelte
       */
      // styles: { '--tjs-editor-toolbar-background': 'red' }, // Apply any inline styles / CSS variables

      /**
       * `TinyMCEHelper.optionsSingleLine` is a special helper that defines not only `mceConfig`, but several other
       * options such as `saveOnEnter`,  `saveOnBlur`, to solve a single line entry use case. Take note that you must
       * use `...` / rest syntax to include it in options.
       */
      // ...TinyMCEHelper.optionsSingleLine(),
   };

   /**
    * Just an example that you can also bind the content / enrichedContent. You can also bind Svelte stores.
    */
   let content = 'Hello from TinyMCE!';

   // TODO REMOVE
   // let content = '<p style="text-align: center;"><span style="font-family: Audiowide; font-size: 28pt;">Hello from TinyMCE!</span></p>';

   let enrichedContent;

   $: if (content) { console.log(`! bound content changed: ${content}`) }
   $: if (enrichedContent) { console.log(`! bound enrichedContent changed: ${enrichedContent}`) }
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
<!--TODO REMOVE-->
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