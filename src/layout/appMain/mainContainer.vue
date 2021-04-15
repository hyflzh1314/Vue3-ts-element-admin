<template>
	<section class="main-container">
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</section>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
    import { useRoute } from 'vue-router'
	export default defineComponent({
		name: "MainContainer",
		setup() {

            const $route = useRoute()

            const key = computed(() => $route.path)

            return {
                key
            }
        },
	});
</script>
<style lang="scss" scoped>
.main-container {
	width: 100%;
	min-height: 100vw;
	overflow: hidden;
	background-color: #fff;
	padding: 90px 20px 20px;
	border: 1px solid red;
}
</style>
