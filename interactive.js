$( document ).ready(function() {
   function draw_map(data){

   		var div = d3.select('#secTool').style('opacity', 0)

		var margin = 50,
			width = 750,
			height = 500,
			preserverAspectRatio = 'xMinYmin';

		if( window.innerWidth < 768){
			var viewBox = '0 0 580 600',
				left = 95,
				top = 25;

		}else{
			var viewBox = '0 0 750 530',
				left = 87,
				top = 25;
		}

		var svg = d3.select("#map1")
			.insert('svg',":first-child")
			.attr('viewBox', viewBox)
			.attr('preserverAspectRatio', preserverAspectRatio)
			.append('g')
			.attr('class', 'map')
			.classed("svg-content-responsive", true);

		var projection = d3.geo.mercator()
							.center([left,top])
							.scale(850);


						
		var path = d3.geo.path().projection(projection);

		var units = topojson.feature(data, data.objects.subunit);
		var places = topojson.feature(data, data.objects.places);


		

				
		svg.selectAll('path')
			.data(units.features)
			.enter()
			.append("path")
			.attr('d', path);


		var svgChart = d3.select("svg")//svg Chart
				    .append("g")
				    .attr('class', 'circle')
				    .attr("transform", "translate(" + 960 / 2 + "," + 600/ 2 + ")");




		var year = d3.select('svg').append('text').attr('id','display_text')
				.attr('x', 75).attr('y', 100);

		

		function plot(plot){
    	
	    	var circle = svg.selectAll("circle").data(places.features.sort(
	    		function(a,b){
	    			return b.properties.population - a.properties.population
	    		})).enter().append('circle')

	    		



     		function update(timePoint) 	{
     			
     			var rateById = d3.map();

     			plot.forEach(function(d){

    			rateById.set(d.name, d[timePoint]);

    			});

			circle.attr('r', function(d){
						
				    	if(rateById.get(d.properties.name)==undefined){
				    		return 0
				    	}else{
				    		return rateById.get(d.properties.name)/500
				    	}
					})
				    .attr('cx', function(d){
				    	
				    	return projection(d.geometry.coordinates)[0]
				    })
				    .attr('cy', function(d){
				    	return projection(d.geometry.coordinates)[1]
			    	})
			    	.attr('id', function(d){return d.properties.name})
			    	.on("mousemove", function(d,i) {

			    		
						
			            div.transition()    
			                .duration(100)    
			                .style("opacity", .9);    
			            
			            var format = d3.format(",d")	
			            div.html(
			               "<p>" + d.properties.name +"</p><hr>"
			              + "<p>Pop: " + format(rateById.get(d.properties.name)*1000)+ "</p>"
			               )    
		                .style("left", (d3.event.pageX+10) + "px")   
		                .style("top", (d3.event.pageY - 28) + "px")
		                 
            		}).on("mouseout", function(d) {   

            				

 		              div.transition()    
		                 .duration(100)    
		                .style("opacity", 0); 
		            });

			
			};

	
			year.text('1995');
			update(1995);

			d3.select('#rangeSlider').on('input', function() {
						update(this.value);
						year.text(this.value)
					});


			var myTimer;
			d3.select("#start").on("click", function() {
			 clearInterval (myTimer);
				myTimer = setInterval (function() {
	    		
	    		var b = d3.select("#rangeSlider");
			      var t = (+b.property("value")+10) % (+b.property("max")+10);
			     
			      if (t == 1995) { t = +b.property("min"); }
			      b.property("value", t);

			      update (t);
			      if(t==0){year.text('1995')}
			      else{year.text(t)}
	
			      if (+b.property("value") == 1995){  update(1995);}
			    }, 1000);

			});

			d3.select("#stop").on("click", function() {
				clearInterval (myTimer);
			});

		};


    d3.csv('urban.csv', function(d){
    	d[1995] = +d[1995],
    	d[2005] = +d[2005],
    	d[2015] = +d[2015],
    	d[2025] = +d[2025];

    	return d;
    }, plot);
			


	};

function draw(data){

		var div = d3.select('#secTool').style('opacity', 0)

		var margin = 50,
			width = 750,
			height = 700;
			preserverAspectRatio = 'xMinYmin';

		if( window.innerWidth < 768){
			var viewBox = '0 0 580 600',
				left = 93,
				top = 26,
				translate = "translate(" + 578 / 2 + "," + 595/ 2 + ")";

		}else{
			var viewBox = '0 0 750 600',
				left = 87,
				top = 26,
				translate = "translate(" + 752 / 2 + "," + 607/ 2 + ")";
		}


		var svg = d3.select("#map2")
			.append('svg')
			.attr('viewBox', viewBox)
			.attr('preserverAspectRatio', preserverAspectRatio)
			.append('g')
			.attr('class', 'map')
			.classed("svg-content-responsive", true);

		


		var calamity = [
			{"name":"Drought","value":30},
			{"name":"Flooding","value":30},
			{"name":"Landslides","value":30},
			{"name":"Cyclones","value":30},
			{"name":"Heat or Cold Waves","value":30},
			{"name":"Water Supply","value":30,},
			{"name":"Sewerage","value":30,},
			{"name":"Drinage","value":30,},
			{"name":"Solid Waste","value":30}
		];


		var curveData = [{"Kolkata":{"Centroid":"L 123 6 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"M131.55871594164134 224.25945745895874A260 260 0 0 0 243.69738367136137 90.61779732333655","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Mumbai":{"Centroid":"L -107 63 Z","Drought":"0","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"M128.43502922755317 -226.0629188242016A260 260 0 0 0 -43.371377318681745 -256.35702375687026","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"0","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"0"},"Chennai":{"Centroid":"L 2 155 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"0","Drinage":"0","MSW":"0"},"Ahmedabad":{"Centroid":"L -110 -2 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"0"},"Kochi":{"Centroid":"L -57 201 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"M-43.3713773186818 256.35702375687026A260 260 0 0 0 128.43502922755317 226.0629188242016","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Srinagar":{"Centroid":"L -78 -190 Z","Drought":"0","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"M128.43502922755317 -226.0629188242016A260 260 0 0 0 -43.371377318681745 -256.35702375687026","Cyclones":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"M-43.3713773186818 256.35702375687026A260 260 0 0 0 128.43502922755317 226.0629188242016","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Indore":{"Centroid":"L -62 3 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"0"},"Jodhpur":{"Centroid":"L -104 -55 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"0","Landslides":"0","Cyclones":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Delhi":{"Centroid":"L -42 -95 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Bhubaneshwar":{"Centroid":"L 86 43 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"M128.43502922755317 -226.0629188242016A260 260 0 0 0 -43.371377318681745 -256.35702375687026","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"M131.55871594164134 224.25945745895874A260 260 0 0 0 243.69738367136137 90.61779732333655","Sewerage":"M-43.3713773186818 256.35702375687026A260 260 0 0 0 128.43502922755317 226.0629188242016","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Bangalore":{"Centroid":"L -37 155 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"M131.55871594164134 224.25945745895874A260 260 0 0 0 243.69738367136137 90.61779732333655","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"0"},"Hyderabad":{"Centroid":"L -23 88 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"M131.55871594164134 224.25945745895874A260 260 0 0 0 243.69738367136137 90.61779732333655","Sewerage":"M-43.3713773186818 256.35702375687026A260 260 0 0 0 128.43502922755317 226.0629188242016","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"0"},"Surat":{"Centroid":"L -107 28 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"0","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"0"},"Thiruvananthapuram":{"Centroid":"L -46 223 Z","Drought":"0","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"0","Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"0","WaterSupply":"0","Sewerage":"0","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Allahabad":{"Centroid":"L 27 -41 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":"","Cyclones":"0","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":"0","Sewerage":"M-43.3713773186818 256.35702375687026A260 260 0 0 0 128.43502922755317 226.0629188242016","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":"M-259.99374516919454 1.8034613652429525A260 260 0 0 0 -200.32600635267963 165.73922643353373"},"Vishakhapatnam":{"Centroid":"L 50 80 Z","Drought":"M-200.32600635267963 -165.73922643353373A260 260 0 0 0 -259.99374516919454 -1.8034613652429525","Flooding":"M-46.92350278818005 -255.730688197736A260 260 0 0 0 -198.0075211124266 -168.50228954798192","Landslides":0,"Cyclones":"M243.69738367136137 -90.61779732333655A260 260 0 0 0 131.55871594164134 -224.25945745895874","HeatWaves":"M244.9310239006067 87.22839864975411A260 260 0 0 0 244.9310239006067 -87.22839864975411","WaterSupply":0,"Sewerage":"M-43.3713773186818 256.35702375687026A260 260 0 0 0 128.43502922755317 226.0629188242016","Drinage":"M-198.0075211124266 168.50228954798192A260 260 0 0 0 -46.92350278818011 255.73068819773596","MSW":0   }
         }  
         ]


		var svgChart = svg
					.append('g')
				    .attr('class', 'circle')
				    .attr("transform", translate);

		var projection = d3.geo.mercator()
							.center([left,top])
							.scale(850)

						
		var path = d3.geo.path().projection(projection);


		var units = topojson.feature(data, data.objects.subunit);
		var places = topojson.feature(data, data.objects.places);


		

		
		
		svg.selectAll('path')
			.data(units.features)
			.enter()
			.append("path")
			.attr('d', path)
			.style('opacity', .5);


		




		var year = d3.select('svg').append('text').attr('x', 75).attr('y', 100);

		

		var cities = ["Vishakhapatnam","Kolkata","Mumbai","Chennai","Ahmedabad",	"Kochi","Srinagar","Indore","Jodhpur","Delhi",	"Bhubaneshwar","Bangalore","Hyderabad","Surat","Thiruvananthapuram","Allahabad"]


    	var circle = svg.selectAll("circle").data(places.features.sort(
    		function(a,b){

    			return b.properties.population - a.properties.population
    		})).enter().append('circle')


		circle
			.attr('class', 'cityCircle')
			.attr('r', function(d){
				
		    	if(! (cities.includes(d.properties.name))){
		    		return 0
		    	}
		    	if( (window.innerWidth)<768){
		    		return 20
		    	}else{
		    		return 10
		    		//return rateById.get(d.properties.name)/500
		    	}
			})
		    .attr('cx', function(d){
		    	
		    	return projection(d.geometry.coordinates)[0]
		    })
		    .attr('cy', function(d){
		    	return projection(d.geometry.coordinates)[1]
	    	})
	    	.attr('id', function(d){return d.properties.name})
	    	.on("click", function(d,i) {

	    		d3.selectAll('.show').remove();

				var dataArray = [];
	    		
    			centroid = curveData[0][d.properties.name]['Centroid'];


	    		if(curveData[0][d.properties.name]['WaterSupply'] != 0){
	    			value = curveData[0][d.properties.name]['WaterSupply']
	    			dataArray.push({a: value, b:'Water'} )
	    		}
	    		if(curveData[0][d.properties.name]['Drought'] != 0){
	    			value = curveData[0][d.properties.name]['Drought']
	    			dataArray.push({a:value,b:'Drought'})
	    		}
	    		if(curveData[0][d.properties.name]['Flooding'] != 0){
	    			value = curveData[0][d.properties.name]['Flooding']
	    			dataArray.push({a:value,b:'Flooding'})
	    		}
	    		if(curveData[0][d.properties.name]['Landslides'] != 0){
	    			value = curveData[0][d.properties.name]['Landslides'] 
	    			dataArray.push({a:value,b:'Landslides'})
	    		}
	    		if(curveData[0][d.properties.name]['Cyclones'] != 0){
	    			value = curveData[0][d.properties.name]['Cyclones']
	    			dataArray.push({a:value,b:'Cyclones'})
	    		}
	    		if(curveData[0][d.properties.name]['HeatWaves'] != 0){
	    			value = curveData[0][d.properties.name]['HeatWaves']
	    			dataArray.push({a:value,b:'Heat'})
	    		}
	    		if(curveData[0][d.properties.name]['Sewerage'] != 0){
	    			value = curveData[0][d.properties.name]['Sewerage']
	    			dataArray.push({a:value,b:'Sewerage'})
	    		}
	    		if(curveData[0][d.properties.name]['Drinage'] != 0){
	    			value = curveData[0][d.properties.name]['Drinage']
	    			dataArray.push({a:value,b:'Drinage'})
	    		}
	    		if(curveData[0][d.properties.name]['MSW'] != 0){
	    			value = curveData[0][d.properties.name]['MSW']
	    			dataArray.push({a:value,b:'Solid'})
	    		}

    			svgChart.selectAll('.info')
    					.data(dataArray)
    					.enter()
    					.append('path')
						.attr("class", "show")
						.attr("id", function(d){return d.b})
						.attr("d", function(d){
							return d.a + centroid
						})
						.style('opacity', 0.8);



	    		})
	    		.on("mousemove",function(d){

	    			div.transition()    
		                .duration(100)    
		                .style("opacity", .8);    
			            
		            var format = d3.format(",d")	
		            div.html(
		               "<p>" + d.properties.name +"</p>"
		                     )    
	                .style("left", (d3.event.pageX+10) + "px")   
	                .style("top", (d3.event.pageY - 28) + "px")

	    		})
	    		.on("mouseout", function(d){
	    			div.transition()    
		                .duration(100)    
		                .style("opacity", 0); 
	    		});

	    $.fn.clickOff = function(callback, selfDestroy) {
			    var clicked = false;
			    var parent = this;
			    var destroy = selfDestroy || true;
			    
			    parent.click(function() {
			        clicked = true;
			    });
			    
			    $(document).click(function(event) { 
			        if (!clicked) {
			            callback(parent, event);
			        }
			        if (destroy) {
			            //parent.clickOff = function() {};
			            //parent.off("click");
			            //$(document).off("click");
			            //parent.off("clickOff");
			        };
			        clicked = false;
			    });
			};
			
			$(".cityCircle").clickOff(function() {
			    $(".show").remove()

			});


		var pie = d3.layout.pie()
			.value(function(d) {return d.end - d.start; })
			.padAngle(.01)
			.sort(null);

		var arc = d3.svg.arc()
			    .innerRadius(260)
			    .outerRadius(270)

		var pie = d3.layout.pie()
				.startAngle(-90 * Math.PI/180)
				.endAngle(-90 * Math.PI/180 + 2*Math.PI)
				.value(function(d) { return d.value; })
				.padAngle(.01)
				.sort(null);

		svgChart.selectAll(".Arcs")
			.data(pie(calamity))
		  	.enter().append("path")
			.attr("class", "Arcs")
			.attr("d", arc)
			.attr("id", function(d){ 
				var text = /([^\s]+)/;

				var name = text.exec(d.data.name)
			
				return name[0]})
			.each(function(d,i) {
			
				var firstArcSection = /(^.+?)L/; 	

				var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
				
				newArc = newArc.replace(/,/g , " ");
				

				if (d.endAngle > 90 * Math.PI/180) {
					var startLoc 	= /M(.*?)A/,		
						middleLoc 	= /A(.*?)0 0 1/,	
						endLoc 		= /0 0 1 (.*?)$/;	
					var newStart = endLoc.exec( newArc )[1];
					var newEnd = startLoc.exec( newArc )[1];
					var middleSec = middleLoc.exec( newArc )[1];
					
			
					newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;

				}
		
					
				svgChart.append("path")
					.attr("class", "hiddenArcs")
					.attr("id", "Arc"+i)
					.attr("d", newArc)
					.style("fill", "none");


			});

		
			svgChart.selectAll(".Text")
				.data(pie(calamity))
			   .enter().append("text")
				.attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? 18 : -11); })
			   .append("textPath")
			   .attr("class", "Text")
				.attr("startOffset","50%")
				.style("text-anchor","middle")
				.attr("xlink:href",function(d,i){return "#Arc"+i;})
				.text(function(d){return d.data.name;});



	};


d3.json('india.json', draw_map);
d3.json('india.json', draw);
});