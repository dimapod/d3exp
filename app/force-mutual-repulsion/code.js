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

var drag = force.drag()
    .on("dragstart", dragstart)
    .on("dragend", dragend);

var color = d3.scale.category10();

var center = {x:w/2, y:h/2};

svg.append("svg:rect")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "white")
    .on("click", click);
    
var root = {x:w/2, y:h/2, id:0, fixed: true};
    
svg.append("svg:circle")
    .data([root])
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)
    .classed("root", true)
//    .on("mouseover", mouseover)
//    .on("mouseout", mouseout)
    .call(drag);

force.nodes().push(root);

force.on("tick", function(e) {

    var k = e.alpha * .1;
    force.nodes().forEach(function(node) {
        //var center = nodes[node.type];
        node.x += (center.x - node.x) * k;
        node.y += (center.y - node.y) * k;
    });

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

function dragstart(evt) {
    dragging = true;
}

function dragend(evt) {
    dragging = false;
}

function click(evt) {
    console.log(d3.mouse(this));
    console.log(force.nodes()[0]);

    var mc = d3.mouse(this);
    center.x = mc[0];
    center.y = mc[1];

//    force.start();
}
