<template>
    <div class="nav-bar">
        <hamburger></hamburger>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Hamburger from './Hamburger.vue'
export default defineComponent({
    name: 'NavBar',
    components: {
        Hamburger
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
    $headerColor: #009c89;

    .nav-bar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: $headerColor;
        color: #fff;

        .hamburger-box {
            float: left;
            padding: 0px 15px;
            line-height: 50px;
            cursor: pointer;
        }
    }
</style>