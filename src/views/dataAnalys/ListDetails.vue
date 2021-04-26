<template>
	<div class="fruits-details">
		<p>id:{{ id }}</p>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useRoute } from "vue-router";
	export default defineComponent({
		name: "ListDetails",
		setup() {
			const route = useRoute();
			const id = computed(() => route.params.id);
			return {
				id,
			};
		},
	});
</script>
<style lang="scss" scoped>
</style>