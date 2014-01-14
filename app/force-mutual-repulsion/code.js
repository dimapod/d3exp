var w = 1280,
    h = 800;

var dragging = false;

var force = d3.layout.force()
    .gravity(.1)
    .charge(function(d, i) { return d.id == 0 ? -1000 : -10; })
    .size([w, h]);

var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var drag = force.drag();

var color = d3.scale.category10();

svg.append("svg:rect")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "white");
    
var root = {x:w/2, y:h/2, id:0, fixed: true};
    
svg.append("svg:circle")
    .data([root])
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(drag);

force.nodes().push(root);

force.on("tick", function() {
    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
});

var p0;
var id=1;

svg.on("mousemove", function() {
    if (dragging) return;

    var p1 = d3.mouse(this),
        node = {x: p1[0], y: p1[1], px: (p0 || (p0 = p1))[0], py: p0[1], id:id++};

    p0 = p1;

    svg.append("svg:circle")
        .data([node])
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 4.5)
        .style("fill", function(d, i) { return color(d.id % 3); })
        .transition()
        .delay(5000)
        .attr("r", 1e-6)
        .each("end", function() { force.nodes().splice(1, 1); })
        .remove();

    force.nodes().push(node);
    force.start();
});

function mouseover(evt) {
    console.log("mouseover");
    dragging = true;
}

function mouseout(evt) {
    console.log("mouseout");
    dragging = false;
}
