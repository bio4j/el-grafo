// AUX1 -> FORCE LAYOUT

//Force layout
var force = d3.layout.force()
    .linkDistance(25)
    .linkStrength(1)
    .charge(-150)
    .size([introModulesWidthAux1, introModulesHeightAux1]);

//Uploading json file
d3.json("data/rev_schema_forceLayout.json", function(error, graph) {
    var nodes = graph.nodes.slice(),
        links = [],
        bilinks = [];

    graph.links.forEach(function(link) {
        var s = nodes[link.source],
            t = nodes[link.target],
            i = {}; // intermediate node
        nodes.push(i);
        links.push({
            source: s,
            target: i
        }, {
            source: i,
            target: t
        });
        bilinks.push([s, i, t]);
    });

    force
        .nodes(nodes)
        .links(links)
        .start();



    //Draw NODES as CIRCLES    
    var node = svgModulesAux1.selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("class", "node")

    // .attr("r", function(d) { return ((+d.vertexTypesLength) + (+d.edgeTypesLength)); })
    .attr("r", function(d) {
        return 5 + (+d.vertexTypesLength)
    })

    .style("fill", function(d, i) {
        return color(i);
    })
        .style("opacity", .5)
    /*      .on("click", click)
      .on("dblclick", dblclick)*/
    .call(force.drag);

    d3.geom.hull(node);


    // console.log(function(graph.nodes) return {vertexTypesLength(1)});

    //Draw LINKS as PATHS    
    var link = svgModulesAux1.selectAll(".link")
        .data(bilinks)
        .enter()
        .append("path")
        .attr("class", "link");

    //Labels vertex
    var labelsVertex = svgModulesAux1.selectAll("text1")
        .data(graph.nodes)
        .enter()
        .append("text")
        .text(function(d) {
            return d.label;
        })
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) {
            return d.y;
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");
    //.remove();


    //Labels edges
    var labelsEdges = svgModulesAux1.selectAll("text3")
        .data(graph.links)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.label;
        })
        .attr("x", function(d) {
            return d.source.x;
        })
        .attr("y", function(d) {
            return d.source.y;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "grey")
        // .remove();



    force.on("tick", function() {


        link.attr("d", function(d) {
            return "M" + d[0].x + "," + d[0].y + "S" + d[1].x + "," + d[1].y + " " + d[2].x + "," + d[2].y;
        });



        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });


        labelsVertex.attr("x", function(d) {
            return d.x;
        })
            .attr("y", function(d) {
                return d.y + 3;
            });

        /*    labelsEdges.attr("x", function(d) { return ((d.source.x + d.target.x)/2); })       
                .attr("y", function(d) { return ((d.source.y + d.target.y)/2); });  */

    });

});