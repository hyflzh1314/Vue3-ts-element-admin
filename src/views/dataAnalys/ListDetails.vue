<template>
	<div class="fruits-details">
		<p>title:{{ title }}</p>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useRoute } from "vue-router";
	export default defineComponent({
		name: "ListDetails",
		setup() {
			const route = useRoute();
			const title = computed(() => route.query.title);
			return {
				title,
			};
		},
	});
</script>
<style lang="scss" scoped>
</style>