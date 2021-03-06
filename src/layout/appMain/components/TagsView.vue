<template>
	<div class="tags-view-box">
		<div class="tags-list">
			<el-tabs
				type="card"
				v-model="currentPath"
				@tab-click="tagsClick"
				@tab-remove="deleteRoute"
			>
				<el-tab-pane label="首页" name="/dashboard" :closable="false">
					首页
				</el-tab-pane>
				<el-tab-pane
					:key="item.fullPath"
					v-for="item in routerList"
					:label="item.title"
					:name="item.fullPath"
					:closable="true"
				>
					{{ item.title }}
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="tag-menus">
			<el-dropdown @command="handleCommand" @visible-change="isShow">
				<span class="el-dropdown-link">
					<i class="el-icon-menu" :class="{ 'is-active': isActive }"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item icon="el-icon-close" command="closeOther"
							>关闭其他</el-dropdown-item
						>
						<el-dropdown-item icon="el-icon-close" command="closeAll"
							>关闭全部</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref, reactive } from "vue";
	import { useRoute, useRouter, RouteMeta, RouteRecordName } from "vue-router";
	import { clearReactiveArray, removeTargetInArray } from "@/utils/validate";
	interface IRouteItem {
		fullPath: string;
		meta: RouteMeta;
		name: RouteRecordName | null | undefined;
		query?: any;
		params?: any;
		title?: string | unknown;
	}
	export default defineComponent({
		name: "TagsView",
		setup() {
			const router = useRouter();
			const route = useRoute();
			// 页面刷新时当前路由
			let initRoute: IRouteItem = {
				fullPath: route.fullPath,
				meta: route.meta,
				name: route.name,
				query: route.query,
				params: route.params,
				title: route.meta.title,
			};
			if (initRoute.meta.isSetTagTitle) {
				initRoute.title = initRoute.query.title || initRoute.params.title;
			}
			let routerList: IRouteItem[] = reactive([]);
			let homePath = "/dashboard"; //首页路由
			let prevPath = homePath;

			if (!route.meta.affix) {
				// 固定显示tag
				routerList.push(initRoute);
			}
			const filterArray = (arr: IRouteItem[], route: IRouteItem) => {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].fullPath === route.fullPath) {
						routerList[i] = route;
						return false;
					}
				}
				return true;
			};
			let currentPath = ref<string>(initRoute.fullPath);
			const tagsClick = (target: any) => {
				let targetName = target.paneName;
				currentPath.value = targetName;
				router.push(targetName);
			};
			const deleteRoute = (targetName: string) => {
				removeTargetInArray(routerList, "fullPath", targetName);
				if (routerList.length > 0) {
					prevPath = routerList[routerList.length - 1].fullPath;
				} else {
					prevPath = homePath;
				}
				if (targetName === currentPath.value) {
					//   删除当前tags时进行路由跳转
					router.push(prevPath);
				}
			};

			router.beforeResolve((to) => {
				let { fullPath, meta, name, query, params } = to;
				let title: string | unknown = "";
				if (meta.isSetTagTitle) {
					title = query.title || params.title;
				} else {
					title = meta.title;
				}
				const routeItem: IRouteItem = {
					fullPath,
					meta,
					name,
					query,
					params,
					title,
				};
				if (filterArray(routerList, routeItem) && meta.isTag && !meta.affix) {
					routerList.push(routeItem);
				}
				currentPath.value = fullPath;
				initRoute = routeItem;
			});

			// tag-menus handle
			const handleCommand = (command: string) => {
				if (command === "closeAll") {
					clearReactiveArray(routerList);
					currentPath.value = homePath;
					router.push(homePath);
				} else {
					if (currentPath.value === homePath) {
						// 处理当前路由为首页时
						clearReactiveArray(routerList);
					} else {
						clearReactiveArray(routerList);
						routerList.push(initRoute);
					}
				}
			};
			let isActive = ref<boolean>(false);
			const isShow = (status: boolean) => {
				isActive.value = status;
			};

			return {
				routerList,
				currentPath,
				tagsClick,
				deleteRoute,
				handleCommand,
				isShow,
				isActive,
			};
		},
	});
</script>
<style lang="scss" scoped>
.tags-view-box {
	position: relative;
	border-bottom: 1px solid #eee;
	background-color: #fff;
	padding: 0 40px 0 10px;
	overflow: hidden;

	.tags-list {
		font-size: 0;
		padding: 4px 0;
		:deep(.el-tabs__header) {
			border: none;
			margin: 0;
			.el-tabs__nav {
				border: none;
			}
			.el-tabs__nav-wrap {
				margin-bottom: 0;
			}
			.el-tabs__item {
				box-sizing: border-box;
				height: 32px;
				margin-right: 5px;
				line-height: 32px;
				border: 1px solid #dcdfe6;
				border-radius: 2.5px;
				transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
				&:hover {
					color: $tagColor;
					border-color: $tagColor;
				}
			}
			.is-active {
				color: $tagColor;
				border-color: $tagColor;
				background-color: rgba($tagColor, 0.18);
			}
			.el-tabs__nav-prev,
			.el-tabs__nav-next {
				line-height: 32px;
			}
		}
	}

	.tag-menus {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		transform-origin: center;
		.el-dropdown-link {
			.el-icon-menu {
				transition: transform 0.48s;
				font-size: 20px;
				cursor: pointer;
				color: #999;
			}
			.el-icon-menu.is-active {
				color: $tagColor;
				transform: rotate(90deg);
			}
		}
	}
}
</style>
