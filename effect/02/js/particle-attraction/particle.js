function Particle(x,y){
	// 위치를 100vw, 100vh 기준으로 넓게 랜덤 배치
	this.pos = createVector(
		(typeof x === 'number' ? x : random(windowWidth)),
		(typeof y === 'number' ? y : random(windowHeight))
	);
	this.prev = createVector(this.pos.x, this.pos.y);
	this.vel = createVector();
	this.acc = createVector();
	// 크기: 아주작은(1~2), 조금작은(2.1~3), 중간작은(3.1~4)
	var sizeRand = random();
	if (sizeRand < 0.5) this.w = random(1, 2);           // 아주작은
	else if (sizeRand < 0.85) this.w = random(2.1, 3);   // 조금작은
	else this.w = random(3.1, 4);                        // 중간작은
	// 검정 배경에 잘 보이는 쨍한 색상 팔레트
	var colorPalette = [
		'#00ffff', // cyan
		'#ff00ff', // magenta
		'#ffff00', // yellow
		'#ff8000', // orange
		'#00ff00', // lime
		'#ff0000', // red
		'#00aaff', // blue
		'#ffffff', // white
		'#ffd700', // gold
		'#39ff14', // neon green
		'#ff1493', // deep pink
		'#1e90ff'  // dodger blue
	];
	this.color = colorPalette[Math.floor(random(colorPalette.length))];

	this.show = function(){
		noStroke();
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.w, this.w);
	}

	this.update = function(){
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	this.attractedBy = function(attractor){
		var attractorPos = createVector(attractor.pos.x, attractor.pos.y);
		var force = p5.Vector.sub(attractorPos, this.pos);
		var dsquared = force.magSq();
		dsquared = constrain(dsquared, 100, 500);
		var strength = (this.w + attractor.w)*G / dsquared;
		force.setMag(strength);
		this.acc.add(force);
	}

	this.repulsedBy = function(repulsor){
		var repulsorPos = createVector(repulsor.pos.x, repulsor.pos.y);
		var force = p5.Vector.sub(repulsorPos, this.pos);
		var dsquared = force.magSq();
		var strength = (this.w + repulsor.w)*G / dsquared;
		force.setMag(-strength);
		this.acc.add(force);
	}

}
