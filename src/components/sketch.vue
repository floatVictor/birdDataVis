<template>
	<div class="canvas">
		<VueP5
			class="canvas"
			@setup="setup"
			@draw="draw"
			@keypressed="keypressed"
		/>
		<div class="controls">
			<dropDown
				label="Country"
				name="country"
				initValue="FR"
				v-bind:choices="countryCode"
				@country="receiveCountryValue"
			/>
			<dropDown
				label="Bird species"
				name="bird"
				initValue=""
				v-bind:choices="this.birdsData"
				@bird="receiveBirdValue"
			/>
			<sliderComp
				label="Minimum count filter (by specie)"
				name="minCountFilter"
				v-bind:range="[1, this.maxCount]"
				@minCountFilter="receiveMinCountFilterValue"
			/>
			<sliderComp
				label="Noise ratio"
				name="noiseRatio"
				v-bind:range="[1, 50]"
				@noiseRatio="receiveNoiseRatioValue"
			/>
			<sliderComp
				label="Noise amplitude"
				name="birdSpeed"
				v-bind:range="[0, 100]"
				@birdSpeed="receiveBirdSpeedValue"
			/>
			<buttonComp
				name="displayBirdParticule"
				text="Display particles"
				@displayBirdParticule="receiveDisplayBirdParticule"
			/>
			<buttonComp
				name="displayBirdLines"
				text="Display Lines"
				@displayBirdLines="receiveDisplayBirdLines"
			/>
		</div>
	</div>
</template>

<script>
import VueP5 from "vue-p5";
import dropDown from "./dropDown";
import sliderComp from "./sliderComp";
import buttonComp from "./buttonComp";
import Bird from "../Bird.js";
import countryCode from "../assets/countryCode.json";
// console.log(countryCode)

let longMin,
	longMax,
	latMin,
	latMax = 0;
let width = window.innerWidth;
let height = window.innerHeight;

export default {
	name: "myCanvas",
	data() {
		return {
			country: "FR",
			minCountFilter: "1",
			maxCount: "",
			countryCode: countryCode,
			birdsData: undefined,
			birdsList: [],
			noiseRatio: "0.0025",
			noiseSpeed: "0.0005",
			birdSpeed: "0.5",
			displayParticule: true,
			displayLines: true,
		};
	},
	components: {
		VueP5,
		dropDown,
		sliderComp,
		buttonComp,
	},
	methods: {
		//RECEIVE DATA
		receiveCountryValue(value) {
			this.country = value;
			this.birdsList = [];
			this.birdsData = [];
			fetch("https://api.ebird.org/v2/data/obs/" + value + "/recent", {
				method: "GET",
				headers: {
					"x-ebirdapitoken": "u0mb9n49a1an",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					//console.log(data);
					//console.log(data.length);
					this.getLatLongRange(data);
					this.maxCount = data[0].howMany;
					for (let i = 0; i < data.length; i++) {
						if (
							data[i].howMany != undefined &&
							data[i].comName != undefined &&
							data[i].sciName != undefined
						) {
							this.birdsList.push(
								new Bird(
									i,
									data[i].comName,
									data[i].sciName,
									this.map(
										parseFloat(data[i].lat),
										latMin,
										latMax,
										width * 0.2,
										width * 0.8
									),
									this.map(
										parseFloat(data[i].lng),
										longMin,
										longMax,
										height * 0.2,
										height * 0.8
									),
									data[i].howMany
								)
							);
						}
						if (data[i].howMany > this.maxCount)
							this.maxCount = data[i].howMany;
					}
					let birdsData = [];
					for (const _bird of data) {
						birdsData.push({ name: _bird.comName, code: _bird.speciesCode });
					}
					this.birdsData = birdsData;
				});
			//console.log(this.birdsList);
		},
		receiveBirdValue(value) {
			console.log(value);
			this.birdsList = [];
			this.maxCount = 0;
			fetch(
				"https://api.ebird.org/v2/data/obs/" +
					this.country +
					"/recent/" +
					value,
				{
					method: "GET",
					headers: {
						"x-ebirdapitoken": "u0mb9n49a1an",
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					console.log(data.length);
					this.getLatLongRange(data);
					for (let i = 0; i < data.length; i++) {
						this.birdsList.push(
							new Bird(
								i,
								data[i].comName,
								data[i].sciName,
								this.map(
									parseFloat(data[i].lat),
									latMin,
									latMax,
									width * 0.2,
									width * 0.8
								),
								this.map(
									parseFloat(data[i].lng),
									longMin,
									longMax,
									height * 0.2,
									height * 0.8
								),
								data[i].howMany
							)
						);
						if (data[i].howMany > this.maxCount)
							this.maxCount = data[i].howMany;
					}
					console.log(this.birdsList);
				});
		},

		receiveMinCountFilterValue(value) {
			this.minCountFilter = value;
			//console.log(this.minCountFilter);
		},

		receiveNoiseRatioValue(value) {
			this.noiseRatio = value / 10000;
			//console.log(this.minCountFilter);
		},

		receiveBirdSpeedValue(value) {
			this.birdSpeed = value / 100;
			//console.log(this.minCountFilter);
		},

		receiveDisplayBirdParticule(value) {
			this.displayParticule = value;
			//console.log(this.minCountFilter);
		},

		receiveDisplayBirdLines(value) {
			this.displayLines = value;
			//console.log(this.minCountFilter);
		},

		// CANVAS
		setup(sk) {
			// console.log("Canvas Setup")
			sk.createCanvas(width, height);
			this.receiveCountryValue("FR");
		},

		draw(sk) {
			//console.log(this.minCountFilter);
			sk.background(200);
			if (this.birdsList !== undefined && this.birdsList.length > 0) {
				if (this.displayLines) this.displayBirdsList(sk);
				for (let i = 0; i < this.birdsList.length; i++) {
					this.birdsList[i].update(
						sk,
						this.noiseRatio,
						this.noiseRatio,
						this.birdSpeed
					);
					if (this.displayParticule)
						this.birdsList[i].display(sk, this.minCountFilter);
				}
			}
			//sk.line(sk.pmouse, sk.pmouseY, sk.mouseX, sk.mouseY);
			// this.updateCountryCode()
			//sk.text(this.country, 20, 20);
			//sk.text(this.sTest, 20, 30);
		},

		keypressed(sk) {
			const key = String.fromCharCode(sk.keyCode);
			sk.print(key);
		},

		//UTIL FUNCTION
		getLatLongRange(data) {
			latMin = data[0].lat;
			latMax = data[0].lat;
			longMin = data[0].lng;
			longMax = data[0].lng;

			//console.log(latMin,latMax,longMin,longMax);

			for (let i = 0; i < data.length; i++) {
				if (data[i].lat < latMin) latMin = data[i].lat;
				if (data[i].lat > latMax) latMax = data[i].lat;
				if (data[i].lng < longMin) longMin = data[i].lng;
				if (data[i].lng > longMax) longMax = data[i].lng;
			}
			//console.log(latMin,latMax,longMin,longMax);
		},

		map(value, in_min, in_max, out_min, out_max) {
			return (
				((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
			);
		},

		//BIRDSLIST FUNCTION
		displayBirdsList(sk) {
			sk.strokeWeight(1);
			sk.stroke(0, 70 + this.birdsList.length * 0.2);
			sk.beginShape();
			sk.noFill();
			//console.log(this.minCountFilter);
			sk.vertex(this.birdsList[0].lat, this.birdsList[0].long);
			for (let i = 1; i < this.birdsList.length; i++) {
				///console.log(this.birdsList[i].count > 1);
				if (this.birdsList[i].count >= this.minCountFilter) {
					sk.vertex(this.birdsList[i].lat, this.birdsList[i].long);
				}
			}
			sk.endShape();
		},
	},
};
</script>

<style>
canvas {
	z-index: 10;
}
.controls {
	position: absolute;
	top: 60px;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	width: 250px;
	padding: 10px 10px;
}
</style>
