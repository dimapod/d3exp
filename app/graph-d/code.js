var width = 960,
    height = 500,
    nodeR = 10;

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
    linkText = svg.selectAll("text"),
    node = svg.selectAll(".node");


var relationships = {};

d3.json("graph.json", function (error, graph) {
    graph = transformData(graph);
    relationships = graph.relationships;
    var distanceScale = d3.scale.linear()
        .domain([1, 20])
        .range([120, 40]);

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .linkDistance(function(d) {return distanceScale(relationships[d.type].force) })
        .start();

    link = link.data(graph.links)
        .enter().append("svg:path")
        .attr("id", function(d) { return linkPathId(d); })
        .attr("class", "link")
        .attr("stroke-width", "1.5")
        .on("mouseover", linkMouseover)
        .on("mouseout", linkMouseout)
        .on("mousedown", linkMousedown)
    ;

    linkText = linkText.data(graph.links)
        .enter().append("text")
        .attr("class", "linkText")
        .append("textPath")
        .attr("startOffset", "50%")
        .attr("xlink:href", function(d) { return "#" + linkPathId(d); })
        .text(function (d) {
            return d.type
        });

    node = node.data(graph.nodes)
        .enter().append("g")
        .on("dblclick", dblclick)
        .on("mousedown", mousedown)
        .on("mouseup", mouseup)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(drag);

    node.append("circle")
        .attr("class", "node")
        .attr("r", nodeR)
        .attr("cx", 0)
        .attr("cy", 0);

    node.append("text")
        .attr("class", "title")
        .attr("dy", ".35em")
        .text(function (d) {
            return d.title;
        });
});

function tick() {
//    link.attr("x1", function (d) {
//        return d.source.x;
//    })
//        .attr("y1", function (d) {
//            return d.source.y;
//        })
//        .attr("x2", function (d) {
//            return d.target.x;
//        })
//        .attr("y2", function (d) {
//            return d.target.y;
//        });


    link.attr("d", function (d) {

        // TODO if collition - use arc

        if (d.linkCount > 1) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
        }

        return "M" +
            d.source.x + "," +
            d.source.y + "L" +
            d.target.x + "," + d.target.y;
    });

//    linkText
//        .attr("x", function (d) {
//            return d3.min([+d.target.x, +d.source.x]) + Math.abs(d.target.x - d.source.x) / 2;
//        })
//        .attr("y", function (d) {
//            return d3.min([+d.target.y, +d.source.y]) + Math.abs(d.target.y - d.source.y) / 2;
//        });

    node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}

function dblclick(d) {
    d3.select(this).classed("fixed", d.fixed = !d.fixed);
}

function dragstart(d) {
//    console.log("dragstart", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}

function dragend(d) {
//    console.log("dragend", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}

function mousedown(d) {
//    console.log("mousedown", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}

function mouseup(d) {
//    console.log("mouseup", d)
    //d3.select(this).classed("fixed", d.fixed = true);
}

function linkPathId(d) {
    return "s" + d.source.id + "_" + d.target.id;
}

function mouseover() {
    d3.select(this).select("circle").transition()
        .duration(200)
        .attr("r", nodeR + 4);
}

function mouseout() {
    d3.select(this).select("circle").transition()
        .duration(200)
        .attr("r", nodeR);
}

function linkMouseover() {
    d3.select(this).transition()
        .duration(100)
        .attr("stroke-width", "2.5");
}

function linkMouseout() {
    d3.select(this).transition()
        .duration(100)
        .attr("stroke-width", "1.5");
}

function linkMousedown(e) {
    alert("Link")
}

function transformData(data) {
    data.links.forEach(function(d1) {
        data.links.forEach(function(d2) {
            if ((d1.source == d2.source && d1.target == d2.target) ||
                (d1.source == d2.target && d1.target == d2.source)) {
                d1.linkCount = d1.linkCount ? d1.linkCount+1 : 1;
            }
        });
    });

    return data;
}


