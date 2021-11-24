import BasicApplication from './view/basic/BasicApplication.js';

Hooks.once('ready', () => new BasicApplication().render(true));