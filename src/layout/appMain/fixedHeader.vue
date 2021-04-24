<template>
	<div class="fixed-header" :class="{ 'is-opened': !isOpened }">
		<nav-bar />
		<template v-if="isShowTagsView">
			<tags-view />
		</template>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useStore } from "vuex";
	import NavBar from "./components/NavBar.vue";
	import TagsView from "./components/TagsView.vue";
	export default defineComponent({
		name: "FixedHeader",
		components: {
			NavBar,
			TagsView,
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
.fixed-header {
	height: 90px;
	width: calc(100% - 200px);
	transition: width 0.28s;
	position: fixed;
	right: 0;
	top: 0;
}
.fixed-header.is-opened {
	width: calc(100% - 50px) !important;
}
</style>
