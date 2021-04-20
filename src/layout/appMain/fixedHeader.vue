<template>
    <div class="fixed-header">
        <nav-bar>
            
        </nav-bar>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
export default defineComponent({
    name: 'FixedHeader',
    components: {
        NavBar
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
    .fixed-header {
        height: 90px;
        width: calc(100% - 200px);
        transition: width .28s;
        position: fixed;
        right: 0;
        top: 0;
        border: 1px solid red;
    }
</style>
