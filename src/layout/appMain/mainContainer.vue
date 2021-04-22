<template>
	<section class="main-container">
		<router-view v-slot="{ Component }">
			<transition name="fade-transform" mode="out-in">
				<keep-alive>
					<component :is="Component" :key="key" />
				</keep-alive>
			</transition>
		</router-view>
	
	</section>
</template>
<script lang="ts">
	import { defineComponent, computed } from 'vue';
    import { useRoute } from 'vue-router'
	export default defineComponent({
		name: 'MainContainer',
		setup() {

            const route = useRoute()
            const key = computed(() => route.path)

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
	background-color: #f0f0f0;
	padding: 50px 20px 20px;
}
.is-show-tags-view .main-container {
	padding-top: 90px;
}
</style>
