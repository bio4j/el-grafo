// AUX2 -> CONVEX HULL
var nodes = d3.range(50).map(Object);


var groups = d3.nest().key(function(d) {
    return d & 3;
}).entries(nodes);

console.log(groups);

var groupPath = function(d) {
    return "M" +
        d3.geom.hull(d.values.map(function(i) {
            return [i.x, i.y];
        }))
        .join("L") + "Z";
};

var groupFill = function(d, i) {
    return color(i & 3);
};

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .size([introModulesWidthAux2, introModulesHeightAux2])
    .charge(-10)
    .start();

var node = svgModulesAux2.selectAll("circle.node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("cx", function(d) {
        return d.x;
    })
    .attr("cy", function(d) {
        return d.y;
    })
    .attr("r", 1)
    .style("fill", function(d, i) {
        return color(i & 3);
    })
    .style("stroke", function(d, i) {
        return d3.rgb(color(i & 3)).darker(2);
    })
    .style("stroke-width", 1.5)
    .call(force.drag);

svgModulesAux2.style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

force.on("tick", function(e) {

    // Push different nodes in different directions for clustering.
    var k = 2 * e.alpha;
    nodes.forEach(function(o, i) {
        o.x += i & 2 ? k : -k;
        o.y += i & 1 ? k : -k;
    });

    node.attr("cx", function(d) {
        return d.x;
    })
        .attr("cy", function(d) {
            return d.y;
        });

    svgModulesAux2.selectAll("path")
        .data(groups)
        .attr("d", groupPath)
        .enter().insert("path", "circle")
        .style("fill", groupFill)
        .style("stroke", groupFill)
        .style("stroke-width", 20)
        .style("stroke-linejoin", "round")
        .style("opacity", .2)
        .attr("d", groupPath);
});

d3.select("body").on("click", function() {
    nodes.forEach(function(o, i) {
        o.x += (Math.random() - .5) * 40;
        o.y += (Math.random() - .5) * 40;
    });
    force.resume();
});