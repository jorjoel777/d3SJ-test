  d3.json("https://raw.githubusercontent.com/jorjoel777/d3SJ-test/master/donutCharts-Copy.json", function(error, root) {

  if (error) throw error;


    var my_data = [],
    names = {},
    data = [],
    innerarc = 0;


  //data returns pie chart ready data + national and state averages
    data = get_data(root)
    my_data = data[0]
    innerarc = data[1]

    var innerData = [innerarc];
    var totalCountName = "revenue"; //Total Count per each Chart
    var totalCount = 0;    // equals 0 then we calculate total below

    my_data.forEach(function(d){
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


  //define svg (new one drawn for each pie chart in the data)
    var svg = d3.select("body").selectAll("svg")
      .data(my_data)
      .enter().append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//this boolean  colours only the first value in the data
    var first=true;


    var g = svg.selectAll(".arc")
      .data(pie(my_data))
      .enter().append("g");     


   	g.append("path")
    	.attr("d", arc)
      .style("fill", function(d,i) {
        if(first==true){
          first=false;
      	  return d.data.color;
      } else {
        first=true;
        return 'white';//colour the rest of the donut white
      }});


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