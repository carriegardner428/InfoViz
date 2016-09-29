$(document).ready(function(){

  $("#barChart1").click(function(){
    var clicks = $(this).data('clicks');

		if(clicks) {
			// clear out previous results if needed
			clearCanvas();

      function barChart() {
  		var margin = {top: 100, right: 20, bottom: 30, left: 40},
  			width = 960 - margin.left - margin.right,
  			height = 500 - margin.top - margin.bottom;

  		//https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeRoundBands
  		var x = d3.scale.ordinal()
  			.rangeRoundBands([0, width], .1);
  		//https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
  		var y = d3.scale.linear()
  			.range([height,0]);

  		//https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  		var xAxis = d3.svg.axis()
  			.scale(x)
  			.orient("bottom");
  		//https://github.com/mbostock/d3/wiki/SVG-Axes#_axis
  		var yAxis = d3.svg.axis()
  			.scale(y)
  			.orient("left")
  			.ticks(10, "%");


  		var tipHS = d3.tip()
  			.attr("class", "d3-tip")
  			.offset([-10,0])
  			.html(function(d){
  				return Math.round(d.HS * 1000)/10 + "%";
  			});

  		var tipBD = d3.tip()
  			.attr("class", "d3-tip")
  			.offset([-10,0])
  			.html(function(d){
  				return Math.round(d.BD * 1000)/10 + "%";
  			});

  		var tipAD = d3.tip()
  			.attr("class", "d3-tip")
  			.offset([-10,0])
  			.html(function(d){
  				return Math.round(d.AD * 1000)/10 + "%";
  			});

  		var svg = d3.select("div#barChart1").append("svg")
  			.attr("width", width + margin.left + margin.right)
  			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
  				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  		svg.call(tipHS);



  		d3.tsv("2009.tsv", type, function(error, data) {
  			x.domain(data.map(function(d) { return d.PostalCode; }));
  			y.domain([0, d3.max(data, function(d) { return d.HS; })]);

  			svg.append("g")
  				.attr("class", "x axis")
  				.attr("transform", "translate(0," + height + ")")
  				.call(xAxis);

  			svg.append("g")
  				.attr("class", "y axis")
  				.call(yAxis)
  				.append("text")
  					.attr("transform", "rotate(-90)")
  					.attr("y", 6)
  					.attr("dy", ".71em")
  					.style("text-anchor", "end")
  					.text("HS+");

  			svg.selectAll(".bar").data(data).enter()
  				.append("rect")
  				.attr("class", "bar")
  				.attr("x", function(d) { return x(d.PostalCode); })
  				.attr("width", x.rangeBand())
  				.attr("y", function(d) { return y(d.HS); })
  				.attr("height", function(d) { return height - y(d.HS); })
  				.on("mouseover", tipHS.show)
  				.on("mouseout", tipHS.hide);

  		});

  		//BAR CHART 2

  		var svg2 = d3.select("div#barChart2").append("svg")
  			.attr("width", width + margin.left + margin.right)
  			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
  				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  		svg2.call(tipBD);



  		d3.tsv("2009.tsv", type, function(error, data) {
  			x.domain(data.map(function(d) { return d.PostalCode; }));
  			y.domain([0, d3.max(data, function(d) { return d.HS; })]);

  			svg2.append("g")
  				.attr("class", "x axis")
  				.attr("transform", "translate(0," + height + ")")
  				.call(xAxis);

  			svg2.append("g")
  				.attr("class", "y axis")
  				.call(yAxis)
  				.append("text")
  					.attr("transform", "rotate(-90)")
  					.attr("y", 6)
  					.attr("dy", ".71em")
  					.style("text-anchor", "end")
  					.text("BD+");

  			svg2.selectAll(".bar").data(data).enter()
  				.append("rect")
  				.attr("class", "bar")
  				.attr("x", function(d) { return x(d.PostalCode); })
  				.attr("width", x.rangeBand())
  				.attr("y", function(d) { return y(d.BD); })
  				.attr("height", function(d) { return height - y(d.BD); })
  				.on("mouseover", tipBD.show)
  				.on("mouseout", tipBD.hide);

  		});

  		// BAR CHART 3

  		var svg3 = d3.select("div#barChart3").append("svg")
  			.attr("width", width + margin.left + margin.right)
  			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
  				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  		svg3.call(tipAD);



  		d3.tsv("2009.tsv", type, function(error, data) {
  			x.domain(data.map(function(d) { return d.PostalCode; }));
  			y.domain([0, d3.max(data, function(d) { return d.HS; })]);

  			svg3.append("g")
  				.attr("class", "x axis")
  				.attr("transform", "translate(0," + height + ")")
  				.call(xAxis);

  			svg3.append("g")
  				.attr("class", "y axis")
  				.call(yAxis)
  				.append("text")
  					.attr("transform", "rotate(-90)")
  					.attr("y", 6)
  					.attr("dy", ".71em")
  					.style("text-anchor", "end")
  					.text("AD+");

  			svg3.selectAll(".bar").data(data).enter()
  				.append("rect")
  				.attr("class", "bar")
  				.attr("x", function(d) { return x(d.PostalCode); })
  				.attr("width", x.rangeBand())
  				.attr("y", function(d) { return y(d.AD); })
  				.attr("height", function(d) { return height - y(d.AD); })
  				.on("mouseover", tipAD.show)
  				.on("mouseout", tipAD.hide);

  		});

  			function type(d) {
  			d.HS = +d.HS;
  			d.BD = +d.BD;
  			d.AD = +d.AD;
  			return d;
  		}// anonymous function

  		}

    } else {
      clearCanvas();
    }

    $(this).data("clicks", !clicks);

  }); // end of click function

  $("#clear").click(function(){
    clearCanvas();
  });

  // clear the elements out
  var clearCanvas = function(){
    d3.selectAll("svg").remove(); // clear out chart
  };

}); // end of script
