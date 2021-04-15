<template>
    <div class="app-main">
        <fixed-header></fixed-header>
        <main-container></main-container>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import FixedHeader from './fixedHeader.vue'
import MainContainer from './mainContainer.vue'
export default defineComponent({
    name: 'AppMain',
    components: {
        FixedHeader,
        MainContainer
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
    .app-main {
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: 200px;
        position: relative;
        min-width: 1070px;
    }
</style>
