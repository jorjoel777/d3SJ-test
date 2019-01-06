  d3.json("https://raw.githubusercontent.com/jorjoel777/d3SJ-test/master/donutCharts.json", function(error, myD) {
  console.log(myD[8], myD[9]);
  if (error) throw error;


    var data = [myD[8], myD[9]]; 
    var data1 = [myD[10], myD[11]];
    var data3 = [myD[12], myD[13]];
    var innerData = [myD.slice(0,7)];
    var totalCountName = "revenue"; //Total Count per each Chart
    var totalCount = 0;    // equals 0 then we calculate total below

    myD.slice(8,9 || 10,11 || 12,13).forEach(function(d){
        totalCount+= d.count; // we calculate the sum of the value for d.count
    });

    var totalCountBG = "img/bgChart1.jpg";    //settingBG per each Chart
//alert(totalCount);
    var width = 535,
    height = 320,
    radius = 146;

		var arc = d3.arc()
    	.outerRadius(radius -1)
    	.innerRadius(160 );

    var innerArc = d3.arc()
      .outerRadius(radius -8)
      .innerRadius(144 );

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

    var f = svg.selectAll(".innerArc")
      .data(pie(innerData))
      .enter().append("g");    


    f.append("path")
      .attr("d", innerArc)
      .style("fill", function(d,i) {
        return d.data.color;
      });
 ;


    function numberWithPeriod(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


var totalCenter = d3.select('#donutChart')
     .append("div")
     .attr("text-anchor", "middle")
     .attr('color','#a3a3a3')
     .attr('y', -35)
     .html(function(){
            return "<div class='centerTitle'>" + (totalCountName) + "</div>"+ "<br/>" + "<div class='totalPie'>" + numberWithPeriod(totalCount) +"€" + "</div>";
          });


var legend = d3.select("#legend")
     .selectAll("div")
     .data(pie(data))
     .enter()
     .append("div")
     .attr("class","bottom-info")
     .html(function(d,i) {
          return "<h2 style='color:" + d.data.color + "'>" + d.data.name + "</h2>" + "<div class='datum'>" + "<span class='percentage'>" +  d.data.percentage + "%" + "</span>" + " " + "<span class='count'>" + numberWithPeriod(d.data.count) + "€" + "</span><div>";
      },0,'60px');


  });