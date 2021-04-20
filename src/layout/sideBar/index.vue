<template>
	<div class="sidebar-container" :class="{ 'has-logo': isShowLogo }">
		<side-log></side-log>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu" 
				:collapse="isCollapse"
				:unique-opened="false"
			 	mode="vertical" 
			 	background-color="#304156"
			  	text-color="#ffffff"
				active-text-color="#409eff"
			  >
				<sidebar-item
					v-for="menu in menus"
					:key="menu.path"
					:item="menu"
					:base-path="menu.path"
					:is-collapse="isCollapse"
				/>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed, ref } from "vue";
	import SideLog from "./SidebarLogo.vue";
	import SidebarItem from "./SidebarItem.vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router"
	import setting from "@/setting";
	export default defineComponent({
		name: "SideBar",
		components: {
			SideLog,
			SidebarItem,
		},
		setup() {
			const $store = useStore();
			const menus = $store.getters.menus;

			const $route = useRoute();
			const activeMenu = computed(() => {
				const { path }= $route
				return path
			})
			const isShowLogo = computed(() => setting.showSidebarLogo);
			const isCollapse = ref(false);
			
			
			return {
				menus,
				activeMenu,
				isShowLogo,
				isCollapse,
			};
		},
	});
</script>
<style lang="scss">
.sidebar-container {
	width: 200px;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	overflow: hidden;
	background-color: #304156;
	transition: width 0.28s;

	.scrollbar-wrapper {
		overflow-x: hidden !important;
	}
	.el-scrollbar__view {
		height: 100%;
	}
}
</style>
<style scoped lang="scss">
.el-scrollbar {
	height: 100%;
}

.has-logo {
	.el-scrollbar {
		height: calc(100% - 50px);
	}
}

.el-menu {
	border: none;
	height: 100%;
	width: 100% !important;
}
</style>
