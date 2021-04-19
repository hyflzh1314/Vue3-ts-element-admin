<template>
	<div v-if="!item.meta || !item.meta.hidden">
		<template
			v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
		>
			<sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
				<el-menu-item
					:index="resolvePath(theOnlyOneChild.path)"
					:class="{ 'submenu-title-noDropdown': isFirstLevel }"
				>
					<svg-icon
						v-if="theOnlyOneChild.meta.icon"
						:iconClass="theOnlyOneChild.meta.icon"
					/>
					<template v-slot:title>
						<span v-if="theOnlyOneChild.meta.title">{{
							theOnlyOneChild.meta.title
						}}</span>
					</template>
				</el-menu-item>
			</sidebar-item-link>
		</template>
		<el-submenu v-else :index="resolvePath(item.path)">
			<template v-slot:title>
				<svg-icon
					v-if="item.meta && item.meta.icon"
					:iconClass="item.meta.icon"
				/>
				<span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
			</template>
			<template v-if="item.children">
				<sidebar-item
					v-for="child in item.children"
					:key="child.path"
					:item="child"
					:is-collapse="isCollapse"
					:is-first-level="false"
					:base-path="resolvePath(child.path)"
					class="nest-menu"
				/>
			</template>
		</el-submenu>
	</div>
</template>
<script lang="ts">
	import { defineComponent, PropType, computed } from "vue"
	import path from 'path'
	import { RouteRecordRaw, RouteMeta } from "vue-router"
	import SidebarItemLink from "./SidebarItemLink.vue"
	import { isExternal } from "@/utils/validate"
	export default defineComponent({
		name: "SidebarItem",
		components: {
			SidebarItemLink,
		},
		props: {
			item: Object as PropType<RouteRecordRaw>,
			isCollapse: {
				type: Boolean,
				default: false,
			},
			isFirstLevel: {
				type: Boolean,
				default: false,
			},
			basePath: {
				type: String,
				default: false,
			},
		},
		setup(props: any, ctx) {
			const alwaysShowRootMenu = computed(() => {
				if (props.item.meta && props.item.meta.alwaysShow) {
					return true;
				}
				return false;
			});
			const showingChildNumber = computed(() => {
				if (props.item.children) {
					const showingChildren = props.item.children.filter(
						(item: RouteRecordRaw) => {
							if (item.meta && item.meta.hidden) {
								return false;
							} else {
								return true;
							}
						}
					);
					return showingChildren.length;
				}
				return 0;
			});

			const theOnlyOneChild = computed(() => {
				if (showingChildNumber.value > 1) {
					return null;
				}
				if (props.item.children) {
					for (const child of props.item.children) {
						if (!child.meta || !child.meta.hidden) {
							return child;
						}
					}
				}
				return { ...props.item, path: "" };
			});
			const resolvePath = (routePath:string) => {
				if (isExternal(routePath)) {
					return routePath;
				}
				if (isExternal(props.basePath)) {
					return props.basePath;
				}
				return path.resolve(props.basePath, routePath);
			};
			return {
				alwaysShowRootMenu,
				showingChildNumber,
				theOnlyOneChild,
				resolvePath
			};
		},
	});
</script>
<style lang="scss" scoped>
.svg-icon {
	margin-right: 10px;
	color: #fff;
	font-size: 18px;
	font-weight: 600;
}
</style>
