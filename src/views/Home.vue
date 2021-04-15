<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
     <el-button type="success">成功按钮</el-button>
     <svg-icon iconClass="username"></svg-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup(props, ctx) {
    
  }
});
</script>
