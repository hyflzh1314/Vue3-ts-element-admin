<template>
  <div>
    <h2>v-permission自定义指令</h2>
    <ul>
      <li>
        <span>admin:</span>
        <el-button type="primary" v-permission="['admin', 'editor']">Admin</el-button>
		 <span>editor:</span>
        <el-button type="primary" v-permission="['editor']">Editor</el-button>
		 <span>visitor:</span>
        <el-button type="primary" v-permission="['visitor']">visitor</el-button>
		<span>无权限</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Role",
});
</script>
<style lang="scss" scoped>
</style>
