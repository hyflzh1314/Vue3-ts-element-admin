<template>
    <div class="app-wrapper">
        <side-bar></side-bar>
        <app-main></app-main>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AppMain from './appMain/index.vue'
import SideBar from './sideBar/index.vue'
export default defineComponent({
    name: 'Layout',
    components: {
        AppMain,
        SideBar
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
    .app-wrapper {
        width: 100%;
        height: 100%;
    }
</style>
