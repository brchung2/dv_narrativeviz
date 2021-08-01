$(document).ready(function(){
    // Global Variables
    var showCar = -1;
    var showTruck = -1;
    var slideNumber = 1;


    // Initiate webpage with slide one
    $('#slideOne').removeClass('inactiveSlide');
    $('#navItemOne').addClass('active')
    slide(slideNumber, showCar, showTruck);

    // Navigation functionality
    $('.navItem').click(function(){

        // Set nav active color
        $('.navItem').removeClass('active');
        $(this).addClass('active'); 

        // Remove current slide
        $('svg').remove();

        // Set all slide details to not display
        $('#slideDetails div').addClass('inactiveSlide'); 

        // Call slide function
        if ($(this).is('#navItemOne')) {
            $('#slideOne').removeClass('inactiveSlide');
            slideNumber = 1;
            slide(slideNumber, showCar, showTruck);
        }

        if ($(this).is('#navItemTwo')) {
            $('#slideTwo').removeClass('inactiveSlide');
            slideNumber = 2;
            slide(slideNumber, showCar, showTruck);
        }

        if ($(this).is('#navItemThree')) {
            $('#slideThree').removeClass('inactiveSlide');
            slideNumber = 3;
            slide(slideNumber, showCar, showTruck);
        }

        if ($(this).is('#navItemFour')) {
            $('#slideFour').removeClass('inactiveSlide');
            slideNumber = 4;
            slide(slideNumber, showCar, showTruck);
        }
	    
	if ($(this).is('#navItemFive')) {
            $('#slideFive').removeClass('inactiveSlide');
            slideNumber = 5;
            slide(slideNumber, showCar, showTruck);
        }
	    
	if ($(this).is('#navItemSix')) {
            $('#slideSix').removeClass('inactiveSlide');
            slideNumber = 6;
            slide(slideNumber, showCar, showTruck);
        }

    });   
    
    // Legend button functionality
    $('.legendKey').click(function(){

        // Car functionality
        if ($(this).is('#keyCars')){
            
            // Toggle car variable
            showCar *= -1;

            // If toggling on 
            if(showCar == 1){

                // Update button appearance
                $('#keyCars').removeClass('keyInActive');
                $('#keyCars').addClass('keyActive');

                // Reveal chart line
                $('.carMPG').attr("display",null);

                // Reveal MPG axis
                $('.axisMPG').attr("display",null);

            }

             // If toggling off 
             if(showCar == -1){

                // Update button appearance
                $('#keyCars').removeClass('keyActive');
                $('#keyCars').addClass('keyInActive');

                // Hide chart line
                $('.carMPG').attr("display","none");

                // Hide MPG axis
                if (showCar == -1 && showTruck == -1){
                    $('.axisMPG').attr("display","none");
                }

            }
        }

        // Truck functionality
        if ($(this).is('#keyTrucks')){
            
            // Toggle car variable
            showTruck *= -1;

            // If toggling on 
            if(showTruck == 1){

                // Update button appearance
                $('#keyTrucks').removeClass('keyInActive');
                $('#keyTrucks').addClass('keyActive');

                // Reveal chart line
                $('.truckMPG').attr("display",null);

                // Reveal MPG axis
                $('.axisMPG').attr("display",null);

            }

             // If toggling off 
             if(showTruck == -1){

                // Update button appearance
                $('#keyTrucks').removeClass('keyActive');
                $('#keyTrucks').addClass('keyInActive');

                // Hide chart line
                $('.truckMPG').attr("display","none");

                // Hide MPG axis
                if (showCar == -1 && showTruck == -1){
                    $('.axisMPG').attr("display","none");
                }

            }
        }
    });
    
    // START - Slide Function  -----------------------------------------------------------------------
    function slide(slideNum, shwCar, shwTruck){
	// =========================== Chart Dimensions ===========================	
	// set line chart dimensions
	var margin = {top: 50, right: 150, bottom: 50, left: 50}
	, width = 800 - margin.left - margin.right
	, height = 500 - margin.top - margin.bottom;

	// add svg canvas dimensions
	var svg = d3.select("#emissionViz")
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
        .attr("y", 0 - (margin.top/2)) //margin.top / 2
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

//             if(slideNum == 4) {

//                 var pathOne = svg.append("path")
//                 .datum(data.filter(function(d) {return d.Year <= 2007;}))
//                 .attr("fill", "none")
//                 .attr("stroke", "#4CAF50")
//                 .attr("stroke-width", 2)
//                 .attr("d", d3.line()
//                     .x(function(d) { return x(d.Year) })
//                     .y(function(d) { return y(d.co2Emissions) })
//                 )
        
//                 pathOne

//                 var path = svg.append("path")
//                     .datum(data.filter(function(d) {return d.Year >= 2007;}))
//                     .attr("fill", "none")
//                     .attr("stroke", "#4CAF50")
//                     .attr("stroke-width", 2)
//                     .attr("d", d3.line()
//                         .x(function(d) { return x(d.Year) })
//                         .y(function(d) { return y(d.co2Emissions) })
//                     )    

//                 // Animate line
//                 var pathLength = path.node().getTotalLength();

//                 path.attr("stroke-dasharray", pathLength)
//                     .attr("stroke-dashoffset", pathLength)
//                     .transition()
//                     .duration(4000) 
//                     .ease(d3.easeSin) 
//                     .attr("stroke-dashoffset", 0);

//                 // Line for car mpg
//                 var pathCar = svg.append("path")
//                     .datum(data.filter(function(d) {return d.Year >= 1960;}))
//                     .attr("class","carMPG")
//                     .attr("display", "none")
//                     .attr("fill", "none")
//                     .attr("stroke", "#3cd0e4")
//                     .attr("stroke-width", 2)
//                     .attr("d", d3.line()
//                         .x(function(d) { return x(d.Year) })
//                         .y(function(d) { return y1(d.carMpg) })
//                     )

//                 pathCar

//                 // Line for truck mpg
//                 var pathTruck = svg.append("path")
//                     .datum(data.filter(function(d) {return d.Year >= 1960;}))
//                     .attr("class","truckMPG")
//                     .attr("display", "none")
//                     .attr("fill", "none")
//                     .attr("stroke", "#e62424")
//                     .attr("stroke-width", 2)
//                     .attr("d", d3.line()
//                         .x(function(d) { return x(d.Year) })
//                         .y(function(d) { return y1(d.truckMpg) })
//                     )

//                 pathTruck         
//             }
           
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
		.attr("y", y(20))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Oil Crisis");  
		    
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
		.attr("y", y(21))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Oil Crisis 2");  
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
		.attr("y", y(27))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Soviet Union Collapse")
		.call(wrap, 60);  
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
		.attr("y", y(29))
		.attr("text-anchor", "middle")  
		.style("font-size", "14px")
		.text("Asian Financial Crisis")
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
		.text("Global Financial Crisis & Kyoto Protocol")
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
		.text("Paris Climate Agreement")
		.call(wrap, 80);  
            }

            // Set whether to show car and truck

            if (shwCar == 1) {
                $(".carMPG").attr("display",null);
                $(".axisMPG").attr("display",null);
            }

            if (shwTruck == 1) {
                $(".truckMPG").attr("display",null);
                $(".axisMPG").attr("display",null);
            }
     
            // Tool Tip
            var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("display", "none");    

            var focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");

            focus.append("circle")
                .attr("r", 5);

            var tooltipDate = tooltip.append("div")
                .attr("class", "tooltip-date");

            // Emissions section    
            var tooltipEmissions = tooltip.append("div");

            tooltipEmissions.append("span")
                .attr("class", "tooltip-title")
                .text("Emissions: ");

            var tooltipEmissionsValue = tooltipEmissions.append("span")
                .attr("class", "tooltip-emissions");
                
            // Car MPG section    
            var tooltipCar = tooltip.append("div");

            tooltipCar.append("span")
                .attr("class", "tooltip-title")
                .text("Car MPG: ");

            var tooltipCarValue = tooltipCar.append("span")
                .attr("class", "tooltip-car");      

            // Truck MPG section    
            var tooltipTruck = tooltip.append("div");

            tooltipTruck.append("span")
                .attr("class", "tooltip-title")
                .text("Truck MPG: ");

            var tooltipTruckValue = tooltipTruck.append("span")
                .attr("class", "tooltip-truck");                 


            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
                .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
                .on("mousemove", mousemove);   

            // Set year threshold
            var yearTresh = 1975

            if (slideNum == 1) {
                yearTresh = 1975;
            }   
            if (slideNum == 2) {
                yearTresh = 1986;
            } 
            if (slideNum == 3) {
                yearTresh = 2007;
            } 
            if (slideNum == 4) {
                yearTresh = 2016;
            }  

            function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]);
                bisect = d3.bisector(function(a, b){ return a.Year - b; }).right;
                var i = bisect(data, x0);
                var d0 = data[i - 1];
                var d1 = data[i];
                var d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
                
                var winWidth = $(window).width(); 
                var winOffset = 0;
                
                if(winWidth > 1000){
                    winOffset = (winWidth - 1000) / 2;  
                }

                if (d.Year <= yearTresh) {
                    focus.attr("transform", "translate(" + x(d.Year) + "," + y(d.co2Emissions) + ")");
                    tooltip.attr("style", "left:" + (x(d.Year) + winOffset + 64) + "px;top:" + (y(d.co2Emissions) + 90) + "px;");
                    tooltip.select(".tooltip-date").text(d.Year);
                    tooltip.select(".tooltip-emissions").text(d.co2Emissions);
                    tooltip.select(".tooltip-car").text(d.carMpg);
                    tooltip.select(".tooltip-truck").text(d.truckMpg);
                }

            }    

        });

        
    }
    // END - Slide Function  -----------------------------------------------------------------------

 });      
