<template>
	<div class="nav-bar">
		<hamburger />
		<user-set />
	</div>
</template>
<script lang="ts">
	import { defineComponent } from "vue";
	import Hamburger from "./Hamburger.vue";
	import UserSet from "./UserSet.vue";
	export default defineComponent({
		name: "NavBar",
		components: {
			Hamburger,
			UserSet,
		},
	});
</script>
<style lang="scss" scoped>
$headerColor: #009c89;

.nav-bar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: $headerColor;
	color: #fff;

	.hamburger-box {
		float: left;
		padding: 0px 15px;
		line-height: 50px;
		cursor: pointer;
	}
	.user-set-box {
		padding: 0px 15px;
		float: right;
		line-height: 50px;
	}
}
</style>