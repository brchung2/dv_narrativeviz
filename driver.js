$(document).ready(function(){

    var slideNumber = 1;


    // Initiate webpage with slide one
    $('#scene1').removeClass('inactiveSlide');
    $('#navItemOne').addClass('active')
    slide(slideNumber);

    // Navigation functionality
    $('.navItem').click(function(){

        // Set nav active color
        $('.navItem').removeClass('active');
        $(this).addClass('active'); 

        // Remove current slide
        $('svg').remove();

        // Set all slide details to not display
        $('#scenetext div').addClass('inactiveSlide'); 

        // Call slide function
        if ($(this).is('#navItemOne')) {
            $('#scene1').removeClass('inactiveSlide');
            slideNumber = 1;
            slide(slideNumber);
        }

        if ($(this).is('#navItemTwo')) {
            $('#scene2').removeClass('inactiveSlide');
            slideNumber = 2;
            slide(slideNumber);
        }

        if ($(this).is('#navItemThree')) {
            $('#scene3').removeClass('inactiveSlide');
            slideNumber = 3;
            slide(slideNumber);
        }

        if ($(this).is('#navItemFour')) {
            $('#scene4').removeClass('inactiveSlide');
            slideNumber = 4;
            slide(slideNumber);
        }
	    
	if ($(this).is('#navItemFive')) {
            $('#scene5').removeClass('inactiveSlide');
            slideNumber = 5;
            slide(slideNumber);
        }
	    
	if ($(this).is('#navItemSix')) {
            $('#scene6').removeClass('inactiveSlide');
            slideNumber = 6;
            slide(slideNumber);
        }

    });   
    
   

    function slide(slideNum){
	// =========================== Chart Dimensions ===========================	
	// set line chart dimensions
	var margin = {top: 50, right: 150, bottom: 50, left: 50}
	, width = 800 - margin.left - margin.right
	, height = 500 - margin.top - margin.bottom;

	// add svg canvas dimensions
	var svg = d3.select("#mainsvgchart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // load data
        d3.csv("emission3.csv").then(function(data) {

        // Add graph title
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Annual CO2 Emissions 1960-2016");

        // Add affordance
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2)+20)
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")  
        .text("Hover over graph for more details");


        // =========================== Axes ===========================
        // Create X axis
        var x = d3.scaleLinear()
        .domain([1960, 2017])
        .range([ 0, width]);

        // Add X axis to svg
        svg.append("g")
        .attr("transform", "translate( 0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        // Add label to X axis
        svg.append("text")             
        .attr("transform", "translate(" + (width/2) + " ," + (height + (margin.top)) + ")")
        // 	.attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Year");


        // Create Y axis
        var y = d3.scaleLinear()
        .domain([0, 35])
        .range([ height, 0]);

        // Add Y axis to svg
        svg.append("g")
        .attr("transform", "translate(0, 0)")
        .call(d3.axisLeft(y).tickFormat(d3.format("d")));

        // Add label to y axis
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("CO2 Emissions - billion metric tons"); 
		
	// =========================== Gridlines ===========================
	// X axis gridllines (vertical)
	function make_x_gridlines() {
	    return d3.axisBottom(x)
		.ticks(11)
	}

	// Y axis gridllines (horizontal)
	function make_y_gridlines() {
	    return d3.axisLeft(y)
		.ticks(11)
	}

	// Add the X gridlines
	svg.append("g")
	    .attr("class", "grid")
	    .attr("transform", "translate(0," + height + ")")
	    .call(make_x_gridlines()
		.tickSize(-height)
		.tickFormat("")
	    )

	// Add the Y gridlines
	svg.append("g")
	    .attr("class", "grid")
	    .call(make_y_gridlines()
		.tickSize(-width)
		.tickFormat("")
	    )
		
	// =========================== Legend ===========================	
	// legend keys
	var keys = ["Global", "Europe", "North America", "East Asia"];

	// set colors to legend keys
	var color = d3.scaleOrdinal().domain(keys).range(["#5daf4c", "#004cff", "#FF6A33", "#D033FF"]);

	// Add one dot in the legend for each name.
	var size = 10;
	svg.selectAll("rectss")
	.data(keys)
	.enter()
	.append("rect")
	.attr("x", width + 30)
	.attr("y", function(d,i){ return 200 + i*25} ) // 100 is where the first dot appears. 25 is the distance between dots
	.attr("width", size)
	.attr("height", size)
	.style("fill", function(d){ return color(d)});
	

	// Add one dot in the legend for each name.
	svg.selectAll("labels")
	.data(keys)
	.enter()
	.append("text")
	.attr("x", width + 30+ size*1.4)
	.attr("y", function(d,i){ return 200 + i*(25) + (size/2)+1}) // 100 is where the first dot appears. 25 is the distance between dots
	.style("fill", function(d){ return color(d)})
	.text(function(d){ return d})
	.attr("text-anchor", "left")
	.style("alignment-baseline", "middle");
		
		
		
		
	// =========================== Add data lines to graph ===========================

            if(slideNum == 1) {
                var yearthreshold = 1975;
                var path = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= yearthreshold;}))
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.WLD); }))  
                .attr("fill", "none")
                .attr("stroke", "#5daf4c") 
                .attr("stroke-width", 3);

                // Animate global line
                var pathLength = path.node().getTotalLength();

                path.attr("stroke-dasharray", pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

                 //  North america data
                var pathNA = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= yearthreshold;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.NAC); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#FF6A33") 
                    .attr("stroke-width", 3);
		    
		// Animate  NA line
                var pathlengthNA = pathNA.node().getTotalLength();

                pathNA.attr("stroke-dasharray", pathlengthNA)
                    .attr("stroke-dashoffset", pathlengthNA)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);


                //  Europe data
                var pathEU = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= yearthreshold;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.ECS); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#004cff") 
                    .attr("stroke-width", 3);

		// Animate  EU line
                var pathlengthEU = pathEU.node().getTotalLength();

                pathEU.attr("stroke-dasharray", pathlengthEU)
                    .attr("stroke-dashoffset", pathlengthEU)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

            // Asia data
            var pathasia = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= yearthreshold;})) 
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.EAS); }))  
                .attr("fill", "none")
                .attr("stroke", "#D033FF") 
                .attr("stroke-width", 3);
		    
		// Animate asia line
                var pathlengthasia = pathasia.node().getTotalLength();

                pathasia.attr("stroke-dasharray", pathlengthasia)
                    .attr("stroke-dashoffset", pathlengthasia)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
                }
                

    
            if(slideNum == 2) {
// 		var yearthreshold_prev = yearthreshold ;
		    
                var pathprev = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1975;}))
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.WLD); }))  
                .attr("fill", "none")
                .attr("stroke", "#5daf4c") 
                .attr("stroke-width", 3);
        
                pathprev
		
		var yearthreshold = 1983;
		    
                var path = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1975 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.WLD); }))
                    .attr("fill", "none")
                    .attr("stroke", "#4CAF50")
                    .attr("stroke-width", 3);   

                // Animate line
                var pathLength = path.node().getTotalLength();

                path.attr("stroke-dasharray", pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

		// NA data
		var pathNA = svg.append("path")
		.datum(data.filter(function(d) {return d.year <= 1975;}))
		.attr("d", d3.line()
		.x(function(d) { return x(d.year); }) 
		.y(function(d) { return y(d.NAC); }))  
		.attr("fill", "none")
		.attr("stroke", "#FF6A33") 
		.attr("stroke-width", 3);


		 //  Europe data
                var pathEU = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= 1975;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.ECS); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#004cff") 
                    .attr("stroke-width", 3);


            // Asia data
            var pathasia = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1975;})) 
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.EAS); }))  
                .attr("fill", "none")
                .attr("stroke", "#D033FF") 
                .attr("stroke-width", 3);
                
		    pathNA;
		    pathEU;
		    pathasia;
		 
		    // NA line animted
		 var pathNA_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1975 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.NAC); }))
                    .attr("fill", "none")
                    .attr("stroke", "#FF6A33")
                    .attr("stroke-width", 3);       
		// Animate  NA line
                var pathlengthNA = pathNA_now.node().getTotalLength();

                pathNA_now.attr("stroke-dasharray", pathlengthNA)
                    .attr("stroke-dashoffset", pathlengthNA)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		//  EU line to animte
		var pathEU_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1975 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.ECS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#004cff")
                    .attr("stroke-width", 3);  
		    
		// Animate  EU line
                var pathlengthEU = pathEU_now.node().getTotalLength();

                pathEU_now.attr("stroke-dasharray", pathlengthEU)
                    .attr("stroke-dashoffset", pathlengthEU)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		 
		//  asia line to animte
		var pathasia_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1975 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.EAS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#D033FF")
                    .attr("stroke-width", 3);  
		// Animate asia line
                var pathlengthasia = pathasia_now.node().getTotalLength();

                pathasia_now.attr("stroke-dasharray", pathlengthasia)
                    .attr("stroke-dashoffset", pathlengthasia)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
                }
            

            if(slideNum == 3) {
		 var yearthreshold = 1994;
		    
                 var pathprev = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1983;}))
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.WLD); }))  
                .attr("fill", "none")
                .attr("stroke", "#5daf4c") 
                .attr("stroke-width", 3);
        
                pathprev
		
                var path = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1983 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.WLD); }))
                    .attr("fill", "none")
                    .attr("stroke", "#4CAF50")
                    .attr("stroke-width", 3);   

// 		path
                // Animate line
                var pathLength = path.node().getTotalLength();

                path.attr("stroke-dasharray", pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

		// NA data
		var pathNA = svg.append("path")
		.datum(data.filter(function(d) {return d.year <= 1983;}))
		.attr("d", d3.line()
		.x(function(d) { return x(d.year); }) 
		.y(function(d) { return y(d.NAC); }))  
		.attr("fill", "none")
		.attr("stroke", "#FF6A33") 
		.attr("stroke-width", 3);


		 //  Europe data
                var pathEU = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= 1983;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.ECS); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#004cff") 
                    .attr("stroke-width", 3);


            // Asia data
            var pathasia = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1983;})) 
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.EAS); }))  
                .attr("fill", "none")
                .attr("stroke", "#D033FF") 
                .attr("stroke-width", 3);
                
		    pathNA;
		    pathEU;
		    pathasia;
		 
		    // NA line animted
		 var pathNA_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1983 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.NAC); }))
                    .attr("fill", "none")
                    .attr("stroke", "#FF6A33")
                    .attr("stroke-width", 3);       
		// Animate  NA line
                var pathlengthNA = pathNA_now.node().getTotalLength();

                pathNA_now.attr("stroke-dasharray", pathlengthNA)
                    .attr("stroke-dashoffset", pathlengthNA)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		//  EU line to animte
		var pathEU_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1983 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.ECS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#004cff")
                    .attr("stroke-width", 3);  
		    
		// Animate  EU line
                var pathlengthEU = pathEU_now.node().getTotalLength();

                pathEU_now.attr("stroke-dasharray", pathlengthEU)
                    .attr("stroke-dashoffset", pathlengthEU)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		 
		//  asia line to animte
		var pathasia_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1983 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.EAS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#D033FF")
                    .attr("stroke-width", 3); 
		    
		// Animate asia line
                var pathlengthasia = pathasia_now.node().getTotalLength();

                pathasia_now.attr("stroke-dasharray", pathlengthasia)
                    .attr("stroke-dashoffset", pathlengthasia)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
     
            }

            if(slideNum == 4) {
		 var yearthreshold = 1999;
		    
                 var pathprev = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1994;}))
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.WLD); }))  
                .attr("fill", "none")
                .attr("stroke", "#5daf4c") 
                .attr("stroke-width", 3);
        
                pathprev
		
                var path = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1994 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.WLD); }))
                    .attr("fill", "none")
                    .attr("stroke", "#4CAF50")
                    .attr("stroke-width", 3);   

                // Animate line
                var pathLength = path.node().getTotalLength();

                path.attr("stroke-dasharray", pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

		// NA data
		var pathNA = svg.append("path")
		.datum(data.filter(function(d) {return d.year <= 1994;}))
		.attr("d", d3.line()
		.x(function(d) { return x(d.year); }) 
		.y(function(d) { return y(d.NAC); }))  
		.attr("fill", "none")
		.attr("stroke", "#FF6A33") 
		.attr("stroke-width", 3);


		 //  Europe data
                var pathEU = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= 1994;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.ECS); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#004cff") 
                    .attr("stroke-width", 3);


            // Asia data
            var pathasia = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1994;})) 
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.EAS); }))  
                .attr("fill", "none")
                .attr("stroke", "#D033FF") 
                .attr("stroke-width", 3);
                
		    pathNA;
		    pathEU;
		    pathasia;
		 
		    // NA line animted
		 var pathNA_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1994 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.NAC); }))
                    .attr("fill", "none")
                    .attr("stroke", "#FF6A33")
                    .attr("stroke-width", 3);       
		// Animate  NA line
                var pathlengthNA = pathNA_now.node().getTotalLength();

                pathNA_now.attr("stroke-dasharray", pathlengthNA)
                    .attr("stroke-dashoffset", pathlengthNA)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		//  EU line to animte
		var pathEU_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1994 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.ECS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#004cff")
                    .attr("stroke-width", 3);  
		    
		// Animate  EU line
                var pathlengthEU = pathEU_now.node().getTotalLength();

                pathEU_now.attr("stroke-dasharray", pathlengthEU)
                    .attr("stroke-dashoffset", pathlengthEU)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		 
		//  asia line to animte
		var pathasia_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1994 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.EAS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#D033FF")
                    .attr("stroke-width", 3);  
		// Animate asia line
                var pathlengthasia = pathasia_now.node().getTotalLength();

                pathasia_now.attr("stroke-dasharray", pathlengthasia)
                    .attr("stroke-dashoffset", pathlengthasia)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
                     
            }
		
		
           if(slideNum == 5) {
		 var yearthreshold = 2009;
		    
                 var pathprev = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1999;}))
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.WLD); }))  
                .attr("fill", "none")
                .attr("stroke", "#5daf4c") 
                .attr("stroke-width", 3);
        
                pathprev
		
                var path = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1999 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.WLD); }))
                    .attr("fill", "none")
                    .attr("stroke", "#4CAF50")
                    .attr("stroke-width", 3);   

// 		path
                // Animate line
                var pathLength = path.node().getTotalLength();

                path.attr("stroke-dasharray", pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

		// NA data
		var pathNA = svg.append("path")
		.datum(data.filter(function(d) {return d.year <= 1999;}))
		.attr("d", d3.line()
		.x(function(d) { return x(d.year); }) 
		.y(function(d) { return y(d.NAC); }))  
		.attr("fill", "none")
		.attr("stroke", "#FF6A33") 
		.attr("stroke-width", 3);


		 //  Europe data
                var pathEU = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= 1999;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.ECS); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#004cff") 
                    .attr("stroke-width", 3);


            // Asia data
            var pathasia = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 1999;})) 
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.EAS); }))  
                .attr("fill", "none")
                .attr("stroke", "#D033FF") 
                .attr("stroke-width", 3);
                
		    pathNA;
		    pathEU;
		    pathasia;
		 
		    // NA line animted
		 var pathNA_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1999 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.NAC); }))
                    .attr("fill", "none")
                    .attr("stroke", "#FF6A33")
                    .attr("stroke-width", 3);       
		// Animate  NA line
                var pathlengthNA = pathNA_now.node().getTotalLength();

                pathNA_now.attr("stroke-dasharray", pathlengthNA)
                    .attr("stroke-dashoffset", pathlengthNA)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		//  EU line to animte
		var pathEU_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1999 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.ECS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#004cff")
                    .attr("stroke-width", 3);  
		    
		// Animate  EU line
                var pathlengthEU = pathEU_now.node().getTotalLength();

                pathEU_now.attr("stroke-dasharray", pathlengthEU)
                    .attr("stroke-dashoffset", pathlengthEU)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		 
		//  asia line to animte
		var pathasia_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 1999 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.EAS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#D033FF")
                    .attr("stroke-width", 3);  
		// Animate asia line
                var pathlengthasia = pathasia_now.node().getTotalLength();

                pathasia_now.attr("stroke-dasharray", pathlengthasia)
                    .attr("stroke-dashoffset", pathlengthasia)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
                     
            }
		
           if(slideNum == 6) {
		 var yearthreshold = 2016;
		    
                 var pathprev = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 2009;}))
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.WLD); }))  
                .attr("fill", "none")
                .attr("stroke", "#5daf4c") 
                .attr("stroke-width", 3);
        
                pathprev
		
                var path = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 2009 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.WLD); }))
                    .attr("fill", "none")
                    .attr("stroke", "#4CAF50")
                    .attr("stroke-width", 3);   


                // Animate line
                var pathLength = path.node().getTotalLength();

                path.attr("stroke-dasharray", pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);

		// NA data
		var pathNA = svg.append("path")
		.datum(data.filter(function(d) {return d.year <= 2009;}))
		.attr("d", d3.line()
		.x(function(d) { return x(d.year); }) 
		.y(function(d) { return y(d.NAC); }))  
		.attr("fill", "none")
		.attr("stroke", "#FF6A33") 
		.attr("stroke-width", 3);


		 //  Europe data
                var pathEU = svg.append("path")
                    .datum(data.filter(function(d) {return d.year <= 2009;}))
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.year); }) 
                    .y(function(d) { return y(d.ECS); }))  
                    .attr("fill", "none")
                    .attr("stroke", "#004cff") 
                    .attr("stroke-width", 3);


            // Asia data
            var pathasia = svg.append("path")
                .datum(data.filter(function(d) {return d.year <= 2009;})) 
                .attr("d", d3.line()
                .x(function(d) { return x(d.year); }) 
                .y(function(d) { return y(d.EAS); }))  
                .attr("fill", "none")
                .attr("stroke", "#D033FF") 
                .attr("stroke-width", 3);
                
		    pathNA;
		    pathEU;
		    pathasia;
		 
		    // NA line animted
		 var pathNA_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 2009 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.NAC); }))
                    .attr("fill", "none")
                    .attr("stroke", "#FF6A33")
                    .attr("stroke-width", 3);       
		// Animate  NA line
                var pathlengthNA = pathNA_now.node().getTotalLength();

                pathNA_now.attr("stroke-dasharray", pathlengthNA)
                    .attr("stroke-dashoffset", pathlengthNA)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		//  EU line to animte
		var pathEU_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 2009 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.ECS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#004cff")
                    .attr("stroke-width", 3);  
		    
		// Animate  EU line
                var pathlengthEU = pathEU_now.node().getTotalLength();

                pathEU_now.attr("stroke-dasharray", pathlengthEU)
                    .attr("stroke-dashoffset", pathlengthEU)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
		    
		 
		//  asia line to animte
		var pathasia_now = svg.append("path")
                    .datum(data.filter(function(d) {return d.year >= 2009 && d.year <= yearthreshold;}))
		    .attr("d", d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.EAS); }))
                    .attr("fill", "none")
                    .attr("stroke", "#D033FF")
                    .attr("stroke-width", 3);  
		// Animate asia line
                var pathlengthasia = pathasia_now.node().getTotalLength();

                pathasia_now.attr("stroke-dasharray", pathlengthasia)
                    .attr("stroke-dashoffset", pathlengthasia)
                    .transition()
                    .duration(4000) 
                    .ease(d3.easeSin) 
                    .attr("stroke-dashoffset", 0);
                     
            }
           
	// =========================== Annotations/Highlight events on graph ===========================
            if (slideNum >= 1)
            {
		// source: https://stackoverflow.com/questions/24784302/wrapping-text-in-d3/24785497
		function wrap(text, width) {
			text.each(function () {
				var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.1, // ems
				x = text.attr("x"),
				y = text.attr("y"),
				dy = 0, //parseFloat(text.attr("dy")),
				tspan = text.text(null)
					.append("tspan")
					.attr("x", x)
					.attr("y", y)
					.attr("dy", dy + "em");
			while (word = words.pop()) {
				line.push(word);
				tspan.text(line.join(" "));
				if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan")
							.attr("x", x)
							.attr("y", y)
							.attr("dy", ++lineNumber * lineHeight + dy + "em")
							.text(word);
					}
				}
			});
		}
		// annotation 1		
		var left = x(1973);
		var right = x(1975);
		var wid = right - left;
		svg.append("rect")
		.attr("x", left)
		.attr("width", wid)
		.attr("height", height)
		.style("opacity", 0.5)
		.style("fill", "#F5FF33");

		svg.append("text")
		.attr("x", x(1974))             
		.attr("y", y(23))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Oil Crisis:")  
		.call(wrap, 100);
		    
		 // annotation 1.5		
		svg.append("text")
		.attr("x", x(1974))             
		.attr("y", y(22))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Global emissions constant at 17BMT")  
		.call(wrap, 100);
		  

            }

            // annotation 2
            if (slideNum >= 2){
		var left = x(1979);
		var right = x(1983);
		var wid = right - left;
		svg.append("rect")
		.attr("x", left)
		.attr("width", wid)
		.attr("height", height)
		.style("opacity", 0.5)
		.style("fill", "#F5FF33");

		svg.append("text")
		.attr("x", x(1981))             
		.attr("y", y(25))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Oil Crisis 2: ");  
		    
		svg.append("text")
		.attr("x", x(1981))             
		.attr("y", y(24))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("3.2% drop");  
            }


            // annotation 3
            if (slideNum >= 3){
		var left = x(1990);
		var right = x(1994);
		var wid = right - left;
		svg.append("rect")
		.attr("x", left)
		.attr("width", wid)
		.attr("height", height)
		.style("opacity", 0.5)
		.style("fill", "#F5FF33");

		svg.append("text")
		.attr("x", x(1992))             
		.attr("y", y(28))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Soviet Union Collapse: ")
		.call(wrap, 100);  
		
		svg.append("text")
		.attr("x", x(1992))             
		.attr("y", y(25))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("2.5% drop")
		.call(wrap, 80);  
            }
		
	    // annotation 4
            if (slideNum >= 4){
		var left = x(1997);
		var right = x(1999);
		var wid = right - left;
		svg.append("rect")
		.attr("x", left)
		.attr("width", wid)
		.attr("height", height)
		.style("opacity", 0.5)
		.style("fill", "#F5FF33");

		svg.append("text")
		.attr("x", x(1998))             
		.attr("y", y(31))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Asian Financial Crisis: ")
		.call(wrap, 80);  
		    
		svg.append("text")
		.attr("x", x(1998))             
		.attr("y", y(27))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("0.6% drop")
		.call(wrap, 80);  
            }
		
	    // annotation 5
            if (slideNum >= 5){
		var left = x(2008);
		var right = x(2009);
		var wid = right - left;
		svg.append("rect")
		.attr("x", left)
		.attr("width", wid)
		.attr("height", height)
		.style("opacity", 0.5)
		.style("fill", "#F5FF33");

		svg.append("text")
		.attr("x", x(2008.5))             
		.attr("y", y(27))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Global Financial Crisis & Kyoto Protocol:")
		.call(wrap, 80);  
		    
		svg.append("text")
		.attr("x", x(2008.5))             
		.attr("y", y(20))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("2.5% drop")
		.call(wrap, 80);  
            }
		
	    // annotation 6
            if (slideNum >= 6){
		var left = x(2015);
		var right = x(2016);
		var wid = right - left;
		svg.append("rect")
		.attr("x", left)
		.attr("width", wid)
		.attr("height", height)
		.style("opacity", 0.5)
		.style("fill", "#F5FF33");

		svg.append("text")
		.attr("x", x(2015.5))             
		.attr("y", y(30))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Paris Climate Agreement:")
		.call(wrap, 80);  
		    
		svg.append("text")
		.attr("x", x(2015.5))             
		.attr("y", y(27))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("0.65% drop")
		.call(wrap, 80); 
            }
            

		// =========================== Tooltip ===========================
		// source from: https://bl.ocks.org/Qizly/8f6ba236b79d9bb03a80

		var tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("display", "none");

		var focus = svg.append("g")
		.attr("class", "focus")
		.style("display", "none");

		focus.append("circle")
		.attr("r", 5);

		//==== Tooltip content: 
		// Year
		var tooltipyear = tooltip.append("div")
		.attr("class", "tooltip-year");

		//== Newline- "Global Emissions:"
		var tooltiptext = tooltip.append("div");
		
		tooltiptext.append("span")
		.text("Global Emissions: ");

		// emission value
		var tooltipvalue = tooltiptext.append("span")
		.attr("class", "tooltip-wld");

		// units
		var tooltipunits = tooltiptext.append("span")
		.text(" BMT")
		.attr("class", "tooltip-wld");

		// ----------------
		// Newline- "EU Emissions:"
		var tooltiptextEU = tooltip.append("div");
		
		 tooltiptextEU.append("span")
		 .text("EU Emissions: ");

		// emission value
		 var tooltipeuvalue = tooltiptextEU.append("span")
			.attr("class", "tooltip-eu");      

		// units
		var tooltipunits = tooltiptextEU.append("span")
		.text(" BMT")
		.attr("class", "tooltip-wld");

		// ----------------
		// Newline- "USA Emissions:"
		var tooltiptextUSA = tooltip.append("div");
		
		 tooltiptextUSA.append("span")
		 .text("N.Am Emissions: ");

		// emission value
		 var tooltipusavalue = tooltiptextUSA.append("span")
			.attr("class", "tooltip-usa");      

		// units
		var tooltipunits = tooltiptextUSA.append("span")
		.text(" BMT")
		.attr("class", "tooltip-wld");

		// ----------------
		// Newline- "Asia Emissions:"
		var tooltiptextASIA = tooltip.append("div");
		
		 tooltiptextASIA.append("span")
		 .text("Asia Emissions: ");

		// emission value
		 var tooltipasiavalue = tooltiptextASIA.append("span")
			.attr("class", "tooltip-asia");      

		// units
		var tooltipunits = tooltiptextASIA.append("span")
		.text(" BMT")
		.attr("class", "tooltip-wld");

		//======
		
            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
                .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
                .on("mousemove", mousemove);   

            // Set year threshold for each slide's tooltip

            if (slideNum == 1) {
                yearThresh = 1975;
            }   
            if (slideNum == 2) {
                yearThresh = 1983;
            } 
            if (slideNum == 3) {
                yearThresh = 1994;
            } 
            if (slideNum == 4) {
                yearThresh = 1999;
            }  
	    if (slideNum == 5) {
                yearThresh = 2009;
            }  
	    if (slideNum == 6) {
                yearThresh = 2016;
            }  

            function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]);
                bisectYear = d3.bisector(function(a, b){ return a.year - b; }).right;
                var i = bisectYear(data, x0),
                 d0 = data[i - 1],
                 d1 = data[i],
                 d = x0 - d0.year > d1.year - x0 ? d1 : d0;
                

                if (d.year <= yearThresh) {
			focus.attr("transform", "translate(" + x(d.year) + "," + y(d.WLD) + ")");
// 			tooltip.attr("style", "left:" + d3.event.pageX   + "px;top:" + d3.event.pageY  + "px;");
			tooltip.attr("style", "left:" + (x(d.year)+30) + "px;top:" + (y(d.WLD) + 200) + "px;");

			tooltip.select(".tooltip-year").text(d.year);
			tooltip.select(".tooltip-wld").text(d.WLD)
			tooltip.select(".tooltip-eu").text(d.ECS)
			tooltip.select(".tooltip-usa").text(d.NAC)
			tooltip.select(".tooltip-asia").text(d.EAS);

                }

            }    

        });

        
    }
   
 });      
