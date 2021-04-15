<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :href="iconName" />
    </svg>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ""
        }
    },
    setup(props, ctx) {

        const svgClass = computed(() => {
            if (props.className) {
                return 'svg-icon ' + props.className
            } else {
                return 'svg-icon'
            }
        })

        const iconName = computed(() => `#icon-${props.iconClass}`)

        return {
            svgClass,
            iconName
        }
    }
});
</script>

<style lang="scss" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
