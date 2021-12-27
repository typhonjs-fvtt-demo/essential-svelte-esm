import MenuApplication from './view/MenuApplication.js';

Hooks.once('ready', () => {
   const sidebarRect = document.querySelector('#sidebar').getBoundingClientRect();
   new MenuApplication({ left: sidebarRect.x - 210, top: sidebarRect.y }).render(true, { focus: true });
});