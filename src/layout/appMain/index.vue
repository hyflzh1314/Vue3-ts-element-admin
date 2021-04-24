<template>
	<div
		class="app-main"
		:class="{ 'is-opened': !isOpened, 'is-show-tags-view': isShowTagsView }"
	>
		<fixed-header></fixed-header>
		<main-container></main-container>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useStore } from "vuex";
	import FixedHeader from "./FixedHeader.vue";
	import MainContainer from "./MainContainer.vue";
	export default defineComponent({
		name: "AppMain",
		components: {
			FixedHeader,
			MainContainer,
		},
		setup() {
			const store = useStore();
			const isOpened = computed(() => store.getters.sidebar.opened);
			const isShowTagsView = computed(() => store.state.setting.showTagsView);

			return {
				isOpened,
				isShowTagsView,
			};
		},
	});
</script>
<style lang="scss" scoped>
.app-main {
	min-height: 100%;
	transition: margin-left 0.28s;
	margin-left: 200px;
	position: relative;
	min-width: 1070px;
}
.app-main.is-opened {
	margin-left: 50px !important;
}
</style>
