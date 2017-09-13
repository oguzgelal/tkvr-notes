<template>
  <div class="dd-editor" id="dd-editor" contenteditable="true" v-on:keydown="kd()">
    <h1>Editor is here</h1>
  </div>
</template>

<script>
import TextCompiler from '../../utils/TextCompiler';

export default {
  name: 'hello',
  methods: {
    kd() {
      var txt = document.getElementById('dd-editor').innerText;
      console.log('text', txt);
      TextCompiler.compile(txt);
    }
  }
};
</script>

<style scoped>
.dd-editor {
  padding: 20px;
  height: 800px;
}
</style>
