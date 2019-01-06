  d3.json("https://raw.githubusercontent.com/jorjoel777/d3SJ-test/master/donutCharts.json", function(error, myD) {
 
  if (error) throw error;




    var data1 = [myD[8], myD[9]]; 
    var data2 = [myD[10], myD[11]];
    var data3 = [myD[12], myD[13]];
    var dataIndex=1;
    
    var innerData = [myD[0],myD[1],myD[2],myD[3],myD[4],myD[5],myD[6],myD[7]];
    var totalCountName = "revenue"; //Total Count per each Chart
    var totalCountName2 = "impresions"; //Total Count per each Chart
    var totalCountName3 = "visits"; //Total Count per each Chart
    var totalCount1 = 0;    // equals 0 then we calculate total below
    var totalCount2 = 0;    // equals 0 then we calculate total below
    var totalCount3 = 0;    // equals 0 then we calculate total below
  



    myD.slice(8,10).forEach(function(d){
        totalCount1+= d.count; // we calculate the sum of the value for d.count
    });

    myD.slice(10,12).forEach(function(d){
        totalCount2+= d.count; // we calculate the sum of the value for d.count
    });

    myD.slice(12,14).forEach(function(d){
        totalCount3+= d.count; // we calculate the sum of the value for d.count
    });

    var totalCountBG1 = "img/bgChart1.jpg";    //settingBG per each Chart
    var totalCountBG2 = "img/bgChart2.jpg";    //settingBG per each Chart




    var width = 306,
    height = 183,
    radius = 80;

		var arc = d3.arc()
    	.outerRadius(radius -1)
    	.innerRadius(88 );

    var innerArc = d3.arc()
      .outerRadius(radius -7)
      .innerRadius(77 );

		var pie = d3.pie()
	    .sort(null)
	    .value(function(d) {
	        return d.count;
	    });




		var svg = d3.select('#donutChart1').append("svg")
	    .attr("width", width)
	    .attr("height", height)
      .attr("class", "bgChart1")
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
      .data(pie(eval("data1")))
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

//we reuse the same cariables to create the second Chart

    var svg2 = d3.select('#donutChart2').append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bgChart2")
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg2.selectAll(".arc")
      .data(pie(data2))
      .enter().append("g");    
    
    g.append("path")
      .attr("d", arc)
      .style("fill", function(d,i) {
        return d.data.color;
      });
    
    var f = svg2.selectAll(".innerArc")
      .data(pie(innerData))
      .enter().append("g"); 
    
    f.append("path")
      .attr("d", innerArc)
      .style("fill", function(d,i) {
        return d.data.color;
      });


//we reuse the same cariables to create the second Chart

    var svg3 = d3.select('#donutChart3').append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bgChart3")
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg3.selectAll(".arc")
      .data(pie(data3))
      .enter().append("g");    
    
    g.append("path")
      .attr("d", arc)
      .style("fill", function(d,i) {
        return d.data.color;
      });
    
    var f = svg3.selectAll(".innerArc")
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


var totalCenter = d3.select('#donutChart'+dataIndex)
     .append("div")
     .attr("text-anchor", "middle")
     .attr('color','#a3a3a3')
     .attr('y', -35)
     .html(function(){
            return "<div class='centerTitle'>" + (totalCountName) + "</div>"+ "<br/>" + "<div class='totalPie1'>" + numberWithPeriod(totalCount1) +"€" + "</div>";
          });


var legend = d3.select("#legend"+dataIndex)
     .selectAll("div")
     .data(pie(data1))
     .enter()
     .append("div")
     .attr("class","bottom-info")
     .html(function(d,i) {
          return "<h2 style='color:" + d.data.color + "'>" + d.data.name + "</h2>" + "<div class='datum'>" + "<span class='percentage'>" +  d.data.percentage + "%" + "</span>" + " " + "<span class='count'>" + numberWithPeriod(d.data.count) + "€" + "</span><div>";
      },0,'60px');


var totalCenter = d3.select('#donutChart2')
     .append("div")
     .attr("text-anchor", "middle")
     .attr('color','#a3a3a3')
     .attr('y', -35)
     .html(function(){
            return "<div class='centerTitle2'>" + (totalCountName2) + "</div>"+ "<br/>" + "<div class='totalPie2'>" + numberWithPeriod(totalCount2) +"€" + "</div>";
          });


var legend = d3.select("#legend2")
     .selectAll("div")
     .data(pie(data2))
     .enter()
     .append("div")
     .attr("class","bottom-info")
     .html(function(d,i) {
          return "<h2 style='color:" + d.data.color + "'>" + d.data.name + "</h2>" + "<div class='datum'>" + "<span class='percentage'>" +  d.data.percentage + "%" + "</span>" + " " + "<span class='count'>" + numberWithPeriod(d.data.count) + "€" + "</span><div>";
      },0,'60px');


  var totalCenter = d3.select('#donutChart3')
     .append("div")
     .attr("text-anchor", "middle")
     .attr('color','#a3a3a3')
     .attr('y', -35)
     .html(function(){
            return "<div class='centerTitle3'>" + (totalCountName3) + "</div>"+ "<br/>" + "<div class='totalPie3'>" + numberWithPeriod(totalCount3) +"€" + "</div>";
          });


var legend = d3.select("#legend3")
     .selectAll("div")
     .data(pie(data3))
     .enter()
     .append("div")
     .attr("class","bottom-info")
     .html(function(d,i) {
          return "<h2 style='color:" + d.data.color + "'>" + d.data.name + "</h2>" + "<div class='datum'>" + "<span class='percentage'>" +  d.data.percentage + "%" + "</span>" + " " + "<span class='count'>" + numberWithPeriod(d.data.count) + "€" + "</span><div>";
      },0,'60px');



      });