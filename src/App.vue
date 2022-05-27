<template>
	<div id="app">
		<HeaderComp />
		<sketch />
		<FooterComp />
	</div>
</template>

<script>
import sketch from "@/components/sketch.vue";
import HeaderComp from "./components/headerComp.vue";
import FooterComp from "./components/footerComp.vue";

export default {
	name: "App",
	components: {
		sketch,
		HeaderComp,
		FooterComp,
	},
};
</script>

<style>
#app {
	overflow: hidden;
	display: flex;
	flex-direction: column;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: rgb(83, 83, 83);
}
</style>
