<template>
	<div class="user-set-box">
		<el-dropdown
			@command="handleCommand"
			:hide-on-click="false"
		>
			<span class="el-dropdown-link">
				<span class="user-name">{{ name }}</span>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useStore } from "vuex";
	import { useRouter } from "vue-router";
	import { ElMessageBox } from "element-plus";
	export default defineComponent({
		name: "UserSet",
		setup() {
			const store = useStore();
			const router = useRouter();
			const name = computed(() => store.getters.name);
			const handleCommand = (command: string) => {
				if (command === "logout") {
					ElMessageBox.confirm("确认退出系统吗？", "提示", {
						confirmButtonText: "确认",
						cancelButtonText: "取消",
						type: "warning",
					}).then(() => {
						store.dispatch("user/logout").then(() => {
							router.push({
								path: "/login",
							});
							// location.reload()
						});
					});
				}
			};
			return {
				name,
				handleCommand,
			};
		},
	});
</script>
<style lang="scss" scoped>
.el-dropdown-link {
	cursor: pointer;
	color: #ffffff;
}
</style>
