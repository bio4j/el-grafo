/*
Inside of main.js, you can use require() to load any other scripts you need to run. 
This ensures a single entry point, since the data-main script you specify is loaded asynchronously.

require(["helper/util"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});

That will load the helper/util.js script. 
To get full advantage of RequireJS, see the API docs to learn more about defining and using modules.




// LALA

require(["lib/dagre"] {
}
*/



require(["lib/dagre_d3_c", "lib/d3"], function(dagre_d3_c, d3) {

    /*  
//Width and height
var w = 800,
    h = 600;

//Escala de colores por defecto hasta 20 elementos
var color = d3.scale.category20();

//Create SVG element
var svg = d3.select("div")
    .attr("id", "attach")
    .append("svg")
    .attr("id", "svg-canvas")
    .attr("w", w)
    .attr("h", h);
    .attr("transform", "translate(20, 20)");
  
*/


    //Graph data:
    var g = new dagreD3.Digraph();
    g.addNode(0, {
        label: "0",
        label2: "TOP",
        nodeclass: "type-TOP"
    });
    g.addNode(1, {
        label: "1",
        label2: "S lalalala",
        nodeclass: "type-S"
    });
    g.addNode(2, {
        label: "2",
        label2: "NP",
        nodeclass: "type-NP"
    });
    g.addNode(3, {
        label: "3",
        label2: "DT",
        nodeclass: "type-DT"
    });
    g.addNode(4, {
        label: "4",
        label2: "This",
        nodeclass: "type-TK"
    });
    g.addNode(5, {
        label: "5",
        label2: "VP",
        nodeclass: "type-VP"
    });
    g.addNode(6, {
        label: "6",
        label2: "VBZ",
        nodeclass: "type-VBZ"
    });
    g.addNode(7, {
        label: "7",
        label2: "is",
        nodeclass: "type-TK"
    });
    g.addNode(8, {
        label: "8",
        label2: "NP",
        nodeclass: "type-NP"
    });
    g.addNode(9, {
        label: "9",
        label2: "DT",
        nodeclass: "type-DT"
    });
    g.addNode(10, {
        label: "10",
        label2: "an",
        nodeclass: "type-TK"
    });
    g.addNode(11, {
        label: "11",
        label2: "NN",
        nodeclass: "type-NN"
    });
    g.addNode(12, {
        label: "12",
        label2: "example",
        nodeclass: "type-TK"
    });
    g.addNode(13, {
        label: "13",
        label2: ".",
        nodeclass: "type-."
    });
    g.addNode(14, {
        label: "14",
        label2: "sentence",
        nodeclass: "type-TK"
    });


    g.addEdge(null, 3, 4, {
        label: "_1:edge 3-4",
        edgeclass: "oneToMany",
        class: "oneToMany"
    });
    g.addEdge(null, 2, 3, {
        label: "_2:edge 2-3",
        relationshipTypes: "type-1",
        inArity: "one",
        outArity: "one",
        alwaysDefined: "no",
        locallyUnique: "no",
        indexedBy: "date"
    });
    g.addEdge(null, 1, 2, {
        label: "_3"
    });
    g.addEdge(null, 6, 7, {
        label: "_4"
    });
    g.addEdge(null, 5, 6, {
        label: "_5"
    });
    g.addEdge(null, 9, 10, {
        label: "_6"
    });
    g.addEdge(null, 8, 9, {
        label: "_7"
    });
    g.addEdge(null, 3, 10, {
        label: "_8"
    });
    g.addEdge(null, 1, 10, {
        label: "_9"
    });
    g.addEdge(null, 1, 10, {
        label: "_10"
    });
    g.addEdge(null, 1, 10, {
        label: "_11"
    });
    g.addEdge(null, 1, 10, {
        label: "_12"
    });
    g.addEdge(null, 11, 12, {
        label: "_13"
    });
    g.addEdge(null, 8, 11, {
        label: "_14"
    });
    g.addEdge(null, 5, 8, {
        label: "_15"
    });
    g.addEdge(null, 1, 5, {
        label: "_16"
    });
    // g.addEdge(null, 5, 5, { label: "_17" });
    g.addEdge(null, 13, 14, {
        label: "_18"
    });
    // g.addEdge(null, 13,13, { label: "_19" });
    // g.addEdge(null, 1, 13, { label: "_20" });
    g.addEdge(null, 0, 1, {
        label: "_21"
    });
    g.addEdge(null, 9, 11, {
        label: "_22"
    });
    g.addEdge(null, 11, 8, {
        label: "_23"
    });
    g.addEdge(null, 14, 13, {
        label: "_24"
    })







    // we ask the renderer to draw our graph in the SVG element:
    var renderer = new dagreD3.Renderer();

    var oldDrawNodes = renderer.drawNodes();
    renderer.drawNodes(function(graph, root) {
        var svgNodes = oldDrawNodes(graph, root);

        svgNodes.each(function(u) {
            d3.select(this).classed(graph.node(u).nodeclass, true);
        });
        //Asi le añado atributos a los nodos! :)
        svgNodes.attr("id", function(u) {
            return "node-" + u;
        });
        svgNodes.attr("position", function(u) {
            return u.position;
        });

        // svgNodes.attr("lele", function(u) { return "u.length->" + label2; });  //MAL!


        return svgNodes;
    });

    // Disable pan and zoom
    // renderer.zoom(false);

    /*  // Configuring the Layout:
  var layout = dagreD3.layout()
                      //.nodeSep(50)  //50=default
                      //.edgeSep(10)
                      //.rankSep(20);   //Separation between levels, childs
                      .rankDir("BT"); //TB:top-to-bottom / BT:bottom-to-top / LR:left-to-right / RL:right-to-left 

  // Configuring the Renderer:                    
  var rendered = renderer.layout(layout)
              //.edgeTension(.8)
              .edgeInterpolate("bundle")  // Bundle, linear, step-after, basis, cardinal, monotone..
              .run(g, d3.select("svg g"));
*/


    var layout = renderer.run(g, d3.select("svg g"));
    d3.select("svg")
    /*   .append("g")
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
    .append("g")*/
    .attr("width", layout.graph().width + 60)
        .attr("height", layout.graph().height + 60);

    /*
   // Create layers
  svg
    .selectAll('g.edgePaths, g.edgeLabels, g.nodes')
    .data(['edgePaths', 'edgeLabels', 'nodes'])
    .enter()
      .append('g')
      .attr('class', function(d) { return d; });*/

    d3.select("svg.g")
        .selectAll("g.nodes")
        .data("nodes")
        .enter()
        .append("text")
        .attr("prueba", function(d) {
            return d;
        });

    /*//selecting stuff
d3.selectAll(".type-DT")
    // .append("circle")
    .style("stroke","red")
    .style("stroke-width", "2px");*/

    //selecting stuff
    d3.selectAll(".type-DT")
        .on("click", function() {
            alert("hey! u clicking the node Nº" + renderer.drawNodes.u);
            // .selectAll("rect")
            // .style("stroke", "yellow")
        });


    //selecting stuff
    d3.selectAll(".node rect")
        .style("fill", "lightseagreen");


    //selecting stuff

    var typeTK = d3.selectAll(".node.type-TK");

    var TKrects = typeTK.selectAll("rect")
        .style("fill", "green");

    var TKtexts = typeTK.selectAll("text")
        .style("fill", "orange");



    /*d3.selectAll(".node.type-TK rect")
  .style("fill", "green");

d3.selectAll(".node.type-TK text")
  .style("fill", "white");
*/



    d3.selectAll(".node.type-TK rect")
        .on("mouseover", function() {
            d3.select(this)
                .style("fill", "yellow");
        })
        .on("mouseout", function() {
            d3.select(this)
                .style("fill", "lightgreen");
        });

    d3.select(".node rect")
        .style("fill", "red");

    /*d3.select(".node("3")")
  .style("fill", "yellow");*/

    /*d3.selectAll(".node.type-TK rect")
  .style("fill", "yellow");*/

    /*d3.selectAll("path")
  .style("stroke", "indianred");*/

    d3.selectAll(".edgePath path")
        .style("stroke", "mediumpurple");

    d3.select(".edgePath path")
        .style("stroke", "red")
        .style("stroke-width", "3px");

    d3.select(".edgeLabels text")
        .style("fill", "red");



    // indices!
    /*d3.selectAll(".node rect")[3]
  .style("fill", "red");*/





    /*select(g.successors("3")))
  .style("fill", "red");*/









    /*
// From Renderer.js:
// Create layers
  svg
    .selectAll('g.edgePaths, g.edgeLabels, g.nodes')
    .data(['edgePaths', 'edgeLabels', 'nodes'])
    .enter()
      .append('g')
      .attr('class', function(d) { return d; });



  function defaultPostLayout() {
  // Do nothing
}

function defaultPostRender(graph, root) {
  if (graph.isDirected() && root.select('#arrowhead').empty()) {
    root
      .append('svg:defs')
        .append('svg:marker')
          .attr('id', 'arrowhead')
          .attr('viewBox', '0 0 10 10')
          .attr('refX', 8)
          .attr('refY', 5)
          .attr('markerUnits', 'strokewidth')
          .attr('markerWidth', 8)
          .attr('markerHeight', 5)
          .attr('orient', 'auto')
          .attr('style', 'fill: #333')
          .append('svg:path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 z');
  }
}
*/


    /*  d3.svg.selectAll("path")
    .data([0, 0.2, 0.4, 0.6, 0.8, 1])
    .enter().append("path")
    .attr("d", function(d) { return line.tension(d)(data); });
*/

    /*   var precessors = d3.select("g.predecessors("3")")
    .style("fill", "yellow");
   
   var precessors = g.predecessors("3")
    .style("fill", "yellow");*/

    /*  var sinks = g.sinks();
  d3.selectAll("sinks")
    .attr("id", "sinks-manual")
    .style("fill", "red");
*/

    /*  var source = Node[0]
    .style("fill", "red");
*/
    /*  var source = svgNodes[0]
    .append("id", "super-source");
*/

    /*  var source = d3.select("g[0]")
    .append("id", "super-source");
*/
    /*  var source = d3.select("graph.node")
    .append("id", "super-source");
*/

    //no fucniona zoom
    /*  function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
*/

    /*  //Graph-lib algos:
  layout.eachNode(function(u, value) {
    console.log("Node " + u + ": " + JSON.stringify(value));
});
*/




    /*
  d3.select(g.sinks())
    .style("fill", "red");
  
  var color = d3.scale.category20();
  d3.select.g
    .data(g.edges)
    .style("fill", function(d) { 
        return color(d,i);
      });
*/

})