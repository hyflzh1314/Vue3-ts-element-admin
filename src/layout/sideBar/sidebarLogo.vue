<template>
	<div class="sidebar-logo-container">
		<transition name="sidebarLogoFade">
			<router-link key="expand" class="sidebar-logo-link" to="/">
				<h1 v-if="isShowTitle" class="side-log-title">{{ title }}</h1>
			</router-link>
		</transition>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useStore } from "vuex";
	import setting from "@/setting";
	export default defineComponent({
		name: "SidebarLogo",
		setup() {
			const store = useStore();
			const title = computed(() => setting.title);
			const isShowTitle = computed(() => store.getters.sidebar.opened)
			return {
				title,
				isShowTitle
			};
		},
	});
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
	transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}

.sidebar-logo-container {
	width: 100%;
	height: 50px;
	overflow: hidden;
	line-height: 50px;
	color: #fff;
	text-align: center;
	background-color: #2b2f3a;
	.sidebar-logo-link {
		display: block;
		width: 100%;
	}
	.side-log-title {
		font-size: 14px;
		font-weight: 600;
	}
}
</style>
