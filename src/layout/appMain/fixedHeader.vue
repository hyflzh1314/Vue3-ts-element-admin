<template>
    <div class="fixed-header" :class="{'is-opened': !isOpened}">
        <nav-bar>
            
        </nav-bar>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'
export default defineComponent({
    name: 'FixedHeader',
    components: {
        NavBar
    },
    setup() {
        const store = useStore()
        const isOpened = computed(() => store.getters.sidebar.opened)
        return {
            isOpened
        }
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
    .fixed-header.is-opened {
        width: calc(100% - 50px) !important;
    }
</style>
