<script>
   import { ApplicationShell }   from '#runtime/svelte/component/application';

   export let elementRoot = void 0;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot scrollContainer={{ gutterStable: true }}>
   <main>
      <section class=tjs-panel-content>
         The standard library components expose several CSS variables for each component, but there are also a handful
         of optional global CSS classes providing essential style patterns that are configured out of the box to have
         useful defaults for dark / light theming and background colors that contrast with the standard components
         library. Additionally, these classes follow the standard Foundry layout constraints.
         <p>Presently these classes are:</p>
         <ul>
            <li>.tjs-panel-content</li>
            <li>.tjs-panel-content--flex-col</li>
            <li>.tjs-panel-content--flex-row</li>
            <li>.tjs-panel-legend</li>
         </ul>

         <p>This section element uses `.tjs-panel-content` as follows:</p>
         <pre>&lt;section class=tjs-panel-content&gt;&lt;/section&gt;
         </pre>
         <p>This CSS class has the following properties:</p>
         <pre>
background: var(--tjs-content-background);
border: var(--tjs-content-border);
border-radius: var(--tjs-panel-border-radius);
padding: var(--tjs-panel-padding);
         </pre>
         <p>
            `.tjs-panel-content--flex-row` and `.tjs-panel-content--flex-col` are additional classes defining standard
            flex arrangements matching core Foundry styles. You may concat them to the panel class as follows:
         </p>
         <pre>&lt;section class="tjs-panel-content tjs-panel-content--flex-row"&gt;&lt;/section&gt;
         </pre>
         <p>See the `Color Picker` demo for a standard component embedded in a similar section element showing the
            contrasting colors between the panel and component backgrounds.</p>
      </section>

      <fieldset class=tjs-panel-content>
         <legend class=tjs-panel-legend>A Legend Header</legend>
         A common pattern with core Foundry styles is a &lt;fieldset&gt; element with a child &lt;legend&gt; element,
         but the core Foundry styles only take effect when this &lt;fieldset&gt; is nested in another element using
         `.standard-form`. Svelte isn't necessarily form based like Handlebars and this style pattern simplifies
         matching core Foundry styles.

         <p>You may use `.tjs-panel-content` with a &lt;fieldset&gt; and `.tjs-panel-legend with &lt;legend&gt; to match
         the style of Foundry core without additional ceremony. This panel uses the following:
         <pre>

&lt;fieldset class=tjs-panel-content&gt;
   &lt;legend class=tjs-panel-legend>A Legend Header&lt;/legend&gt;
&lt;/fieldset&gt;
         </pre>
      </fieldset>
   </main>
</ApplicationShell>

<style lang=scss>
   main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }

   pre {
      margin: 0;
   }
</style>
