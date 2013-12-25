var width = 960,
    height = 500;

var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(80)
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart)
    .on("dragend", dragend)

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

var relationshipsMap = {};

d3.json("graph.json", function (error, graph) {
    relationshipsMap = graph.relationshipsMap;

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    link = link.data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", function(d) {
            return relationshipsMap[d.type] ? relationshipsMap[d.type].color : "#000";
        });

    node = node.data(graph.nodes)
        .enter().append("g")
        .on("dblclick", dblclick)
        .on("mousedown", mousedown)
        .on("mouseup", mouseup)
        .call(drag);

    node.append("circle")
        .attr("class", "node")
        .attr("r", 12)
        .attr("cx", 0)
        .attr("cy", 0);

    node.append("text")
        .attr("class", "title")
        .attr("x", 15)
        .attr("dy", ".35em")
        .text(function (d) {
            return d.title;
        });

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

    node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}

function dblclick(d) {
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


