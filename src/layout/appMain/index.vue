<template>
    <div class="app-main" :class="{'is-opened': !isOpened}">
        <fixed-header></fixed-header>
        <main-container></main-container>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import FixedHeader from './FixedHeader.vue'
import MainContainer from './MainContainer.vue'
export default defineComponent({
    name: 'AppMain',
    components: {
        FixedHeader,
        MainContainer
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
    .app-main {
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: 200px;
        position: relative;
        min-width: 1070px;
    }
    .app-main.is-opened {
        margin-left: 50px !important;
    }
</style>
