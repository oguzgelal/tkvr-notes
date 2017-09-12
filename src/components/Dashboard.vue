<template>
  <editor>
  </editor>
</template>

<script>

import Editor from './editor/Editor.vue';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    'editor': Editor
  }
};
</script>

<style scoped>
</style>
