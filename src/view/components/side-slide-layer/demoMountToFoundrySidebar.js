import { TJSSideSlideLayer }  from '#standard/component';

import { createLayerProps }   from './createLayerProps.js';

/**
 * This is a demo of how you would mount the TJSSideSlideLayer to the right side of the `#ui-middle` core Foundry UI.
 */
Hooks.on('ready', () =>
{
   new TJSSideSlideLayer({
      target: document.querySelector('#ui-middle'),
      props: createLayerProps()
   });
});
