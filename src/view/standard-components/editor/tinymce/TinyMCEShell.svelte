<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   import {
      TJSTinyMCE,
      TinyMCEHelper }            from '#standard/component/fvtt/editor';

   export let elementRoot = void 0;

   /**
    * You can set a document to load / save content from given a `fieldName` in the format of `a.b.c`.
    * When you set a document you can also enable collaboration.
    *
    * The simplest example is:
    *
    * <TJSTinyMCE options={{document: <doc>, fieldName: 'some.data.path'}} />
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

      // button: true         // Show edit button to initialize editor; when false editor is open by default.
      // classes: ['foo', 'bar'],   // Adds additional classes to `.tjs-editor` element.
      // clickToEdit: true,  // Clicking editor content initializes the editor; hides the edit button.
      // editable: true,      // Explicitly enable / disable editing; default: user is GM or when a document is
                              // assigned the user has ownership.
      // enrichContent: true  // The default is true, but if you set it to false content is not enriched.
      // enrichOptions: {}    // Additional `TextEditor.enrichHTML` options. See: EnrichmentOptions

      /**
       * You can add specific fonts just for this editor by providing a {@link FontFamilyDefinition} object.
       * The object key is the name of the font to be displayed in the editor with the `FontFamilyDefinition` as the
       * value. For keys with spaces use 'quotes'. The URLS should point to a `woff2` file from your package.
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
               { urls: ['modules/essential-svelte-esm/assets/fonts/almendra-v15-latin-regular.woff2'] }
            ]
         },
         Audiowide: {
            editor: true,
            fonts: [
               { urls: ['modules/essential-svelte-esm/assets/fonts/audiowide-v9-latin-regular.woff2'] }
            ]
         }
      },

      // initialSelection: 'start', // The initial selection / cursor position: 'all', 'end', or 'start'.
      // keyCode: 'Enter',    // Defines the key event code to activate the editor when focused.
      // maxCharacterLength: 25, // Limits input to the number of characters; pasting is text only / any HTML stripped.

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
       * @see https://github.com/typhonjs-fvtt-lib/standard/blob/main/src/component/fvtt/editor/tinymce/TinyMCEHelper.js
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
       * @see https://github.com/typhonjs-fvtt-lib/standard/blob/main/src/component/fvtt/editor/tinymce/TJSTinyMCE.svelte
       */
      // styles: { '--tjs-editor-toolbar-background': 'red' }, // Apply any inline styles / CSS variables

      /**
       * {@link TinyMCEHelper.optionsSingleLine} is a special helper that defines not only `mceConfig`, but several
       * other options such as `saveOnEnter`,  `saveOnBlur`, to solve a single line entry use case. Take note that you
       * must use `...` / rest syntax to include it in options. Please see `TJSContentEdit` component as an
       * alternative inline editing component.
       */
      // ...TinyMCEHelper.optionsSingleLine(),
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
   <TJSTinyMCE {options}
                   bind:content
                   bind:enrichedContent
                   on:editor:cancel={() => console.log('! event - editor:cancel')}
                   on:editor:document:deleted={() => console.log('! event - editor:document:deleted')}
                   on:editor:enrichedContent={(event) => console.log(`! event - editor:enrichedContent - ${event.detail.enrichedContent}`)}
                   on:editor:save={(event) => console.log(`! event - editor:save - ${event.detail.content}`)}
                   on:editor:start={() => console.log('! event - editor:start')} />
                   <!-- Optionally, you can subscribe to the above events if desired -->
</ApplicationShell>
