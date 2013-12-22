var w = 500;
var h = 100;

function circles() {
	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)

	svg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", w)
		.attr("height", h)
		.attr("fill", "red")


	var dataset = [5, 10, 15, 20, 25];

	var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle");

	circles
		.attr("cx", function(d, i) {
			return (i * 50) + 25;
		})
		.attr("cy", h / 2)
		.attr("r", function(d) {
			return d;
		})
		.attr("class", "pumpkin");
}

function bars() {
	var barPadding = 2;

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
		11, 12, 15, 20, 18, 17, 16, 18, 23, 25
	];

	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return i * (w / dataset.length);
		})
		.attr("y", function(d, i) {
			return h - d * 4
		})
		.attr("width", w / dataset.length - barPadding)
		.attr("height", function(d, i) {
			return d * 4
		})
		.attr("fill", function(d) {
			return "rgb(0, 0, " + (d * 10) + ")";
		});

	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) {
			return d;
		})
		.attr("x", function(d, i) {
			return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
		})
		.attr("y", function(d) {
			return h - (d * 4) + 14;
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", "white")
		.attr("text-anchor", "middle")
}

function circlesComplexData() {
	var dataset = [
		[5, 20],
		[480, 90],
		[250, 50],
		[100, 33],
		[330, 95],
		[410, 12],
		[475, 44],
		[25, 67],
		[85, 21],
		[220, 88]
	];

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle");

	circles
		.attr("cx", function(d, i) {
			return d[0];
		})
		.attr("cy", function(d, i) {
			return d[1];
		})
		.attr("r", function(d) {
			return 5;
		});

	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x", function(d, i) {
			return d[0];
		})
		.attr("y", function(d, i) {
			return d[1];
		})
		.text(function(d) {
			return d[0] + "," + d[1];
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", "red");
}

function circlesScale() {
	var w = 500;
	var h = 300;
	var padding = 30;

	var dataset = getRandomScaleDataset();

	var xScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {
			return d[0];
		})])
		.range([padding, w - padding * 2]);

	var yScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {
			return d[1];
		})])
		.range([h - padding, padding]);

	var rScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {
			return d[1];
		})])
		.range([2, 5]);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle");

	circles
		.attr("cx", function(d) {
			return xScale(d[0]);
		})
		.attr("cy", function(d) {
			return yScale(d[1]);
		})
		.attr("r", function(d) {
			return rScale(d[1]);
		});
	/*
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x", function(d, i) {
			return xScale(d[0]);
		})
		.attr("y", function(d, i) {
			return yScale(d[1]);
		})
		.text(function(d) {
			return d[0] + "," + d[1];
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", "red");
*/
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(5);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, " + (h - padding) + ")")
		.call(xAxis);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

}



function circlesTransition() {
	var w = 500;
	var h = 300;
	var padding = 30;

	var dataset = getRandomDataset();

	var xScale = d3.scale.linear()
		.domain([0, 1000])
		.range([padding, w - padding * 2]);

	var yScale = d3.scale.linear()
		.domain([0, 1000])
		.range([h - padding, padding]);

	var rScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {
			return d[1];
		})])
		.range([2, 5]);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("class", "transition");

	var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle");

	circles
		.attr("cx", function(d) {
			return xScale(d[0]);
		})
		.attr("cy", function(d) {
			return yScale(d[1]);
		})
		.attr("r", function(d) {
			return rScale(d[1]);
		})
		.attr("fill", function(d, i) {
			if (i == 0) return "red"
				else return "black";
		});

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(5);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, " + (h - padding) + ")")
		.call(xAxis);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

	var interval;
	d3.select("svg.transition").on("click", function() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		} else {
			interval = setInterval(function() {
				circleRedraw(circles);
			}, 500);
		}
	});


	function circleRedraw(circles) {
		//var circles = svg.selectAll("svg.transition circle").data(dataset);

		var dataset = getRandomDataset();
		circles
			.data(dataset)
			.transition()
			.ease("sin")
			.duration(500)
			.attr("cx", function(d) {
				return xScale(d[0]);
			})
			.attr("cy", function(d) {
				return yScale(d[1]);
			})
			.attr("r", function(d) {
				return rScale(d[1]);
			});
	}
}




function getRandomScaleDataset() {
	//Dynamic, random dataset
	var dataset = [];
	var numDataPoints = 50;
	var xRange = Math.random() * 1000;
	var yRange = Math.random() * 1000;
	for (var i = 0; i < numDataPoints; i++) {
		var newNumber1 = Math.round(Math.random() * xRange);
		var newNumber2 = Math.round(Math.random() * yRange);
		dataset.push([newNumber1, newNumber2]);
	}
	return dataset;
}

function getRandomDataset() {
	//Dynamic, random dataset
	var dataset = [];
	var numDataPoints = 50;
	for (var i = 0; i < numDataPoints; i++) {
		var newNumber1 = Math.round(Math.random() * 1000);
		var newNumber2 = Math.round(Math.random() * 1000);
		dataset.push([newNumber1, newNumber2]);
	}
	return dataset;
}



function getStaticDataset() {
	return [
		[5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]
	];
}









var end;