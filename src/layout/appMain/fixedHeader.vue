<template>
    <div class="fixed-header">

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FixedHeader',
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
