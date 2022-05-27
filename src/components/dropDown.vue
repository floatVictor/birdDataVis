<template>
	<div class="container">
		<p>{{ label }}</p>
		<div class="select">
			<select v-model="value" @change="sendValue($event)" class="dropDown">
				<option disabled>Choisissez</option>
				<option
					v-for="choice in choices"
					:key="choice.name"
					:value="choice.code"
				>
					{{ choice.name }}
				</option>
			</select>
			<div class="select_arrow"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "dropDown",
	props: {
		label: String,
		name: String,
		initValue: String,
		choices: Array,
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
	mounted: function () {
		//console.log(this.choices);
		this.value = this.initValue;
	},
};
</script>

<style>
p {
	text-align: left;
	font-family: "Arial";
	font-size: 14px;
	margin-bottom: 2px;
}
.select {
	position: relative;
	display: inline-block;
	margin-bottom: 10px;
	width: 100%;
}
.select select {
	font-family: "Arial";
	font-size: 12px;
	display: inline-block;
	width: 100%;
	cursor: pointer;
	padding: 2px 7px;
	outline: 0;
	border: 1px solid #b1aaaa;
	border-radius: 0px;
	background: #e6e6e6;
	color: #5e90f2;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
}
.select select::-ms-expand {
	display: none;
}
.select select:hover,
.select select:focus {
	color: #3e5fa3;
	background: #cccccc;
}
.select select:disabled {
	opacity: 0.5;
	pointer-events: none;
}
.select_arrow {
	position: absolute;
	top: 7px;
	right: 15px;
	pointer-events: none;
	border-style: solid;
	border-width: 8px 5px 0px 5px;
	border-color: #7b7b7b transparent transparent transparent;
}
.select select:hover ~ .select_arrow,
.select select:focus ~ .select_arrow {
	border-top-color: #000000;
}
.select select:disabled ~ .select_arrow {
	border-top-color: #cccccc;
}
</style>
