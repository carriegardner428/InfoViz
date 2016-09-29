$(document).ready(function(){

  $("#graph1a").click(function(){
    var clicks = $(this).data('clicks');

		if(clicks) {
			// clear out previous results if needed
			clearCanvas();

      // Define the div for the tooltip
      var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var formatDate = d3.time.format("%Y");

      //var x = d3.scale.linear()
      //    .range([0, width]);
      var x = d3.time.scale()
      	//.domain([new Date(1990, 0, 1), new Date(2010, 0, 1)])
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var line1 = d3.svg.line()
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(d.HS); });

      var line2 = d3.svg.line()
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(d.BD); });

      var line3 = d3.svg.line()
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(d.AD); });


      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.tsv("q1/js/data_q1/usa.tsv", type, function(error, data) {
      	if (error) throw error;

      //	x.domain(d3.extent(data, function(d) { return d.year; }));
      	x.domain([new Date(1989, 0, 1), new Date(2010, 0, 1)]);
      //	y.domain(d3.extent(data, function(d) { return d.HS; }));
      	y.domain([0,100]);

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
            .text("%");

      	svg.append("path")
            .datum(data)
            .attr("class", "line1")
            .attr("d", line1)
      	  .attr("data-legend", "High school graduate or more")
            .style("stroke", "steelblue");

      	svg.append("path")
            .datum(data)
            .attr("class", "line2")
            .attr("d", line2)
      	  .attr("data-legend", "Bachelor's degree or more")
            .style("stroke", "green");

      	svg.append("path")
            .datum(data)
            .attr("class", "line3")
            .attr("d", line3)
      	  .attr("data-legend", "Advanced degree or more")
            .style("stroke", "red");

      /* Tool Tip Line 1 */
      	svg.selectAll("dot")
            .data(data)
            .enter()
      	  .append("circle")
            .attr("class", "line1 dot1")
      	  .attr("r", 2.5)
            .attr("cx", function(d) { return x(d.year); })
            .attr("cy", function(d) { return y(d.HS); })
      	  .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html(formatDate(d.year) + "<br/>"  + d.HS + "%")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
            .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
      /* Tool Tip Line 2 */
      	svg.selectAll("dot")
            .data(data)
            .enter()
      	  .append("circle")
            .attr("class", "line2 dot2")
      	  .attr("r", 2.5)
            .attr("cx", function(d) { return x(d.year); })
            .attr("cy", function(d) { return y(d.BD); })
      	  .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html(formatDate(d.year) + "<br/>"  + d.BD + "%")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
            .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
      /* Tool Tip Line 3 */
      	svg.selectAll("dot")
            .data(data)
            .enter()
      	  .append("circle")
            .attr("class", "line3 dot3")
      	  .attr("r", 2.5)
            .attr("cx", function(d) { return x(d.year); })
            .attr("cy", function(d) { return y(d.AD); })
      	  .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html(formatDate(d.year) + "<br/>"  + d.AD + "%")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
            .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });

      /* Title */
          svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", 16)
            .text("Education Attainment");

      	legend = svg.append("g")
      	  .attr("class","legend")
            .attr("transform","translate(50,30)")
            .call(d3.legend)

      });

      function type(d) {
        d.year = formatDate.parse(d.year);
      //  d.year = +d.year;
        d.HS = +d.HS;
        return d;
      }

      // d3.legend.js
      // (C) 2012 ziggy.jonsson.nyc@gmail.com
      // MIT licence

      (function() {
      d3.legend = function(g) {
        g.each(function() {
          var g= d3.select(this),
              items = {},
              svg = d3.select(g.property("nearestViewportElement")),
              legendPadding = g.attr("data-style-padding") || 5,
              lb = g.selectAll(".legend-box").data([true]),
              li = g.selectAll(".legend-items").data([true])

          lb.enter().append("rect").classed("legend-box",true)
          li.enter().append("g").classed("legend-items",true)

          svg.selectAll("[data-legend]").each(function() {
              var self = d3.select(this)
              items[self.attr("data-legend")] = {
                pos : self.attr("data-legend-pos") || this.getBBox().y,
                color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
              }
            })

          items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})


          li.selectAll("text")
              .data(items,function(d) { return d.key})
              .call(function(d) { d.enter().append("text")})
              .call(function(d) { d.exit().remove()})
              .attr("y",function(d,i) { return i+"em"})
              .attr("x","1em")
              .text(function(d) { ;return d.key})

          li.selectAll("circle")
              .data(items,function(d) { return d.key})
              .call(function(d) { d.enter().append("circle")})
              .call(function(d) { d.exit().remove()})
              .attr("cy",function(d,i) { return i-0.25+"em"})
              .attr("cx",0)
              .attr("r","0.4em")
              .style("fill",function(d) { console.log(d.value.color);return d.value.color})

          // Reposition and resize the box
          var lbbox = li[0][0].getBBox()
          lb.attr("x",(lbbox.x-legendPadding))
              .attr("y",(lbbox.y-legendPadding))
              .attr("height",(lbbox.height+2*legendPadding))
              .attr("width",(lbbox.width+2*legendPadding))
        })
        return g
      }
      })()

    } else {
      clearCanvas();
    }

    $(this).data("clicks", !clicks);




  }); // end of click on button


  

  $("#clear").click(function(){
    clearCanvas();
  });

  // clear the elements out
  var clearCanvas = function(){
    d3.selectAll("svg").remove(); // clear out chart
  };

}); // end of script
