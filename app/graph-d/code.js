var width = 960,
    height = 500;

var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(40)
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart)
    .on("dragend", dragend)

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

d3.json("graph.json", function (error, graph) {
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    link = link.data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    node = node.data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 12)
        .on("dblclick", dblclick)
        .on("mousedown", mousedown)
        .on("mouseup", mouseup)
        .call(drag);
});

function tick() {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });

    node.attr("cx", function (d) {
        return d.x;
    })
        .attr("cy", function (d) {
            return d.y;
        });
}

function dblclick(d) {
//    console.log("click", d)
    d3.select(this).classed("fixed", d.fixed = !d.fixed);
}

function dragstart(d) {
    console.log("dragstart", d)
    d3.select(this).classed("fixed", d.fixed = true);
}

function dragend(d) {
    console.log("dragend", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}

function mousedown(d) {
    console.log("mousedown", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}

function mouseup(d) {
    console.log("mouseup", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}


