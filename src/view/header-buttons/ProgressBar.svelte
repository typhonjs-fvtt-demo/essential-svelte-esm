<!-- Add null mousedown / dblclick event handler to capture before header drag / minimize takes -->
<progress class=keep-minimized max=100
          on:mousedown|capture|preventDefault|stopPropagation={() => null}
          on:dblclick|capture|preventDefault|stopPropagation={() => null} />

<style>
   progress {
      height: 30px;
      margin: 0 0 0 8px;
      cursor: default;
   }
</style>