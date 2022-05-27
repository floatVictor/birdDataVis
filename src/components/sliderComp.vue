<template>
	<div class="container">
		<p>{{ label }}</p>
		<input
			v-model="value"
			type="range"
			id="volume"
			name="volume"
			:min="this.range[0]"
			:max="this.range[1]"
			@input="sendValue($event)"
			class="sliderComp"
		/>
	</div>
</template>

<script>
export default {
	name: "sliderComp",
	props: {
		label: String,
		name: String,
		range: Array,
	},
	data() {
		return {
			value: undefined,
		};
	},
	methods: {
		sendValue() {
			this.$emit(this.name, this.value);
		},
	},
};
</script>

<style>
.container {
	width: 100%;
}
.sliderComp {
	-webkit-appearance: none;
	width: 100%;
	height: 2px;
	background-color: #818181;
	outline: none;
	opacity: 0.7;
	margin: 3px;
	cursor: pointer;
}
</style>
