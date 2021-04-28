<template>
	<div class="breadcrumb-box">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
				<span
					v-if="
						item.redirect === 'noredirect' || index === breadcrumbs.length - 1
					"
					class="no-redirect"
					>{{ item.meta.title }}</span
				>
				<span class="is-link" v-else @click.prevent="handleLink(item)">{{
					item.meta.title
				}}</span>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script lang="ts">
	import { defineComponent, reactive } from "vue";
	import { useRoute, useRouter, RouteRecordNormalized } from "vue-router";
	import { addReactiveArray, clearReactiveArray } from "@/utils/validate";
	export default defineComponent({
		name: "Breadcrumb",
		setup() {
			const route = useRoute();
			const router = useRouter();
			let breadcrumbs = reactive<RouteRecordNormalized[]>([]);
			const getMached = (route: any) => {
				let matched = route.matched.filter((item) => item.meta && item.meta.title);
				clearReactiveArray(breadcrumbs);
				addReactiveArray(breadcrumbs, matched);
			} 
            const isDashboard = (route: any) => {
                    const name = route && route.name
                    if (!name) {
                        return false
                    }
                    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
            };
			if(!isDashboard(route)) {
				getMached(route)
			}
			router.beforeResolve((to) => {
				getMached(to)
			});

			const handleLink = (route: any) => {
				let { name, path, query, params } = route;
				if (params && Object.keys(params).length > 0) {
					router.push({
						name,
						params,
					});
				} else if (query && Object.keys(query).length > 0) {
					router.push({
						path,
						params,
					});
				} else {
                    router.push(path);
                }
				
			};

			return {
				breadcrumbs,
				handleLink,
			};
		},
	});
</script>
<style lang="scss" scoped>
.el-breadcrumb {
	line-height: 50px;

	:deep(.el-breadcrumb__item) {
		.is-link {
			color: #fff !important;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
		.no-redirect {
			color: #ddd;
		}
	}
}
</style>
