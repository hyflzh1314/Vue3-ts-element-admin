<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
     <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { login } from '@/api/login'
// import Button from 'element-plus'
export default defineComponent({
  name: 'Home',
  setup(props, ctx) {
    login({
      user: 'lzh'
    }).then((res) => {
      console.log(res)
    })
  }
});
</script>
