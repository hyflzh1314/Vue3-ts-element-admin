<template>
	<div class="dashboard">
		{{ text }}
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref } from "vue";
	export default defineComponent({
		name: "Dashboard",
		setup() {
			const text = ref<string>("dashboard");
			return {
				text,
			};
		},
	});
</script>
<style lang="scss" scoped>
</style>
