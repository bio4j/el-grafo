
//Parameters from url
var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split ("&");
var params = {};

for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
url = params["url"];
// colorMod = "#"+params["color"];
colorMod = params["color"];

//SVG canvas for modules loading
var mainModulesWidth = 800;
var mainModulesHeight = 250;

  svgModules = d3.select("#svgMainModules")
              .attr("width", mainModulesWidth)
              .attr("height", mainModulesHeight);
  svgModules.append("g")
              .attr("transform", "translate(40,40)");


//SVG canvas for GRAPH representation
var mainGraphWidth = 650;
var mainGraphHeight = 360;
var distanceXlegend = 30;     
var distanceYlegend = 0;     

  svgGraph = d3.select("#svgMainGraph")
              .attr("width", mainGraphWidth)
              .attr("height", mainGraphHeight);
  svgGraph.append("g")
            .attr("id", "grafo");

  svgGraphLegend = svgGraph.append("g")
              .attr("id", "legend")
              .attr("class", "legend")
              .attr("transform", "translate(" + distanceXlegend +"," + distanceYlegend + ")"); 


//SVG canvas for ROUTEMAP loading
var mainRouteWidth = 300;
var mainRouteHeight = 100;

  svgRouteMap = d3.select("#svgMainRoute")
              // .append("g")
              .attr("width", mainRouteWidth)
              .attr("height", mainRouteHeight);
              // .attr("transform", "translate(20,0)");


//SVG canvas for LOCAL VIEW loading
/*var mainLocalViewWidth = 250;
var mainLocalViewHeight = 100;

  svgLocalView = d3.select("#svgMainLocalView")
            .attr("width", mainLocalViewWidth)
            .attr("height", mainLocalViewHeight);
  svgLocalview.append("g")
            // .attr("transform", "translate(20,20)");
*/
 ////////////////

  titles = ["Bio4j MODULES", "Bio4j DEPENDENCIES"]
  d3.select("#svgMainModules")
        .selectAll("text")
        .data(titles)
        .enter()
        .append("text") 
        .attr("x", 20)
        .attr("y", function(d, i) { return 30 + i*150; } )
        .attr("text-anchor", "left")
        .text( function(d) { return d; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px");


var zoom = d3.behavior.zoom();

function draw(isUpdate) {

  //Complete Domain Model schema:
  url0 = "data/rev_schema_new_ALL.json";

  //Color scheme:
  // var color = d3.scale.category10();
  // var color = d3.scale.quantile().range(d3.range(9));
/*  var color = d3.scale.quantize()
      // .range(colorbrewer.PiYG[9]);
      .range(colorbrewer.Dark2);*/

  //TO DEFINE THE COLOR PALETTE:
  var bio4jColors = ["#0E6580  ","#68DCFF","#1BCAFF","#587680","#16A2CC","#68DCFF","#0E6580 ","#1BCAFF","#587680"];

  var color = d3.scale.category10()
      // .range(colorbrewer.PiYG[9]);
      .range(bio4jColors);

  d3.json(url0, function(json0) {
/*
     var length = json0.length;
     console.log(length);

     ModulesArray = [];        //Initialize empty array 
      for (var i = 0; i < json0.length; i++) {         
        ModulesArray.push(i);       //Add new number to array
            };

      console.log(ModulesArray);
      console.log(json0[3].label);*/

    console.log("json0", json0);

    var newjson0 = json0.map(function(x) {
      function colorModule(d, i) { return color(i); }
          return {
            id: x.label,        
            Nvertex: x.vertexTypes.length,
            Nedges: x.edgeTypes.length,
            Dependencies: x.dependencies.length,
            Color: colorModule(x)
            };
        });
      
    console.log("newjson0", newjson0);

////////////////////////////////////////////////////////////

    // -------> 1_MODULES AND DEPENDENCIES buttons/loading

    //MODULES AND DEPENDENCIES
    //Filtering between modules and dependencies. For example with circles and rects
    var shapesToFilter = svgModules.select("g").selectAll("circle")
                          .data(newjson0)
                          .enter();

    //svg for MODULES
    shapesToFilter.append("circle")
        .filter(function(d) { return d.Dependencies < 1;})
        .attr("id", function(d) { return d.id; })
        .attr("cx", function(d, i) { return i*90} )
        .attr("cy", 30 )
        .attr("r", function(d) { return (1 + d.Nvertex + d.Nedges)*1.5 } )
        .attr("fill", function(d, i) { return color(i); })
        .style("opacity", 0.5);
        // .attr("fill", "teal");
    
    //svg for DEPENDENCIES
    shapesToFilter.append("rect")
        .filter(function(d) { return d.Dependencies >= 1;})
        .attr("x", function(d, i) { return 20 + i*100 })
        .attr("y", 30+140 )
        .attr("width", 20 )
        .attr("height", 1.5 );


   //Filtering between modules and dependencies
   textToFilter = svgModules.select("g").selectAll("text")
                            .data(newjson0)
                            .enter();
    //texts for MODULES
    textToFilter.append("text")
        .filter(function(d) { return d.Dependencies < 1;})
        .text(function(d) {
              return d.id;
            })
        .attr("x", function(d,i) { return i*90} )
        .attr("text-anchor", "middle")
        .attr("y", 65 )
        .attr("font-size", "11px");
    
    //texts for DEPENDENCIES
    textToFilter.append("text")
        .filter(function(d) { return d.Dependencies >= 1;})
        .text(function(d) {
              return d.id;
            })
        .attr("x", function(d,i) { return 20 + i*100 +10; } )
        .attr("text-anchor", "middle")
        .attr("y", 55+140 )
        .attr("font-size", "11px");

 
//////////////


   //Function for each module url:
    var urlFunction = function(d) {
      return ("data/rev_" + d + ".json")
    };


    //Onclick on each Module, highlight it, define the url path and run the dagre-d3 lib
    svgModules.select("g").selectAll("circle")
        .on("click", function(d) {
            svgModules.select("g").selectAll("circle")
              .style("stroke-width", 0);

            d3.select(this)
              .style("stroke", d3.select(this).attr("fill"))
              .style("stroke-width", 10)
              .style("stroke-opacity", .3);
            console.log(d.id);
            url = urlFunction(d.id);
            console.log(url);
            colorMod = d3.select(this).attr("fill");
            console.log(colorMod);
            return draw();
          });

    //  1_MODULES AND DEPENDENCIES buttons/loading   <-------


////////////////////////////////////////////////////////////


// 1-MODEL/DATA/FROM/SERVICE
// Loading GO data from local file after and transforming json initial structure.
d3.json(url, function(json) {


    // -------> 2_AdaptJSON-GraphLib

    // 2-ADAPT/JSON/DATA/GRAPHLIB
    // Transforming json vertex structure with a .map function:

    console.log("json", json);
    var dependencies = json.dependencies;
    console.log("dependencies", dependencies.length);

    if (dependencies.length>0) {
      url = urlFunction(json.dependencies[1]);

      console.log("yuhuu"+json.dependencies[0]);
      colorMod = "brown";
      return draw();
    }

    var module = json.label;
    var properties = json.propertyTypes;

    console.log("Original json structure of vertexTypes from GO file:")
    console.log(json.vertexTypes)

    var newVertex = json.vertexTypes.map(function(x) {
          return {
            id: x.label,        
            value: { module: module, label: x.label, propertyTypes: x.properties }            
            };
        });
      
    console.log("Transformed structure of vertexTypes for Graphlib:")
    console.log(newVertex);

    //////

    // Transforming json edges structure with a .map function:
    console.log("Original json structure of edgeTypes from GO file:")
    console.log(json.edgeTypes)

        var newEdges = json.edgeTypes.map(function(x) {
          return {
            id: x.label,
            u: x.source.type,     
            v: x.target.type,
            value: { module: module, label: x.label, inArity: x.source.arity, outArity: x.target.arity, propertyTypes: x.properties }            
          };
        });
    
    console.log("Transformed structure of edgeTypes for Graphlib:")
    console.log(newEdges);


    //  2_AdaptJSON-GraphLib  < -------

  ////////


  // Using the GRAPHLIB GRAPH as input for DAGRE-D3:
  var renderer = new dagreD3.Renderer();
  var graph = dagreD3.json.decode(newVertex, newEdges);
    


  //alter the drawNodes function:
    var oldDrawNodes = renderer.drawNodes();
  renderer.drawNodes(function(graph, root) {

    console.log(newVertex);
    console.log(d3.selectAll("svgNodes"));

    var svgNodes = oldDrawNodes(graph, root);
    svgNodes.attr("id", function(u) { return  u });
    return svgNodes;
  });


  //alter the drawEdges function:
  var oldDrawEdge = renderer.drawEdgePaths();
  renderer.drawEdgePaths(function(graph, root) {

    console.log(d3.selectAll("svgEdgePaths"));

    var svgEdgePaths = oldDrawEdge(graph, root);
    svgEdgePaths.attr("id", function(e) { return  e })
    return svgEdgePaths;

  });


/////////////////////////
  
  //Configuring the layout:
  var layout = dagreD3.layout()
                // .nodeSep(100)   //50=default
                .edgeSep(15)   //10=default
                .rankSep(35)      //30=default
                .rankDir("LR"); //TB:top-to-bottom / BT:bottom-to-top / LR:left-to-right / RL:right-to-left 

  
  //Configuring the renderer-original:
  var renderinglayout = renderer.layout(layout)
              // .data([0,1])
              // .edgeTension(function(d,i) {return (i*.5)})
              // .edgeTension(.5)
              .edgeInterpolate("bundle")  // Bundle, linear, step-after, basis, cardinal, monotone..
              // .transition(500)
              // .zoom(false)
              .run(graph, svgGraph.select("g"));




////////////////////////////////////////////////////////////////// -------------------------------------

zooming(); 

function zooming() {
  
  zoom.scale(1);
  zoom.translate([0, 0]);

   //Centering the graphs depending on their size
  wGraph = renderinglayout.graph().width;
  hGraph = renderinglayout.graph().height;

  console.log("wGraph", wGraph);
  console.log("hGraph", hGraph);

  if ((hGraph>mainGraphHeight) || (wGraph>mainGraphWidth)) {

      console.log("factor WEIGHT"+(wGraph/mainGraphWidth));
      console.log("factor HEIGHT"+(hGraph/mainGraphHeight));

     if ((hGraph/mainGraphHeight)<(wGraph/mainGraphWidth)) {
        var scaleGraph = 1/(wGraph/mainGraphWidth);
        var transformeGraph = ((mainGraphWidth-wGraph)/2)*scaleGraph;
  
        console.log("WEIGH, soy más ancho que alto");
        console.log("scaleGraph", scaleGraph);
     }
     
     else {
        var scaleGraph = 1/(hGraph/mainGraphHeight);
        var transformeGraph = -((mainGraphHeight-hGraph)/2)*scaleGraph;

        console.log("HEIGHT, soy más alto que ancho");
        console.log("scaleGraph", scaleGraph);
        // console.log("transformeGraph", transformeGraph);
     }

     svgGraph.select("#grafo")
          .attr("transform", "translate(0,+"+(mainGraphHeight/2)+ ")")
          .transition()
          .duration(500)
          .attr("transform", "translate("+transformeGraph+",0) scale("+scaleGraph+") ");
      }



  else {
    var distanceX = (mainGraphWidth/2)-(wGraph/2);  
    var distanceY = (mainGraphHeight/2)-(hGraph/2)-20;  

     svgGraph.select("#grafo")
          .attr("transform", "translate(0,+"+(mainGraphHeight/2)+ ")")
          .transition()
          .duration(500)
          .attr("transform", "translate(" + distanceX +"," + distanceY + ")");  
  }

};






////////////////////////////////////////////////////////////////// -------------------------------------

mainGrafoInformation();

function mainGrafoInformation() {

   renderinglayout.eachNode(function(u, value) {
       console.log("VertexTypes " + u + ": " + JSON.stringify(value));
   });
    
  renderinglayout.eachEdge(function(e, u, v, value) {
     console.log("EdgeTypes " + e + ": " + JSON.stringify(value));
  });

}



  bindingData();

function bindingData() {

   //Binding Nodes&Edges DATA to the graph by iterating over the generated svg adding ATTRIBUTES:
   //Maybe I need data-attribute instead: http://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function

    d3.selectAll(".edgePath.enter")
      .data(newEdges)
      .attr("u", function(d) {
                  return d.u
              })
      .attr("v", function(d) {
                  return d.v
              })
      .attr("inArity", function(d) {
                  return d.value.inArity
              })
      .attr("outArity", function(d) {
                  return d.value.outArity
              })
      .attr("label", function(d) {
                  return d.value.label
              })
      .attr("module", function(d) {
            return d.value.module
              })
      .attr("propertyTypes", function(d) {
            return d.value.propertyTypes
              });


    d3.selectAll(".node.enter")
      .data(newVertex)
      .attr("module", function(d) {
                  return d.value.module
      })           
      .attr("label", function(d) {
                  return d.value.label
      })
      .attr("propertyTypes", function(d) {
      return d.value.propertyTypes
        })
      // .call(d3.behavior.drag())
      ;

};

    //TO DO in general: convert as much as possible on functions so the node/edges attributes can change in the future with no need of updating the code.

  

////////////////////////////////////////////////////////////


    // A. SOME DIAGRAPH FEATURES:
    console.log("Number of VERTEX on the Graph: " + graph.order());
    console.log("Number of EDGES on the Graph: " + graph.size());
    

    // EDGES/NODE LIST (general: all edges)
    console.log("All graph vertex: " + graph.nodes());
    console.log("All graph edges: " + graph.edges());


    // SUCCESORS, PREDECESSORS & NEIGHBORS -> LOCAL (node:node)
    // console.log(graph.successors("SubOntologies"));
    // console.log(graph.predecessors("GoSlims"));
    // console.log(graph.neighbors("GoTerm"));


    // SOURCES, SINKS -> GLOBAL (general:node)
    console.log("Graph sources: " + graph.sources()); // There"s no source on the graph due the self-linking GoTerm node
    console.log("Graph sinks: " + graph.sinks());


    // EXISTENCE OF EDGE (edge:true/false)
    // console.log(graph.hasEdge("GoSlim"));

    // SOURCE, TARGETS & INCIDENTS -> LOCAL  (edge:nodes)
     // console.log(graph.source("PositivelyRegulates"));
     // console.log(graph.target("GoSlim"));
     // console.log(graph.incidentNodes("SubOntology")) //source+target of the edge

    // console.log(graph.inEdges("GoSlims")); //all edges going in node10
    // console.log(graph.inEdges("SubOntologies")); //all edges going in node10


    ///////


    // B. SOME ALGOS FEATURES:

    // TARJAN: STRONGLY CONNECTED COMPONENTS
     console.log("tarjan algo:")
     console.log("finds all strongly connected components in the directed graph")

     console.log(tarjan(graph))
     //Array of components, each of them is itself an array with the ids. It gives lots of 1-array objetcs when there are no strongly connected components.


     // IS ACYCLIC, FIND CLYCLES
    // console.log("isAcyclic?")
     // console.log(isAcyclic(graph));    //Gives TRUE if the graph has no cycles and returns false if it does. -ERROR: if there are cycles gives Exception isntead of False.
     
     // alg.findCycles(graph)
     console.log("findCycles algo:")
     console.log("all nodes that are part of a cycle")
     console.log(findCycles(graph)); //Returns all nodes that are part of a cycle-> Arrays of these cycles if there are more.


     // TOPSORT: TOPOLOGICAL SORTING
     // var alg = require("graphlib").alg;
     // var topsort = require("graphlib").alg.topsort.
     // console.log(topsort(graph));  // If the graph has a cycle it is impossible to generate such a list and CycleException is thrown. ojo! cycles include self-linking nodes


     // DIJKSTRA & FLOYDWARSHALL: SHORTEST PATH
     // alg.dijkstra(g, source, [weightFunc], [incidentFunc])
     // console.log(dijkstra(graph, "GoTerm"));      //ERROR: anonymous function (in the js alg file)
     // alg.dijkstraAll(g, [weightFunc], [incidentFunc])
     // console.log(dijkstraAll(g));        //ERROR: anonymous function (in the js alg file)
     // alg.floydWarshall(g, [weightFunc], [incidentFunc])
     // console.log(floydWarshall(graph)); //Si funciona, xo da lista infinita de mySelectionCMenus

     // ALL CONNECTED COMPONENTS -----ERROR
     // console.log(components(g));    //NO FUNCIONA: anonymous function (in the js alg file)



////////////////////////////////////////////////////////////

//Color-code by module
d3.selectAll(".node rect")
    .style("fill", colorMod);


svgGraph.selectAll("#moduleTitle")
        .remove();

text = svgGraph.append("text")
          .attr("id", "moduleTitle")
          .attr("x", mainGraphWidth/2)
          .attr("y", mainGraphHeight - 30)
          .text("Graph representation: " + module + " module")
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("fill", colorMod)
          .style("text-anchor", "middle")
          .style("text-transform", "uppercase");

svgGraph.selectAll("#moduleInfo")
        .remove();

text2 = svgGraph.append("text")
          .attr("id", "moduleInfo")
          .attr("x", mainGraphWidth/2)
          .attr("y", mainGraphHeight - 15)
          .text(graph.order() + " vertex + " + graph.size() + " edges")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "normal")
          .attr("fill", colorMod)
          .style("text-anchor", "middle");



////////////////////////////////////////////////////////////




/*    // TEST1
    // nodes on click! Alert windows just to test everything is working or not:
    d3.selectAll(".node rect")
         .on("click", function(u, value) {
             console.log( "\n" + "Vertex "" + u + ""\n" + "My neighbors nodes are "" + graph.neighbors(u) + """ + "\n" + "Module: "" + graph.node(u).module + "" & PropertyTypes: "" + graph.node(u).propertyTypes + """)
          });*/



/*    //Trying to select by "id"
    d3.selectAll(".node.enter#GoTerm")
          .selectAll("rect")
          .style("fill", "red");  // works fine!*/

/*    //Trying to select by "id"
    d3.selectAll("#GoTerm")
          // .select("rect")
          .style("stroke", "red");  // works fine!*/

/*    //Trying to select by "id"
    d3.selectAll(".node.enter#SubOntologies")          
          .selectAll("rect")
          .style("fill", "brown");  // works fine*/

/*    //Trying to select by "id"
    var idd = d3.selectAll(".node.enter").attr("id"); // worng, just selects the attribute of the first element 
    d3.selectAll("#"+idd)          
          .selectAll("rect")
          .style("fill", "brown");   */

/*    //Trying to select by "id"
    d3.selectAll(".node.enter").each( function(d, i) {
        console.log( d3.select(this).attr("id") );        // works fine!
    });*/

/*    //Trying to select by "id"
    d3.selectAll(".node.enter").each( function(d, i) {
        idSelection = d3.select(this).attr("id");
    
        d3.selectAll("#"+idSelection)          
          .selectAll("rect")
          .style("fill", "brown");                      // works fine!

    });*/


/*     //Trying to select by "id"
    d3.selectAll(".node.enter").each( function(d, i) {
        
        idSelection = d3.select(this)
        graphStuff = graph.successors(idSelection).attr("id");
    
        console.log(graphStuff)

        d3.selectAll("#"+idSelection)          
          .selectAll("rect")
          .style("fill", "brown");          

    });  */


    
/* 
    //Trying to select by "id"
    idVertex = d3.selectAll("#GoSlims").attr("id")
 
    idSucessorsVertex = graph.successors(idVertex)
    idPredecessorsVertex = graph.predecessors(idVertex)
    idNeighborsVertex = graph.neighbors(idVertex)
    console.log(idNeighborsVertex)*/

/*    d3.selectAll("#"+ idPredecessorsVertex) 
      .selectAll("rect")
      .style("fill", "yellow");                     // works fine!*/
    
/*    d3.selectAll("#"+ idNeighborsVertex)      //by id just selects one. I might need a filter function
      .selectAll("rect")
      .style("fill", "red");                     // works fine!*/


/*
  // Understanding filtering selections
    d3.selectAll(".node.enter")
                    .filter(function(d) { 
                        selectingThis = d3.select(this)
                        if (selectingThis.attr("id") == idPredecessorsVertex ) {
                           console.log(selectingThis.attr("id"))     // returns #GoTerm

                        selectingThis.selectAll("rect")
                                         .style("fill", "green");     // works fine!  
                        }
                    })
 
 console.log(graph.predecessors("GoSlims"))



*/
              



/*  // Understanding filtering selections
  d3.selectAll(".node.enter")
              .filter(function(d) { 
                  selectingThis = d3.select(this)
                  // myArray = JSON.stringify(["GoSlims", "GoTerm"])
                  myArray = ["GoSlims", "GoTerm"]
                  singleElement = "SubOntologies"
                 
                  if (selectingThis.attr("id") == "SubOntologies"  || selectingThis.attr("id") == "GoSlims" ) {
                      
                      console.log(selectingThis.attr("id"))  
                      selectingThis.selectAll("rect")
                                   .style("fill", "red");         
                  }
                  
                  else { console.log("buuu") }              // WORKS!! :D
              })*/
               

/*  // Understanding filtering selections-comparison with MULTIPLE elements
  d3.selectAll(".node.enter")
              .filter(function(d) { 
                  selectingThis = d3.select(this)
                  // myArray = JSON.stringify(["GoSlims", "GoTerm"])
                  myArray = ["GoSlims", "GoTerm"]
                  singleElement = "SubOntologies"
                  mySelectionCMenuRara = selectingThis.attr("id")
                  
                  //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                  if (myArray.indexOf(mySelectionCMenuRara) >= 0)  {
                      
                      console.log(selectingThis.attr("id"))  
                      selectingThis.selectAll("rect")
                                   .style("fill", "red");         
                  }
                  
                  else { console.log("buuu") }              // WORKS!! :D
              })

*/

/*  // Understanding filtering selections
  d3.selectAll(".node.enter")
              .filter(function(d) { 
                  selectingThis = d3.select(this)
                  selectingThisId = selectingThis.attr("id")

                  myArray = ["GoSlims", "GoTerm"]
                  
                  //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                  if (myArray.indexOf(selectingThisId) >= 0)  {
                      
                      console.log(selectingThisId)  
                      selectingThis.selectAll("rect")
                                   .style("fill", "red");         
                  }
                  
                  else { console.log("buuu") }              // WORKS!! :D
              })*/


/*if (["banana", "lemon", "mango", "pineapple"].indexOf(fruit) >= 0) {
  .......
}*/

/*
    idVertex = d3.selectAll("#GoSlims").attr("id")

    idSucessorsVertex = graph.successors(idVertex)
    idPredecessorsVertex = graph.predecessors(idVertex)
    idNeighborsVertex = graph.neighbors(idVertex)

  // all together: graphlib features + filter + arrays
  d3.selectAll(".node.enter")
              .filter(function(d) { 
                  selectingThis = d3.select(this)
                  selectingThisId = selectingThis.attr("id")

                  myArray = idNeighborsVertex
                  
                  //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                  if (myArray.indexOf(selectingThisId) >= 0)  {
                      
                      console.log(selectingThisId)  
                      selectingThis.selectAll("rect")
                                   .style("fill", "orange");         
                  }
                  
                  else { console.log("buuu") }              // WORKS!! :D
              })

    console.log(idNeighborsVertex)

    //NOTE: for an in/out switch button i should access the successors/predecessors i times (i = degree)


*/


    //TOOLTIPS WORLD:

    //1. Default browser tooltip
/*    d3.selectAll(".node rect")
        .append("title")
        .text(function(u) {
              return "Click to see "" + u + """ Neighbor vertex";       //WORKS :)
        });*/



    //2. SVG Element Tooltips
   /* d3.selectAll(".node rect")
        .on("mouseover", function(d) {
        var xPosition = parseFloat(d3.select(this).attr("x")) + d3.select(this)[0][0].getCTM().e;      
        var yPosition = parseFloat(d3.select(this).attr("y")) + d3.select(this)[0][0].getCTM().f;

        // console.log(xPosition);
        // console.log(yPosition);
        
        ParentNode = d3.select(this)[0][0].parentNode;
        console.log(ParentNode);
        ParentNodeID = ParentNode.id;
        console.log(ParentNodeID);

        svgGraph.append("text")
              .attr("id", "tooltip")
              .attr("x", xPosition + 50)
              .attr("y", yPosition -10)
              .attr("text-anchor", "middle")
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .attr("font-weight", "normal")
              .attr("fill", "#ED553B")
              .text(function(u) {                
                    return "Click to see "" + ParentNodeID + """ Neighbor vertex";     
              });
        })

        .on("mouseout", function() {
              d3.select("#tooltip").remove()
        });*/

        //NOTE; when working with ".node" class the graph features dont work any more. Everything must be done with ".node rect", and accessing the data through .parentNode when neeeded.
    

/*    //3. HTML div Tooltips
    d3.selectAll(".node rect")
         .on("mouseover", function(d) {

          //Get this bar"s x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x"));
          var yPosition = parseFloat(d3.select(this).attr("y"));

          //Update the tooltip position and value
          d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")           
            .select("#value")
            .text(function(u) {
                return "Click to see "" + u + """ Neighbor vertex";     
             });
         
          //Show the tooltip
          d3.select("#tooltip").classed("hidden", false);

         })

         .on("mouseout", function() {
         
          //Hide the tooltip
          d3.select("#tooltip").classed("hidden", true);

          });*/

////////////////////////////////////////////
  
  //trying to connect the modules color with the graph colors. IN PROGRES--------->>>>
/*  var 1level = d3.select(this.parentNode).attr("id");

  var fillingNodes = function(d) {
    return d3.select("#"+ 1level).attr("fill");
  
    }

    d3.selectAll(".node rect")
      .style("fill", fillingNodes);
*/


////////////////////////////////////////////

// ROUTE MAP:

/*svgRouteMap = d3.select("svg#svg-routemap");

RouteMap = svgRouteMap.select("g")
                      .append("g")
                      .attr("id", "RouteMap");*/


  /*  var textFeatures = d3.select("#svg-dagred3graph")
                            .selectAll("text")
                            .data(GraphFeatures)
                            .enter()
                            .append("text")
                            .text(function(d) {
                                  return d;
                                })
                            .attr("x", 20)
                            .attr("text-anchor", "middle")
                            .attr("y", 65 )
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "14px");*/


// Selecting from a list of graphlib options to interact
/*var GraphFeatures = ["idNeighborsVertex", "idSuccessorsVertex", "idPredecessorsVertex"];

    var textFeatures = d3.select("#svgMainRoute")
          .selectAll("text")
          .data(GraphFeatures)
          .enter()
          .append("text")
          .attr("id", "GraphFeatures")
          .attr("x", 10)
          .attr("y", function(d,i) { return 160 + i*15 })
          .text(function(d) { return d; })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("font-weight", "regular")
          .attr("fill", "ED553B")

          .on("click", function(d,i) {
              myArray = d;
              console.log(myArray);
 
              // return Options();
          });*/
  
  arity();

  //GRAPH FEATURES ON CLICK
  // Implemented: now on click 
d3.selectAll(".node rect")
       .on("click", function(u, value) {
        // console.log(myArray);

        //Adding some little interaction!!
        selected = d3.select(this);

        selected2 = d3.select(this.parentNode);
        selected2Id = selected2.attr("id");

        svgGraph.append("circle")
                    .attr("cx", selected[0][0].getCTM().e)
                    .attr("cy", selected[0][0].getCTM().f)
                    .attr("r", 0)
                    .style("fill", colorMod)
                    .transition()
                    .attr("cx", 50)
                    .attr("cy", 50)
                    .attr("r", 5)
                    .style("opacity", .8);

        svgGraph.append("rect")
                    .attr("x", selected[0][0].getCTM().e)
                    .attr("y", selected[0][0].getCTM().f)

                    .attr("width", selected.attr("width"))
                    .attr("height", selected.attr("height"))

                    .attr("rx", selected.attr("rx"))
                    .attr("ry", selected.attr("ry"))
                    .style("opacity", .01)
                    .style("fill", colorMod)
                    .transition()
                    .duration(500)
                    .style("opacity", .8)

                    .attr("x", 580)
                    .attr("y", 300)

                    .attr("rx", 20)
                    .attr("ry", 20);

        graph.addNode("A", {label: "a label"});

        graph.addNode("lALALALALA", {label: "lALALALALA", module:"goo", propertyTypes:"id, lalala"});
        console.log("All graph vertex: " + graph.nodes());
        // graph.addEdge(null, "A", selected2Id,  {label: "labelll fake"});
        
        graph.addEdge("id-blabla?", "A", selected2Id,  {u:"A", v: selected2Id, inArity:"one", outArity:"many", label: "labelll fake", module:"blabla", propertyTypes:"X"});
        // graph.addEdge(null, "A", "lALALALALA");

        // graph.delNode("GoSlims")
        console.log("All graph vertex: " + graph.nodes());

///////////////////////////// AGAIN MAIN LAYOUT FUNCTIONS?

  //alter the drawEdges function:
/*  var oldDrawEdge = renderer.drawEdgePaths();
  renderer.drawEdgePaths(function(graph, root) {

    console.log(d3.selectAll("svgEdgePaths"));

    var svgEdgePaths = oldDrawEdge(graph, root);
    svgEdgePaths.attr("id", function(e) { return  e })
    return svgEdgePaths;

  });*/




  //Configuring the layout:
  var layout = dagreD3.layout()
                //.nodeSep(50)  //50=default
                //.edgeSep(10)
                //.rankSep(20);   //Separation between levels, childs
                .rankDir("LR"); //TB:top-to-bottom / BT:bottom-to-top / LR:left-to-right / RL:right-to-left 

  // Custom transition function
  function transition(selection) {
    return selection.transition().duration(1000);
  }

  renderer.transition(transition).run(graph, svgGraph.select("g"));



d3.selectAll(".edgePath path")
    .style("stroke", colorMod);

d3.selectAll(".node rect")
    .style("fill", colorMod);


bindingData();
arity();
zooming(); 


 /* 
 /////////////////////////////////////////////

          // UPDATE to normal status
          d3.selectAll(".node rect")
             .style("fill", colorMod)
             .style("opacity", .4)
             .style("stroke", "#999")
             .style("stroke-width", 1);
          d3.selectAll(".node text") 
              .style("font-weight", "normal")
              .style("font-size", "14px")
              .style("opacity", 1);

          // HIGHLIGHT the vertex clicked
          d3.select(this)
            .style("stroke", "#ED553B")
            .style("stroke-width", 4);


          //GRAPH Features Possibilities
          idNeighborsVertex = graph.neighbors(u)
          // console.log(idNeighborsVertex) 

          idSuccessorsVertex = graph.successors(u)
          console.log(idNeighborsVertex) 

          idPredecessorsVertex = graph.predecessors(u)
          // console.log(idNeighborsVertex) 
    

          d3.selectAll(".node.enter")
            .filter(function(d) { 
                selectingThis = d3.select(this)
                selectingThisId = selectingThis.attr("id")

                myArray = idNeighborsVertex
                // myArray = idSuccessorsVertex
                // myArray = idPredecessorsVertex

                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                if (myArray.indexOf(selectingThisId) >= 0)  {
                    
                    // console.log(selectingThisId)  
                    selectingThis.selectAll("rect")
                                  .transition(400)
                                  // .style("fill", "orange")
                                  .style("opacity", .8);         

                }
                
                // else { console.log("buuu") }              // WORKS!! :D
                else { selectingThis.selectAll("rect")
                                  .transition(400)
                                  .style("opacity", .1);      
                        selectingThis.selectAll("text")
                                  .transition(400)
                                  // .attr("text-anchor", "middle")
                                  .style("opacity", .1);      
                 };             
            })

          d3.select(this)
                .transition(400)
                .style("opacity", .8);

          // console.log(d3.select(this)[0][0].parentNode);
          // console.log(d3.select(this.parentNode));
          
          d3.select(this.parentNode).selectAll("text")
                                    .transition(400)
                                    // .style("font-size", "16px")
                                    .style("font-weight", "bold")
                                    .style("opacity", 1);

////////////////////////////////////////////////
*/




        // INDEXES-PROPERTIES INFO                            
        //Accessing to the properties info through .parentNode      
        ParentNode2 =  d3.select(this.parentNode);
        ParentNode2Label = ParentNode2.attr("label");
        ParentNode2Properties = ParentNode2.attr("propertyTypes");

        console.log(ParentNode2.attr("propertyTypes"));

        //removing previous text
        svgRouteMap.selectAll(".VertexIndexProperties") 
                    .remove();         
  
        //adding INDEX info
        svgRouteMap.append("text")
          .attr("class", "VertexIndexProperties")
          .attr("x", function(d,i) { return i + 20 })
          .attr("y", function(d,i) { return i + 20 })
          .attr("text-anchor", "left")
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("fill", colorMod)
          .text(function(u) {                
                return (ParentNode2Label);     
          })

        //adding PROPERTIES info
        svgRouteMap.append("text")
          .attr("class", "VertexIndexProperties")
          .attr("x", function(d,i) { return i + 20 })
          .attr("y", function(d,i) { return i + 35 })
          .attr("text-anchor", "left")
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("font-weight", "normal")
          .attr("fill", colorMod)
          .text(function(u) {                
                if (ParentNode2Properties.length == 0) { 
                  return ("PropertyTypes: none ") ;
                }                
                else { 
                  return ("PropertyTypes:  " + ParentNode2Properties) ;
                };
          });



        ////////////////////////////////////



        //PATH DRAWING STARTING

/*        d3.selectAll("selectedEdge")
          .style("fill", "none");*/

/*        var d = d3.select(this);
        // console.log(function(u, value) {return graph.inEdges(d)});

        var findingEdgesId = graph.inEdges(u);
        d3.select("#"+ findingEdgesId)
          .attr("class", "selectedEdge");
          // .style("stroke-width", "4px")

        console.log(findingEdgesId);*/


        });




 // }

/*    d3.selectAll(".node rect")
         .on("click", function(u, value) {
             d3.selectAll(graph.neighbors(u))
                    .style("stroke", "red")
          });*/

/*    // Accessing to attributes/classes -- WORKS
    d3.selectAll(".node.enter")
         .on("click", function(u, value) {
            if(d3.select(this).attr("id") == "GoTerm") {
              return console.log("yes, I am " + d3.select(this).attr("id") ) 
            }
            else { return console.log("no,  I am not GoTerm" )
            }
          // All this if/else code is equivalent to this single line:
          // return d3.select(this).attr("id") == "GoTerm" ? console.log("yes") : console.log("no")
          });
*/


/*    // Reading attributes/classes -- WORKS
    d3.selectAll(".node.enter")
         .on("click", function(u, value) {
              var ll = d3.select(this)
              console.log( ll.attr("propertyTypes") + ll.attr("label") + ll.attr("style") )
                      
          });*/

/*
    d3.selectAll(".node rect")
         .on("mouseover", function(){ 
                d3.select(this)
                  .attr("width", 100)
                  .attr("heigh", 100)
         });*/

/*    d3.selectAll(".node rect")
         .on("mouseover", function(){ 
                var ww = d3.select(this).attr("width")
                
                d3.select(this)
                  .attr("width", (+ww + 20))
         });*/





    d3.selectAll(".edgePath path")
         .on("click", function(e, u, v, value) {
             alert("hola" + e[0] +
              "Edge '" + e + "'\n" + "Source: '" + graph.source(e) + "' -> Target: '" + graph.target(e) + "'" + "'\n" + "\n" + "Module: '" + graph.edge(e).module + "'' , PropertyTypes: '" + graph.edge(e).propertyTypes + "' & inArity/OutArity: '" + graph.edge(e).inArity + "/" + graph.edge(e).outArity + "'");
         })

/*    d3.selectAll("[id=GoTerm]")
          .selectAll("rect")
          .style("fill", "brown");*/

/*    d3.selectAll(".edgePaths")
      .style("stroke", "green");*/

/*    d3.selectAll("[label=GoSlim]")
      // .selectAll("rect")
      .style("stroke", "red");*/

/*    d3.selectAll("[id=GoSlim]")
      .selectAll("path")
      .style("stroke", "brown");*/

/*    d3.selectAll("[id=PositivelyRegulates]")
          .selectAll("path")
          .style("stroke", "blue");

    d3.selectAll("[label=iSa]") 
           .selectAll("path")
           .style("stroke", "green");*/
    
/*      d3.selectAll(".edgePaths")
        .selectAll("[label=SubOntology]")    //works
          .style("stroke", "blue");*/

/*      d3.selectAll(".edgePaths")
        .selectAll("[v=SubOntologies]")     //works
          .style("stroke", "blue");*/

      // d3.selectAll(".edgePaths")
/*        d3.selectAll("[outArity=one]")    
        .style("stroke", "blue");*/


////////////////////////////

  //ARITY-MARKER-END
  //Re-doing arrowheads:
  d3.select("#arrowhead")
    .select("path").remove();

  d3.select("#arrowhead")
      .attr("viewBox", "-1 -5 2 10")
      .attr("refX", 0)
      .attr("refY", 0)
      // .attr("markerUnits", 30)
      .attr("markerWidth", 15)
      .attr("markerHeight", 25)
      .attr("orient", "auto")
      .attr("style", "fill: orange")
      .append("svg:path")
        .attr("d", "M 0,0 m -5,-5 L 1,-5 L 1,5 L -5,5 Z");




function arity() {

  //Some generic parameters for arity paths
  var patron = /[^\d^.]/;
  var offset = 2.5;

  //Removing previous arity paths
  d3.selectAll("path.manymanyOuter").remove();
  d3.selectAll("path.onemanyOuter").remove();
  d3.selectAll("path.manyoneOuter").remove();
  d3.selectAll("path.oneoneOuter").remove();

  //also legend:
  d3.selectAll("path.pathLegend").remove();
  d3.selectAll("path.edgePathLe").remove();
  
  d3.selectAll("#pathLegend0").remove();
  d3.selectAll("#pathLegend1").remove();
  d3.selectAll("#pathLegend2").remove();
  d3.selectAll("#pathLegend3").remove();

    var arities = d3.selectAll(".edgePath").each( function(d,i) {
    OUTarityInfo = d3.select(this).attr("outArity");
    INarityInfo = d3.select(this).attr("inArity");
    arityInfo = OUTarityInfo + "-" + INarityInfo;
    console.log(arityInfo);
    arityStrokeWidth = .3;
    offset = 3;
    n = 9;
    // 2 steps: n=5
    // 3 steps: n=7
    // 4 steps; n=9

    if (arityInfo == "one-one") {
     var oneOne = d3.select(this);

    return oneOne.style("stroke", colorMod)
                  .style("stroke-width", (+arityStrokeWidth+.1));
    }



    if (arityInfo == "many-many") {
      var manyMany = d3.select(this);
      // console.log(manyMany);



    return manyMany.style("stroke", colorMod)
                      .each( function(d, i) {
                            allPath = d3.select(this);     
                            allPathData = allPath.selectAll("path").attr("d");
                            
                            allPathDataId = allPath.attr("id");
                            console.log("allPathDataId", allPathDataId);
       
                          return svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                .attr("d", allPathData)
                                // .transition(4500)
                                .attr("transform", "translate(0," + offset + ")")
                                .style("stroke-width", arityStrokeWidth)
                                .attr("class", "manymanyOuter")
                                .attr("id", "pathOuter"+allPathDataId)
                                .style("stroke", "white")
                                .transition().duration(1000)
                                .style("stroke", colorMod)
                                .style("fill", "none"),
                                // .attr("marker-end", "url(#arrowhead)"),

                        svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                .attr("d", allPathData)
                                // .transition(4500)
                                .attr("transform", "translate(0," + (-offset) + ")")
                                .style("stroke-width", arityStrokeWidth)
                                .attr("class", "manymanyOuter")
                                .attr("id", "pathOuter2"+allPathDataId)
                                .style("stroke", "white")
                                .transition().duration(1000)
                                .style("stroke", colorMod)
                                .style("fill", "none");
                                // .attr("marker-end", "url(#arrowhead)"),

                        //Removing marker-end of self-linking nodes as has no sense on them
                        svgGraph.selectAll("g.edgePath.enter")
                                .filter(function(d) {
                                  console.log("doing something with self-linking nodes")
                                  console.log("u", d3.select(this).attr("u"))
                                  console.log("v", d3.select(this).attr("v"))

                                  if ((d3.select(this).attr("u")) == (d3.select(this).attr("v"))) {
                                    return d3.select(this)
                                            .selectAll("path")
                                            .attr("marker-end", "none");
                                  }
                               });

              
              })    





     // console.log(graph.node(graph.incidentNodes(e)[0]));

       // console.log(d3.select("_8").selectAll("path").attr("d"));

      /* tooma = d3.selectAll("path").attr("d");
       console.log(tooma);*/

        //Selecting d info of edgepaths
      /*    d3.selectAll("path").each( function(d, i) {
              allPathData = d3.select(this).attr("d");     
              console.log(allPathData);
              allPathData.selectAll("")
              // console.log(allPathData.length)
              // return drawPath()
              // var dPath8 = d3.select("_8").attr("d");   
          });*/
       
    
    }

        //Selecting d info of edgepaths
          /*d3.selectAll(".edgePath").each( function(d, i) {
              allPath = d3.select(this);     
              // console.log(allPath);
              allPathData = allPath.selectAll("path").attr("d");
              // console.log(allPathDataD)
              // path8 = allPath.select("_8").selectAll("path").attr("d");
              // console.log(path8);
              // console.log(allPathData.length)
              // return drawPath()
              // var dPath8 = d3.select("_8").attr("d");   
          });
*/
      /*function drawPath() {
      svgModules.append("path")
                  .data(allPathData)
                  .enter()
                  .attr("d", function(d) { return d} )
                  .style("stroke-width", 1)
                  .style("stroke", "red")
                  .style("fill", "none")
                  .style("fill", "none"); 
      }

      // var edgeData = [  ];






        // .attr("transform", "translate(0,5)");
/*            .attr("transform", function(d,i) {
                        "translate(0," + i*2 + ")"
                      });*/
    
                    // .style("stroke-width", "2");

/*                    .selectAll("circle")
                    .data([0,1,2,3])
                    .enter()
                    .append("circle")
                    .attr("transform", function(d,i) {
                        "translate(0," + d*2 + ")"
                      }); */

/*                    .select("url#arrowhead")
                    .remove();*/                //doesn"t work yet
                   

/*      var pathEl = manyMany.node();

      var pathLength = pathEl.getTotalLength();
      console.log("path length: ", pathLength);

      var pathPoint = pathEl.getPointAtLength(pathLength*0.8);
*/


    

    if (arityInfo == "many-one") {
      var manyOne = d3.select(this);
      return manyOne.style("stroke", colorMod)
                 .each( function(d, i) {
                          allPath = d3.select(this);     
                          allPathData = allPath.selectAll("path").attr("d");
                          console.log(allPathData);

                          allPathDataId = allPath.attr("id");

            var patronNums = /[^\d^.]/;
            var patronSymbols = /\d+\.?/;


////////////////////////

            //Case MANY-ONE
            var PathListNums4Down = allPathData.split(patronNums);

            var SubontolyPath4 = allPathData.replace(/\./g,"");
            var PathListSymbols = SubontolyPath4.split(patronSymbols);
            var i, longitud;
            for (i = 0, longitud = PathListSymbols.length; i < longitud; i++){
                if ((i%2 == 0) && (i<n)) {
                    PathListNums4Down[i] -= -offset;
                }
                else {
                    PathListNums4Down[i] =  PathListNums4Down[i]; 
                }
            }


            var SubontolyPathManyOneDown = "";
            for (i = 1, longitud = PathListSymbols.length; i < longitud; i++){
                SubontolyPathManyOneDown = SubontolyPathManyOneDown+PathListSymbols[i-1]+PathListNums4Down[i];
            }

            console.log("SubontolyPathManyOneDown", SubontolyPathManyOneDown);          


/////////////////////////////////////////////
 
            var PathListNums4Up = allPathData.split(patronNums);
            
            console.log("PathListNums4Up", PathListNums4Up);

            var SubontolyPath4 = allPathData.replace(/\./g,"");
            var PathListSymbols = SubontolyPath4.split(patronSymbols);
            console.log("PathListSymbols", PathListSymbols);

            var i, longitud;
            for (i = 0, longitud = PathListSymbols.length; i < longitud; i++){
                if ((i%2 == 0) && (i<n)) {
                    PathListNums4Up[i] -= +offset;
                }
                else {
                    PathListNums4Up[i] =  PathListNums4Up[i]; 
                }
            }


            var SubontolyPathManyOneUp = "";
            for (i = 1, longitud = PathListSymbols.length; i < longitud; i++){
                SubontolyPathManyOneUp = SubontolyPathManyOneUp+PathListSymbols[i-1]+PathListNums4Up[i];
            }

            console.log("SubontolyPathManyOneUp", SubontolyPathManyOneUp)

//////////////////////////////////////////////////// 



                        return svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathManyOneDown)
                                        // .attr("transform", "translate(0,3)")
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "manyoneOuter")
                                        .attr("id", "pathOuter"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none"),
                                        // .attr("marker-end", "url(#arrowhead)"),

                        svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathManyOneUp)
                                        // .attr("transform", "translate(0,-3)")
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "manyoneOuter")
                                        .attr("id", "pathOuter2"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none");
                                        // .attr("marker-end", "url(#arrowhead)"),

                        //Removing marker-end of self-linking nodes as has no sense on them
/*                        svgGraph.selectAll("g.edgePath.enter")
                                .filter(function(d) {
                                  console.log("doing something with self-linking nodes")
                                  console.log("u", d3.select(this).attr("u"))
                                  console.log("v", d3.select(this).attr("v"))

                                  if ((d3.select(this).attr("u")) == (d3.select(this).attr("v"))) {
                                    return d3.select(this)
                                            .selectAll("path")
                                            .attr("marker-end", "none");
                                  }
                               });*/

                          })
                          }
    

  if (arityInfo == "one-many") {
      var oneMany = d3.select(this);
      return oneMany.style("stroke", colorMod)
                    .each( function(d, i) {
                          allPath = d3.select(this);     
                          allPathData = allPath.selectAll("path").attr("d");
                          console.log(allPathData);

                          allPathDataId = allPath.attr("id");


            var patronNums = /[^\d^.]/;
            var patronSymbols = /\d+\.?/;


////////////////////////

            //Case ONE-MANY
            var PathListNums3Down = allPathData.split(patronNums);

            var SubontolyPath2 = allPathData.replace(/\./g,"");
            var PathListSymbols = SubontolyPath2.split(patronSymbols);
            var i, longitud;
            for (i = 0, longitud = PathListSymbols.length; i < longitud; i++){
                if ((i%2 == 0) && (i>(PathListSymbols.length-n))) {
                    PathListNums3Down[i] -= -offset;
                }
                else {
                    PathListNums3Down[i] =  PathListNums3Down[i]; 
                }
            }


            var SubontolyPathOneManyDown = "";
            for (i = 1, longitud = PathListSymbols.length; i < longitud; i++){
                SubontolyPathOneManyDown = SubontolyPathOneManyDown+PathListSymbols[i-1]+PathListNums3Down[i];
            }

            console.log("SubontolyPathOneManyDown", SubontolyPathOneManyDown);          


/////////////////////////////////////////////
 
            var PathListNums3Up = allPathData.split(patronNums);
            
            console.log("PathListNums3Up", PathListNums3Up);

            var SubontolyPath3 = allPathData.replace(/\./g,"");
            var PathListSymbols = SubontolyPath3.split(patronSymbols);
            console.log("PathListSymbols", PathListSymbols);

            var i, longitud;
            for (i = 0, longitud = PathListSymbols.length; i < longitud; i++){
                if ((i%2 == 0) && (i>(PathListSymbols.length-n))) {
                    PathListNums3Up[i] -= +offset;
                }
                else {
                    PathListNums3Up[i] =  PathListNums3Up[i]; 
                }
            }


            var SubontolyPathOneManyUp = "";
            for (i = 1, longitud = PathListSymbols.length; i < longitud; i++){
                SubontolyPathOneManyUp = SubontolyPathOneManyUp+PathListSymbols[i-1]+PathListNums3Up[i];
            }

            console.log("SubontolyPathOneManyUp", SubontolyPathOneManyUp)

//////////////////////////////////////////////////// 
                              
  

                          return svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathOneManyDown)
                                        // .attr("transform", "translate(0,3)")
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "onemanyOuter")
                                        .attr("id", "pathOuter"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none"),
                                        // .attr("marker-end", "url(#arrowhead)"),

                          svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathOneManyUp)
                                        // .attr("transform", "translate(0,-3)")
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "onemanyOuter")
                                        .attr("id", "pathOuter2"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none");
                                        // .attr("marker-end", "url(#arrowhead)"),
                        
                          //Removing marker-end of self-linking nodes as has no sense on them
/*                          svgGraph.selectAll("g.edgePath.enter")
                                  .filter(function(d) {
                                    console.log("doing something with self-linking nodes")
                                    console.log("u", d3.select(this).attr("u"))
                                    console.log("v", d3.select(this).attr("v"))

                                    if ((d3.select(this).attr("u")) == (d3.select(this).attr("v"))) {
                                      return d3.select(this)
                                              .selectAll("path")
                                              .attr("marker-end", "none");
                                  }
                               });*/
        
/*                                  svgGraph.append("path")
                                  // .data(example)
                                  // .enter()
                                  // .attr("d", function(d) { return d} )
                                  .attr("d", allPathData)
                                  .style("stroke-width", .3)
                                  .attr("class", "onemanyOuter")
                                  .style("stroke", colorMod)
                                  .style("fill",  colorMod)
                                  .style("fill", "none"),
                              

                           oneMany.remove();*/

                            })
                        }


  })



// var offset2 = 4;
var offset2 = offset;

var verticalSeparation = 25;

svgGraph.selectAll("#legendPath")
        .remove();
svgGraph.selectAll("#legendText")
        .remove();
svgGraph.selectAll("#arityTitle")
        .remove();

////LEYEND
//TO DO: CONVERT TO PATHS AND TRANSFORM THEM
/*svgGraph.selectAll("rect2")
          .data([colorMod, "green", "brown"])
          .enter()
          .append("rect")
          .attr("id", "legendRect")
          .attr("x", 500)
          .attr("y", function(d, i) { return 50 + (i*15) })
          .attr("width", 30 )
          .attr("height", .8 )
          .style("fill", function(d) {return d });*/

var classes = ["many-many", "many-one", "one-many", "one-one"];

// svgGraph.select("g.edgePaths").selectAll("pathLegend")

svgGraphLegend.selectAll("pathLegend")
          .data(classes)
          .enter()
          .append("path")
          .attr("id", function(d,i) {return "pathLegend"+i })
          .attr("class", "edgePathLegend")
          .attr("arityInfo", function(d,i) {return d})
          // .style("strokewidth", 1)
          .attr("d", function(d, i) { 
            var Ycord = +50 + (i*verticalSeparation);
            return "M480," + Ycord + "L530," + Ycord  })
          .style("stroke-width", .3)          
          .style("stroke", colorMod)
          .attr("marker-end", "url(#arrowhead)");

//Many-many legend
var manyManyLegendInfo = d3.select("#pathLegend0").attr("d");
console.log(manyManyLegendInfo);

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", manyManyLegendInfo)
        .attr("transform", "translate(0," + offset + ")")
        .style("stroke", colorMod)
        .style("stroke-width", .3);

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", manyManyLegendInfo)
        .attr("transform", "translate(0," + (-offset) + ")")
        .style("stroke", colorMod)
        .style("stroke-width", .3);


//Many-one legend
var manyOneLegendInfo = d3.select("#pathLegend1").attr("d");
console.log(manyOneLegendInfo);

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        // .attr("d", "M480,"+(75+offset2)+"75,510,L530,75")
        .attr("d", "M480,"+(75+offset2)+",510,75L530,75")
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .style("fill", "none");

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,"+(75-offset2)+",510,75L530,75")
        // .attr("d", "M480,"+(75-offset2)+"75,510,L530,75")
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .style("fill", "none");


//One-many legend
var oneManyLegendInfo = d3.select("#pathLegend2").attr("d");
console.log(oneManyLegendInfo);

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,100,500,100L530," + (+100+offset2))
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .style("fill", "none");

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,100,500,100L530," + (+100-offset2))
        .style("stroke", colorMod)
        .style("stroke-width", .3)        
        .style("fill", "none");


//One-one legend
var oneOneLegendInfo = d3.select("#pathLegend3").attr("d");
console.log(oneOneLegendInfo);

svgGraphLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", oneOneLegendInfo)
        .style("stroke", colorMod)
        .style("stroke-width", .3);


//Arity titles
svgGraphLegend.selectAll("text2")
          .data(["many-many", "many-one", "one-many", "one-one"])
          .enter()
          .append("text")
          .attr("id", "legendText")
          .attr("x", 545)
          .attr("y", function(d, i) { return 53 + (i*verticalSeparation) })
          .text(function(d) { return d})
          .attr("text-anchor", "left")
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px");

svgGraphLegend.append("text")
          .attr("id", "arityTitle")
          .attr("x", 545)
          .attr("y", 30)
          .text("ARITY")
          .attr("text-anchor", "left")
          .attr("font-family", "sans-serif")
          .attr("font-size", "13px");
};


////////////////////////////////////

//Parameters for context menu
var mySelectionCMenu;
var id;


  d3.selectAll(".node rect")
       .on("mousedown", function(u, value) {
      mySelectionCMenu = u;
      id = d3.select(this);

      // UPDATE to normal status
      d3.selectAll(".node rect")
         .attr("transform", "scale(1)")
         .style("fill", colorMod)
         .style("opacity", .4)
         .style("stroke", "#999")
         .style("stroke-width", 1);
      d3.selectAll(".node text") 
          .style("font-weight", "normal")
          .style("font-size", "14px")
          .style("opacity", 1);

      d3.selectAll(".edge path")  
          .style("opacity", 1); 

      // HIGHLIGHT the vertex clicked
      d3.select(this)
          .style("opacity", .8)     
          .style("stroke", "#ED553B")
          .style("stroke-width", 4);


      d3.select(this)
            .transition(400)
            .attr("transform", "scale(1.1)")
            .style("opacity", .8);

      // console.log(d3.select(this)[0][0].parentNode);
      // console.log(d3.select(this.parentNode));
      
      d3.select(this.parentNode).selectAll("text")
                                .transition(400)
                                // .style("font-size", "16px")
                                .style("font-weight", "regular")
                                .style("opacity", 1);

        // console.log(function(u, value) {return graph.inEdges(d)});

/*        var findingEdgesId = graph.inEdges(u);
        d3.select("#"+ findingEdgesId)
          .attr("class", "selectedEdge");
          // .style("stroke-width", "4px")

        console.log(findingEdgesId);*/

     });
     

// +info here http://www.trendskitchens.co.nz/jquery/contextmenu/
// CONTEXT MENU

   //right click menu items
    $("g.nodes").contextMenu("cntxtMenu",
    {
        itemStyle: {
            fontFamily : "sans-serif",
            fontSize: "12px",
       
/*            backgroundColor : "#666",
            color: "white",*/
            border: "none",
            padding: "0px"
        },
         shadow: false,

         itemHoverStyle: {
            // color: "#fff",
            backgroundColor: "lightgrey",
            border: "none"
        },

        bindings:
        {
            "neighbour": function(u) {

                //GRAPH Features Possibilities
                idNeighborsVertex = graph.neighbors(mySelectionCMenu)
                console.log("idNeighborsVertex", idNeighborsVertex) 

               return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                myArray = idNeighborsVertex

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(selectingThisId) >= 0)  {
                                                                            
                                    console.log("selectingThisId", selectingThisId)  
                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8);
                               
                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)
                                console.log("mySelectionCMenu", mySelectionCMenu)
                                console.log("incidentEdgesmySelectionCMenu", incidentEdgesmySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .style("opacity", 1); 
                                              }
                                            })                                                                 
                                }

                                else {       
                                        selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .1);      
                                        selectingThis.selectAll("text")
                                                  .transition(400)
                                                  .style("opacity", .1); 

                                //SelectingThis edges filtering
                                dismissedNodes = selectingThis.attr("id");
                                incidentEdges = graph.incidentEdges(dismissedNodes)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdges.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", .2); 
                                              }
                                            })   

                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", 1); 
                                              }
                                            })  

                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8); 

                                d3.select("#"+mySelectionCMenu).selectAll("text")
                                .transition(400)
                                // .style("font-size", "16px")
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };             
                            })
            },

             "predecessors": function(d) {
                
                //GRAPH Features Possibilities
                idPredecessorsVertex = graph.predecessors(mySelectionCMenu)
                console.log("idPredecessorsVertex", idPredecessorsVertex) 

                return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                myArray = idPredecessorsVertex

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(selectingThisId) >= 0)  {
                                                                            
                                    console.log("selectingThisId", selectingThisId)  
                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8);
                               
                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)
                                console.log("mySelectionCMenu", mySelectionCMenu)
                                console.log("incidentEdgesmySelectionCMenu", incidentEdgesmySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .style("opacity", 1); 
                                              }
                                            })                                                                 
                                }

                                else {       
                                        selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .1);      
                                        selectingThis.selectAll("text")
                                                  .transition(400)
                                                  // .attr("text-anchor", "middle")
                                                  .style("opacity", .1); 

                                //SelectingThis edges filtering
                                dismissedNodes = selectingThis.attr("id");
                                incidentEdges = graph.incidentEdges(dismissedNodes)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdges.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", .2); 
                                              }
                                            })   

                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", 1); 
                                              }
                                            })  

                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8); 

                                d3.select("#"+mySelectionCMenu).selectAll("text")
                                .transition(400)
                                // .style("font-size", "16px")
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };             
                            })
            },

    "strongly-connected": function(d) {
            
            idStronglyConnected0 = tarjan(graph);
            console.log("idStronglyConnected0", idStronglyConnected0);
            console.log("idStronglyConnected0.length", idStronglyConnected0.length);

            for (i = 0, longitud = idStronglyConnected0.length; i < longitud; i++){
            idStronglyConnected = tarjan(graph)[[i]]
             console.log("idStronglyConnectedOK", idStronglyConnected);
            }

            return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                mySelection = d3.select("#"+mySelectionCMenu);

                                myArray = idStronglyConnected;

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(mySelectionCMenu) >= 0)  {
                                  if (myArray.indexOf(selectingThisId) >= 0)  {

                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                    d3.select("#"+mySelectionCMenu).selectAll("rect")
                                              .transition(400)
                                              .style("opacity", .8);

                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)
                                console.log("mySelectionCMenu", mySelectionCMenu)
                                console.log("incidentEdgesmySelectionCMenu", incidentEdgesmySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .style("opacity", 1); 
                                              }
                                            })   
                                  }

                                  else {  
                                    selectingThis.selectAll("rect")
                                              .transition(400)
                                              .style("opacity", .1);      
                                    selectingThis.selectAll("text")
                                              .transition(400)
                                              // .attr("text-anchor", "middle")
                                              .style("opacity", .1); 

                                    d3.select("#"+mySelectionCMenu).selectAll("rect")
                                              .transition(400)
                                              .style("opacity", .8); 

                                    d3.select("#"+mySelectionCMenu).selectAll("text")
                                    .transition(400)
                                    // .style("font-size", "16px")
                                    .style("font-weight", "regular")
                                    .style("opacity", 1); 
                                     };   
                                }
                              
                              else {  
                                selectingThis.selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .1);      
                                selectingThis.selectAll("text")
                                          .transition(400)
                                          // .attr("text-anchor", "middle")
                                          .style("opacity", .1); 

                                //SelectingThis edges filtering
                                dismissedNodes = selectingThis.attr("id");
                                incidentEdges = graph.incidentEdges(dismissedNodes)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdges.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", .2); 
                                              }
                                            })   
      
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

                                d3.selectAll("#"+incidentEdgesmySelectionCMenu).selectAll("path")
                                          .transition(400)
                                          .style("opacity", 1); 
                                
                                /////

                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8); 

                                d3.select("#"+mySelectionCMenu).selectAll("text")
                                .transition(400)
                                // .style("font-size", "16px")
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };   
                            })
            },

            "successors": function(d) {
               
                //GRAPH Features Possibilities
                idSuccessorsVertex = graph.successors(mySelectionCMenu)
                console.log(idSuccessorsVertex) 

                return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                myArray = idSuccessorsVertex

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(selectingThisId) >= 0)  {
                                                                            
                                    console.log("selectingThisId", selectingThisId)  
                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8);
                               
                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)
                                console.log("mySelectionCMenu", mySelectionCMenu)
                                console.log("incidentEdgesmySelectionCMenu", incidentEdgesmySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          // .style("fill", "purple")
                                                          .style("opacity", 1); 
                                              }
                                            })                                                                 
                                }

                                else {       
                                        selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .1);      
                                        selectingThis.selectAll("text")
                                                  .transition(400)
                                                  // .attr("text-anchor", "middle")
                                                  .style("opacity", .1); 

                                //SelectingThis edges filtering
                                dismissedNodes = selectingThis.attr("id");
                                incidentEdges = graph.incidentEdges(dismissedNodes)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdges.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", .2); 
                                              }
                                            })   

                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

                                d3.selectAll(".edgePath.enter")
                                            .filter(function(d) {
                                              selectingThis = d3.select(this)
                                              selectingThisId = selectingThis.attr("id")

                                              if (incidentEdgesmySelectionCMenu.indexOf(selectingThisId) >= 0)  {
                                              selectingThis.selectAll("path")
                                                          .transition(400)
                                                          .style("opacity", 1); 
                                              }
                                            })  

                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8); 

                                d3.select("#"+mySelectionCMenu).selectAll("text")
                                .transition(400)
                                // .style("font-size", "16px")
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };             
                            })
            },
        }
    });


/*ORIGINAL code
  # Public function to update highlighted nodes
  # from search
  network.updateSearch = (searchTerm) ->
    searchRegEx = new RegExp(searchTerm.toLowerCase())
    node.each (d) ->
      element = d3.select(this)
      match = d.name.toLowerCase().search(searchRegEx)
      if searchTerm.length > 0 and match >= 0
        element.style("fill", "#F38630")
          .style("stroke-width", 2.0)
          .style("stroke", "#555")
        d.searched = true
      else
        d.searched = false
        element.style("fill", (d) -> nodeColors(d.artist))
          .style("stroke-width", 1.0)

/////////////

  $("#search").keyup () ->
    searchTerm = $(this).val()
    myNetwork.updateSearch(searchTerm)
*/


//SEARCH BUTTON
// network.updateSearch = (searchTerm);
//   searchRegEx = new RegExp(searchTerm.toLowerCase())
//   node.each(function(d) {
//     element = d3.select(this)
//     match = d.name.toLowerCase().search(searchRegEx)
//     if (searchTerm.length > 0)
//       element.style("fill", "#F38630")
//         .style("stroke-width", 2.0)
//         .style("stroke", "#555");
//       d.searched = true;
//     else 
//       d.searched = false
//       element.style("fill", "red")
//               .style("stroke-width", 1.0);
//   });

//   d3.select("#search").keyup () {->}
//     searchTerm = d3.select(this).val()
//     myNetwork.updateSearch(searchTerm)


/*  var mySelectionCMenu = d3.selectAll(".edgePath").each( function(d,i) {
    arityInfo = d3.select(this).attr("outArity");
    d3.select(this)
      .attr("class", arityInfo)
        // .classed(function(d) { return outArity }, true);
  })*/

  // var mySelectionCMenu = d3.selectAll("edgePath")
  // console.log(mySelectionCMenu)
   
/*
  svgGraph.style("opacity", 1e-6)
  .transition()
    .duration(1000)
    .style("opacity", 1);*/

  

/*        .selectAll("[inArity=many]")    // NO WORKING. Something wrong when selecting by some attributes
          .style("stroke", "blue");*/



// Returning a specif atribute of a variable
/*d3.select("body")
    .on("mouseover", function(){ 
          if (d3.select(this).attr("id") == "correct") {
              enableInteraction(d3.select(this));
          }
});*/











/*    d3.selectAll(".node.enter")
      //On click, update with new data      
        .on("click", function() { 

          // doesn"t work well, all the time shows the first ite "GoTerm"
            d3.select("body")
                .data(newVertex)
                // .enter()
                .append("p")
                .style("color", "teal")
                // .text("lalala")
                .text(function(d) { return d.value.label })
                // .attr("x", function(d, i) { return (10*i) + 100; })
                .attr("x", 100)
                .attr("y", 100)
              });*/

/*    d3.selectAll(".node.enter")
      //On click, update with new data      
        .on("click", function(d) { 

          // doesn"t work well, all the time shows the first ite "GoTerm"
            d3.select("this").select("text")
                            .text(function(d) { 
                              return d.value.label })
                            .style("font-size","20px")
                            .style("color", "teal")

                            .attr("x", 100)
                            .attr("y", 100)
              });*/


/*          svgRouteMap.append("text")
                      .attr("text-anchor", "middle")
                      .attr("fill", "red")
                      .text(function(u) { return u; })
                      .attr("x", 100)
                      .attr("y", 100)
                    });
*/



/*        d3.selectAll(".node.enter")
      //On click, update with new data     
      .on("click", function(u, value) { return
        
        select(this).append("p")    
         .text(function(u) { return u; })
         .attr("font-family", "sans-serif")
         .attr("font-size", "10px")
         .attr("fill", "teal")
         .attr("x", function(d, i) { return (10*i) + 100; })
         .attr("y", 100);

       });*/


/*        d3.selectAll(".node.enter")
      //On click, update with new data     
        
         .append("p")    
         .text(function(u) { return u; })
         .attr("font-family", "sans-serif")
         .attr("font-size", "10px")
         .attr("fill", "teal")
         .attr("x", function(d, i) { return (10*i) + 100; })
         .attr("y", 100);

       });
*/






      });   
  });
  }
