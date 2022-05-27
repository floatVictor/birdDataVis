<template>
	<button
		class="buttonComp button"
		@click="toggle()"
		:class="{ active: isActive }"
	>
		{{ this.text }}
	</button>
</template>

<script>
export default {
	name: "buttonComp",
	props: {
		name: String,
		text: String,
	},
	data() {
		return {
			isActive: false,
		};
	},
	methods: {
		toggle() {
			this.isActive = !this.isActive;
			this.$emit(this.name, this.isActive);
		},
		// sendValue() {
		// 	this.$emit(this.name, this.value);
		// },
	},
};
</script>

<style>
.button {
	color: #5e90f2 !important;
	font-size: 13px;
	padding: 3px 15px;
	border: 1px solid #5e90f2;
	background: #e6e6e6;
	cursor: pointer;
	margin-top: 12px;
	margin-bottom: 0px;
}
.button:hover {
	color: #ffffff !important;
	background: #3e5fa3;
}
.active {
	color: #ffffff !important;
	background: #5e90f2;
}
</style>
