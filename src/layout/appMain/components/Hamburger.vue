<template>
    <div class="hamburger-box" @click="toggleClick">
        <svg-icon
            class="hamburger-icon"
            :class="{'is-active':isActive}"
            iconClass="packup"
        >

        </svg-icon>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Hamburger',
    setup() {
        const isActive = ref(false)
        const toggleClick = () => {
            isActive.value = isActive.value?false:true
        }

        return {
            isActive,
            toggleClick
        }
    },
})
</script>
<style lang="scss" scoped>
    $headerColor: #009c89;

    .hamburger-icon {
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        font-weight: 600;
        transition: transform .2s;
    }
    .hamburger-icon.is-active {
        transform: rotateY(180deg);
    }
</style>