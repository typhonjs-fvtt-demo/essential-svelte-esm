![template-svelte-esm](https://i.imgur.com/rmfWSrs.jpg)


[![TyphonJS Discord](https://img.shields.io/discord/737953117999726592?label=TyphonJS%20Discord)](https://discord.gg/mnbgN8f)
[![Twitch](https://img.shields.io/twitch/status/typhonrt?style=social)](https://www.twitch.tv/typhonrt)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MIT-yellowgreen.svg?style=flat)](https://github.com/typhonjs-fvtt-demo/template-svelte-esm/blob/main/LICENSE)

Provides a "Hello World" ES Modules template repo to get set up with using the the 
[TyphonJS Runtime Library](https://github.com/typhonjs-fvtt-lib/typhonjs) and [Svelte](https://svelte.dev/) on 
[Foundry VTT](https://foundryvtt.com/).

## About:
Getting started with a new library or development methodology can be difficult. This demo module 
provides the essentials with working with Svelte and various aspects that are provided with the TyphonJS Runtime 
Library. Please stop by the [![TyphonJS Discord](https://img.shields.io/discord/737953117999726592?label=TyphonJS)](https://discord.gg/mnbgN8f) 
Discord server to ask any questions.

## Installation:
1. Create your version of the template in a new repo by clicking on the "template" button above. 
2. Use WebStorm or VSCode to clone your repo into the Foundry VTT data / modules directory (make sure to keep the name 
`template-svelte-esm` as the folder installed in your module directory).
3. Open in your IDE and proceed to run `npm install` 
4. Run the NPM script `build` or for constant development `build-watch` (this builds and bundles the module to 
`./dist`.)
5. Restart Foundry VTT. This is necessary for Foundry to load the new module.
6. You should now have a new module installed `Template Svelte (ESM)` visible in your modules list.
7. Launch a game / world of your choice. 
8. Enable `Template Svelte (ESM)` under `Manage Modules`.
9. On reload the Hello Foundry UI will transition in with a scaling transition.

## Snapshot:
![template-svelte-esm](https://i.imgur.com/HMnxa4u.jpg)

## What Is Happening Here?
- The message input box is bound to the top title. Type in a new message to see it dynamically update the title from 
`Hello Foundry`.
- Clicking on the `Launch a modal dialog` button shows off the really neat modal dialog capability of TRL. This creates 
a dialog using a "glasspane" approach that prevents users from interacting with the rest of the Foundry UI without 
causing Foundry itself to pause. (`TJSDialog.prompt`)
- The checkboxes for `draggable`, `minimizable` and `resizable` show a few of the reactive Application options that 
can be dynamically changed during runtime. If you click off 'draggable' the application window is no longer draggable; 
likewise turn off minimizable prevents the window from being minimized when clicking the title bar. Clicking off 
resizable dynamically turns off the resize capability of the window. There are several additional standard application 
options that are reactive with TRL application shells.
- At the bottom are a couple of resources for you to start your learning adventure about Svelte. The interactive Svelte
tutorial is highly recommended and well put together and goes through the core concepts of working with Svelte that you 
can apply to your usage of TRL. 

## About the TyphonJS Runtime Library:
The TyphonJS Runtime Library (TRL) brings an exciting new library resource for all Foundry VTT developers to build
advanced modules and game systems using Svelte. A Svelte UI component library built for Foundry and extensions to the 
core Foundry UI / Application framework make it easy to create declarative Svelte based UIs in a method familiar to 
Foundry VTT developers. The core UI component framework contains reactive "application shells" that provide an enhanced
ability to control your UI / window experience including intro and outro transitions along with support key UI elements
like context menus and a new backward compatible and API compliant Dialog component that features a modal dialog option.

TRL is innovative as it delivers a runtime library module for Foundry that packages up the runtime in a way that
can be shared across any number of modules / game systems utilizing it thereby saving a lot of space in any given
module or game system. Optionally, it is possible to also bundle TRL directly into your module or game system. The TRL
is both a Foundry library module and an NPM package providing the development dependency utilized for code 
