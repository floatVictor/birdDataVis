let maxSize = 100;
let minSize = 5;
let minOpa = 30;

export default class Bird {
	constructor(id, specie, sciName, lat, long, count) {
		this.id = id;
		this.specie = specie;
		this.sciName = sciName;
		this.lat = lat;
		this.long = long;
		this.count = count;
		this.angle;
		if (this.count > maxSize) this.size = maxSize;
		else if (this.count < minSize) this.size = minSize;
		else this.size = this.count;
	}

	update(sk, noiseRatio, noiseSpeed, speed) {
		this.angle =
			sk.noise(
				this.lat * noiseRatio,
				this.long * noiseRatio,
				(sk.frameCount + this.id * 100) * noiseSpeed
			) * 360;

		this.lat += speed * sk.cos(this.angle);
		this.long += speed * sk.sin(this.angle);
	}

	display(sk, minCount) {
		if (this.count >= minCount) {
			sk.noStroke();
			sk.fill(0, 255, 0, minOpa + this.size * 1.8);
			sk.push();
			sk.translate(this.lat, this.long);
			sk.circle(0, 0, this.size);
			sk.fill(0, 100 + this.size * 15);
			sk.textSize(6 + this.size * 0.1);
			sk.text("nb : " + this.count.toString(), 3, +7 + this.size * 0.1);
			sk.textSize(8 + this.size * 0.1);
			sk.text(this.sciName, 0, 0);
			sk.pop();
		}
	}
}
