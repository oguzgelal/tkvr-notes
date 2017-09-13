<template>
  <div class="dd-editor" id="dd-editor" contenteditable="true" v-on:keydown="kd()">
  </div>
</template>

<script>
import TextCompiler from '../../utils/TextCompiler';

export default {
  name: 'hello',
  methods: {
    kd() {
      var txt = document.getElementById('dd-editor').innerText;
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
