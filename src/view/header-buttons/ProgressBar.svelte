<!-- Add null dblclick event handler to capture before header minimize takes -->
<progress class=keep-minimized max=100
          on:pointerdown|capture|preventDefault|stopPropagation={() => null} />

<style>
   progress {
      height: 30px;
      margin: 0 0 0 8px;
      cursor: default;
   }
</style>