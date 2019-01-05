    var data = [
      {name: 'smartphone', count: 80000, percentage: 40, color: '#3c671b'},
      {name: 'tablet', count: 120000, percentage: 60, color: '#8ad53f'},
 
    //  {name: 'revenue', count: 200000, background}
    ]; 

    var totalCountName = "revenue"; //Total Count per each Chart
    var totalCount = 20000;		//calculates total
    var totalCountBG = "img/bgChart1.jpg";    //settingBG per each Chart

    var width = 535,
    height = 320,
    radius = 146;

		var arc = d3.arc()
    	.outerRadius(radius -1)
    	.innerRadius(160);

		var pie = d3.pie()
	    .sort(null)
	    .value(function(d) {
	        return d.count;
	    });

		var svg = d3.select('#donutChart').append("svg")
	    .attr("width", width)
	    .attr("height", height)
      .attr("class", "bgChart")
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");




    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g");    

   	g.append("path")
    	.attr("d", arc)
      .style("fill", function(d,i) {
      	return d.data.color;
      });


    g.append("text")
     .attr("text-anchor", "middle")
     .attr('color','#a3a3a3')
     .attr('class','centerTitle')
     .attr('y', -35)
     .html(function(){
            return (totalCountName)
          });


    g.append("text")
	   .attr("text-anchor", "middle")
		 .attr('font-size', '2em')
		 .attr('y', 18)
     .attr("class","totalPie")
	   .text(function(){
            return numberWithPeriod(totalCount) +"€";
        },0,'30px');

    function numberWithPeriod(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


var legend = d3.select("#legend")
     .selectAll("div")
     .data(pie(data))
     .enter()
     .append("div")
     .attr("class","bottom-info")
     .html(function(d,i) {
          return "<h2 style='color:" + d.data.color + "'>" + d.data.name + "</h2>" + "<div class='datum'>" + "<span class='percentage'>" +  d.data.percentage + "%" + "</span>" + " " + "<span class='count'>" + numberWithPeriod(d.data.count) + "€" + "</span><div>";
      },0,'60px');
