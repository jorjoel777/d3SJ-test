  d3.json("donutCharts.json", function(data) {
    console.log(data[0]);
  });    

    var data = [
      {name: 'smartphone', count: 80000, percentage: 40, color: '#3c671b'},
      {name: 'tablet', count: 120000, percentage: 60, color: '#8ad53f'},
 
    //  {name: 'revenue', count: 200000, background}
    ]; 
    
    var innerData = [
      {count: 500, percentage: 1, color: '#a3a3a3'},
      {count: 50000, percentage: 25, color: '#fff'},
      {count: 500, percentage: 1, color: '#a3a3a3'},
      {count: 50000, percentage: 25, color: '#fff'},
      {count: 500, percentage: 1, color: '#a3a3a3'},
      {count: 50000, percentage: 25, color: '#fff'},
      {count: 500, percentage: 1, color: '#a3a3a3'},
      {count: 50000, percentage: 25, color: '#fff'},
    ];
    var totalCountName = "revenue"; //Total Count per each Chart
    var totalCount = 0;    // equals 0 then we calculate total below

    data.forEach(function(d){
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
      .innerRadius(145 );

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




d3.nest().key(function(d){
    return d.name; })
.rollup(function(leaves){
    return d3.sum(leaves, function(d){
        return d.count;
    });
}).entries(data)
.map(function(d){
    return { Names: d.key, Count: d.values};
});