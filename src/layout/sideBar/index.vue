<template>
	<div class="sidebar-container" :class="{'has-logo': is_show_logo}">
		<side-log></side-log>
		<el-scrollbar wrap-class="scrollbar-wrapper"> </el-scrollbar>
	</div>
</template>
<script lang="ts">
	import { defineComponent,computed } from "vue"
	import SideLog from "./sidebarLogo.vue"
	import { useStore } from 'vuex'
    import setting from "@/setting"
	export default defineComponent({
		name: "SideBar",
		components: {
			SideLog,
		},
		setup() {
            const is_show_logo = computed(() => setting.showSidebarLogo)
			const $store = useStore()
			// console.log($store.getters.menus)
            return {
                is_show_logo
            }
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
