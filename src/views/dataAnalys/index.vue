
<template>
	<div class="fruits-list">
		<el-table :data="fruitsList" border v-loading="listLoading" style="width: 100%">
			<el-table-column align="center" prop="id" label="ID" width="180"> </el-table-column>
			<el-table-column align="center" label="标题">
				<template #default="scope">
					<div class="table-link" @click="link(scope.row.id)">
						<span>{{ scope.row.title }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="价格">
				<template #default="scope">
					<span>{{ scope.row.price }}元/斤</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="级别">
				<template #default="scope">
					<span>{{ scope.row.type }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="来源">
				<template #default="scope">
					<span>{{ scope.row.from }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, reactive, onBeforeMount } from "vue";
	import { useRouter } from "vue-router"
	import { getList, IList } from "@/api/list";
	import { addReactiveArray, clearReactiveArray } from "@/utils/validate"
	export default defineComponent({
		name: "Analysis",
		setup() {
			const router = useRouter();


			let fruitsList = reactive<any []>([])
			let listLoading = ref<boolean>(false)
			const getFruitsList = async (param: IList) => {
				listLoading.value = true
				const res = await getList(param)
				const list = res.data && res.data.list
				clearReactiveArray(fruitsList)
				addReactiveArray(fruitsList, list)
				listLoading.value = false
				
				
			};
			onBeforeMount(() => {
				getFruitsList({ companyId: 1 });
			})
			

			const link = (id: number) => {
				router.push({
					path: `details/${id}`
				})
			}

			return {
				fruitsList,
				listLoading,
				link
			};
		},
	});
</script>
<style lang="scss" scoped>
.fruits-list {
	padding: 10px;
	background-color: #fff;
}
</style>
