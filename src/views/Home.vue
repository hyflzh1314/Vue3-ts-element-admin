<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { login } from '@/api/login'

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
