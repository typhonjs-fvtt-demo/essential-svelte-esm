import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import EmbeddedDocAppShell    from './EmbeddedDocAppShell.svelte';

export default class EmbeddedDocApplication extends SvelteApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {}) { super(options); }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-embedded-doc-test',
         resizable: false,
         minimizable: true,
         width: 'auto',
         height: 'auto',
         title: 'Embedded Doc - Test',

         svelte: {
            class: EmbeddedDocAppShell,
            target: document.body
         }
      });
   }

   onSvelteMount({element, elementContent, elementTarget} = {})
   {
      console.log(`! this.options.svelte: `, this.options.svelte)
   }
}