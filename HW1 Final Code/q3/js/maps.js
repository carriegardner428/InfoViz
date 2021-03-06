$(document).ready(function(){

	// Width and height of map
	var width = 960;
	var height = 500;

	var highColor = '#003FFF'
	var lowColor = '#FFFFFF'
	var json_file = "q3/js/data/us.json";

	// D3 Projection
	var projection = d3.geoAlbersUsa()
	    .translate([width / 2, height / 2]) // translate to center of screen
	    .scale([1000]); // scale things down so see entire US

	// Define path generator
	var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
	    .projection(projection); // tell path generator to use albersUsa projection

	d3.select("body")
	    .append("div")
		.attr("id", "HS")
		.attr("class", "map")
		.append("h3")
		.html("Percent Change of High School Graduate or More")
	
	// Create SVG element and append map to the SVG
	// Advanced Degrees+
	var svg = d3.select("#HS")
		.append("svg")
	    .attr("width", width)
	    .attr("height", height);
		
	

	// Load in my states data!
	d3.csv("q3/js/data/hs.csv", function(data) {
	   	var dataArray = [];
	   	for (var d = 0; d < data.length; d++) {
	   		dataArray.push(parseFloat(data[d].value))
	   	}
	   	var minVal = d3.min(dataArray)
	   	var maxVal = d3.max(dataArray)
	   	var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])

	    // Load GeoJSON data and merge with states data
	    d3.json(json_file, function(json) {

			// Loop through each state data value in the .csv file
			for (var i = 0; i < data.length; i++) {

	          // Grab State Name
	          var dataState = data[i].state;

	          // Grab data value
	          var dataValue = data[i].value;

	          // Find the corresponding state inside the GeoJSON
	          for (var j = 0; j < json.features.length; j++) {
	            var jsonState = json.features[j].properties.name;

	            if (dataState == jsonState) {

	              // Copy the data value into the JSON
	              json.features[j].properties.value = dataValue;

	              // Stop looking through the JSON
	              break;
	            }
	          }
	        }

			// Bind the data to the SVG and create one path per GeoJSON feature
			svg.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "#EDEDED")
				.style("stroke-width", "1")
				.style("fill", function(d) { return ramp(d.properties.value) });

			// add a legend
			var w = 140, h = 450;

			var key = d3.select("#HS")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("class", "legend");

			var legend = key.append("defs")
				.append("svg:linearGradient")
				.attr("id", "gradient")
				.attr("x1", "100%")
				.attr("y1", "0%")
				.attr("x2", "100%")
				.attr("y2", "100%")
				.attr("spreadMethod", "pad");

			legend.append("stop")
				.attr("offset", "0%")
				.attr("stop-color", highColor)
				.attr("stop-opacity", 1);

			legend.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", lowColor)
				.attr("stop-opacity", 1);

			key.append("rect")
				.attr("width", w - 100)
				.attr("height", h -30)
				.style("fill", "url(#gradient)")
				.attr("transform", "translate(0,10)");

			var y = d3.scaleLinear()
				.range([h-30, 0])
				.domain([minVal, maxVal]);

			var yAxis = d3.axisRight(y);

			key.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(41,10)")
				.call(yAxis)
		});

	});
	
	/****************************************************************************************/
	// D3 Projection
	var projection2 = d3.geoAlbersUsa()
	    .translate([width / 2, height / 2]) // translate to center of screen
	    .scale([1000]); // scale things down so see entire US

	// Define path generator
	var path2 = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
	    .projection(projection2); // tell path generator to use albersUsa projection

	d3.select("body")
	    .append("div")
		.attr("id", "BD")
		.attr("class", "map")
		.append("h3")
		.html("Percent Change of Bachelor's Degree or More")

	// Create SVG element and append map to the SVG
	// Advanced Degrees+
	var svg2 = d3.select("#BD")
		.append("svg")
	    .attr("width", width)
	    .attr("height", height);

	// Load in my states data!
	d3.csv("q3/js/data/bs.csv", function(data) {
	   	var dataArray = [];
	   	for (var d = 0; d < data.length; d++) {
	   		dataArray.push(parseFloat(data[d].value))
	   	}
	   	var minVal = d3.min(dataArray)
	   	var maxVal = d3.max(dataArray)
	   	var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])

	    // Load GeoJSON data and merge with states data
	    d3.json(json_file, function(json) {

			// Loop through each state data value in the .csv file
			for (var i = 0; i < data.length; i++) {

	          // Grab State Name
	          var dataState = data[i].state;

	          // Grab data value
	          var dataValue = data[i].value;

	          // Find the corresponding state inside the GeoJSON
	          for (var j = 0; j < json.features.length; j++) {
	            var jsonState = json.features[j].properties.name;

	            if (dataState == jsonState) {

	              // Copy the data value into the JSON
	              json.features[j].properties.value = dataValue;

	              // Stop looking through the JSON
	              break;
	            }
	          }
	        }

			// Bind the data to the SVG and create one path per GeoJSON feature
			svg2.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path2)
				.style("stroke", "#EDEDED")
				.style("stroke-width", "1")
				.style("fill", function(d) { return ramp(d.properties.value) });

			// add a legend
			var w = 140, h = 450;

			var key = d3.select("#BD")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("class", "legend");

			var legend = key.append("defs")
				.append("svg:linearGradient")
				.attr("id", "gradient")
				.attr("x1", "100%")
				.attr("y1", "0%")
				.attr("x2", "100%")
				.attr("y2", "100%")
				.attr("spreadMethod", "pad");

			legend.append("stop")
				.attr("offset", "0%")
				.attr("stop-color", highColor)
				.attr("stop-opacity", 1);

			legend.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", lowColor)
				.attr("stop-opacity", 1);

			key.append("rect")
				.attr("width", w - 100)
				.attr("height", h - 30)
				.style("fill", "url(#gradient)")
				.attr("transform", "translate(0,10)");

			var y = d3.scaleLinear()
				.range([h - 30, 0])
				.domain([minVal, maxVal]);

			var yAxis = d3.axisRight(y);

			key.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(41,10)")
				.call(yAxis)
		});

	});
/************************************************************************************************/

	/****************************************************************************************/
	// D3 Projection
	var projection2 = d3.geoAlbersUsa()
	    .translate([width / 2, height / 2]) // translate to center of screen
	    .scale([1000]); // scale things down so see entire US

	// Define path generator
	var path2 = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
	    .projection(projection2); // tell path generator to use albersUsa projection

	d3.select("body")
	    .append("div")
		.attr("id", "AD")
		.attr("class", "map")
		.append("h3")
		.html("Percent Change of Advanced Degree or More")

	// Create SVG element and append map to the SVG
	// Advanced Degrees+
	var svg3 = d3.select("#AD")
		.append("svg")
	    .attr("width", width)
	    .attr("height", height);

	// Load in my states data!
	d3.csv("q3/js/data/advanced.csv", function(data) {
	   	var dataArray = [];
	   	for (var d = 0; d < data.length; d++) {
	   		dataArray.push(parseFloat(data[d].value))
	   	}
	   	var minVal = d3.min(dataArray)
	   	var maxVal = d3.max(dataArray)
	   	var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])

	    // Load GeoJSON data and merge with states data
	    d3.json(json_file, function(json) {

			// Loop through each state data value in the .csv file
			for (var i = 0; i < data.length; i++) {

	          // Grab State Name
	          var dataState = data[i].state;

	          // Grab data value
	          var dataValue = data[i].value;

	          // Find the corresponding state inside the GeoJSON
	          for (var j = 0; j < json.features.length; j++) {
	            var jsonState = json.features[j].properties.name;

	            if (dataState == jsonState) {

	              // Copy the data value into the JSON
	              json.features[j].properties.value = dataValue;

	              // Stop looking through the JSON
	              break;
	            }
	          }
	        }

			// Bind the data to the SVG and create one path per GeoJSON feature
			svg3.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path2)
				.style("stroke", "#EDEDED")
				.style("stroke-width", "1")
				.style("fill", function(d) { return ramp(d.properties.value) });

			// add a legend
			var w = 140, h = 450;

			var key = d3.select("#AD")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("class", "legend");

			var legend = key.append("defs")
				.append("svg:linearGradient")
				.attr("id", "gradient")
				.attr("x1", "100%")
				.attr("y1", "0%")
				.attr("x2", "100%")
				.attr("y2", "100%")
				.attr("spreadMethod", "pad");

			legend.append("stop")
				.attr("offset", "0%")
				.attr("stop-color", highColor)
				.attr("stop-opacity", 1);

			legend.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", lowColor)
				.attr("stop-opacity", 1);

			key.append("rect")
				.attr("width", w - 100)
				.attr("height", h - 30)
				.style("fill", "url(#gradient)")
				.attr("transform", "translate(0,10)");

			var y = d3.scaleLinear()
				.range([h - 30, 0])
				.domain([minVal, maxVal]);

			var yAxis = d3.axisRight(y);

			key.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(41,10)")
				.call(yAxis)
		});

	});
/************************************************************************************************/


	$("#hs").click(function(){
		$("#HS").show();
	});	
	$("#bs").click(function(){
		$("#BD").show();
	});	
	$("#adv").click(function(){
		$("#AD").show();
	});	
	$("#clear").click(function(){
	  $(".map").hide();
	});

}); // end of script
