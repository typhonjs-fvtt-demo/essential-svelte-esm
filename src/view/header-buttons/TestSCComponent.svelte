<!-- Add null pointerdown / dblclick event handler to capture before header drag / minimize takes -->
<span on:pointerdown|capture|preventDefault|stopPropagation={() => null}
      on:dblclick|capture|preventDefault|stopPropagation={() => null}>
   SC
</span>

<style>
   span {
      flex: none;
      margin: 0 0 0 8px;
      cursor: default;
   }
</style>