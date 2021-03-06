var svg = d3.select("body").append("svg")
    .attr("viewBox", "0 0 500 300");

svg.append("defs").append("path")
    .attr("id", "s3")
    .attr("d", "M 10,90 Q 100,15 200,70 Q 340,140 400,30");
//    .attr("d", "M 10,90 L 400,30");

var thing = svg.append("g")
    .attr("id", "thing")
    .style("fill", "navy");

thing.append("text")
    .style("font-size", "20px")
    .append("textPath")
    .attr("xlink:href", "#s3")
    .text("Wavy text is the gimmick for many years to come (d3)");

thing.append("use")
    .attr("xlink:href", "#s3")
    .style("stroke", "black")
    .style("fill", "none");