d3.json("data/rev_schema_forceLayout.json", function(error, graph) {

    /*
  var nodes = d3.range(50).map(Object);
  console.log(nodes);

  var nodes = d3.range(50).map(Object);
  // console.log(nodesff);


  var groups = d3.nest().key(function(d) { return d & 3; }).entries(nodes);
  console.log(groups);*/


    //Function for each module url:
    var lengths = function(d) {
        graph.nodes[d].vertexTypesLength
    };

    // console.log(graph.nodes[8].vertexTypesLength);

    var nodes0 = d3.range(graph.nodes[0].vertexTypesLength).map(Object);
    var nodes1 = d3.range(graph.nodes[1].vertexTypesLength).map(Object);
    var nodes2 = d3.range(graph.nodes[2].vertexTypesLength).map(Object);
    var nodes3 = d3.range(graph.nodes[3].vertexTypesLength).map(Object);
    var nodes4 = d3.range(graph.nodes[4].vertexTypesLength).map(Object);
    var nodes5 = d3.range(graph.nodes[5].vertexTypesLength).map(Object);
    var nodes6 = d3.range(graph.nodes[6].vertexTypesLength).map(Object);
    var nodes7 = d3.range(graph.nodes[7].vertexTypesLength).map(Object);

    var nodes8 = d3.range(graph.nodes[8].vertexTypesLength).map(Object);
    console.log(nodes2);

    /*  var nodes = nodes8;
  console.log(nodes);
*/

    /*  var nodes = function(d) {
    return d3.range(d).map(Object);
  };*/

    data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    /*  var prueba = nodes(data);
  console.log(prueba);*/

    var nodes = d3.range(nodes).map(Object);

    /*  var gJSON = eval(nodes0, nodes1);
  console.log(gJSON);*/

    /*  var groups = d3.nest()
            .key(function(d) { return d & 3; })
            .entries(nodes);*/

    var groups = d3.nest()
        .key(function(d, i) {
            return i
        })
        .entries(nodes);

    console.log(groups);



    /*  var nodes2 = graph.nodes.vertexTypesLength;
  var groups2 = d3.nest().key(function(d) { return d & 3; }).entries(nodes2);
  console.log("nodes2" + nodes2);
  console.log(groups2);*/

    console.log(groups);

    var groupPath = function(d) {
        return "M" +
            d3.geom.hull(d.values.map(function(i) {
                return [i.x, i.y];
            }))
            .join("L") + "Z";
    };

    // var groupFill = function(d, i) { return color(i & 3); };

    var groupFill = function(d, i) {
        return color(i);
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
            return color(i);
        })
        .style("stroke", function(d, i) {
            return d3.rgb(color(i & 3)).darker(2);
        })
        .style("stroke-width", 1)
        .call(force.drag);

    svgModulesAux2.style("opacity", 1e-6)
        .transition()
        .duration(1000)
        .style("opacity", 1);

    force.on("tick", function(e) {

        // Push different nodes in different directions for clustering.
        /*    var k = 2 * e.alpha;
    nodes.forEach(function(o, i) {
      o.x += i & 2 ? k : -k;
      o.y += i & 1 ? k : -k;
    });*/

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


    /*  d3.select("body").on("click", function() {
    nodes.forEach(function(o, i) {
      o.x += (Math.random() - .5) * 40;
      o.y += (Math.random() - .5) * 40;
    });
    force.resume();
  });*/

});