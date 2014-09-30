function drawDep() {

  //Complete Domain Model schema:
  url0 = "data/modelService_schema.json";

  d3.json(url0, function(json0) {

    var newjson0 = json0.map(function(x) {
          return {
            id: x.label,        
            Nvertex: x.vertexTypes.length,
            Nedges: x.edgeTypes.length,
            Dependencies: x.dependencies.length,
            };
        });
      
 ////////////////////////////////////////////////////////////

   //Function for each module url:
    var urlFunction = function(d) {
      return ("data/rev_" + d + ".json")
    };

////////////////////////////////////////////////////////////

// 1-MODEL/DATA/FROM/SERVICE
// Loading MODEL data from local file after and transforming json initial structure.
d3.json(url, function(json) {

    // 2-ADAPT/JSON/DATA/GRAPHLIB
    // Transforming json vertex structure with a .map function:
    var dependencies = json.dependencies;

    if (dependencies.length>0) {
      colorMod = "teal";
    }

    var module = json.label;
    var properties = json.propertyTypes;

    var newVertexS = json.edgeTypes.map(function(x) {
          return {
            id: x.source.type,        
            value: { module: x.source.module, label: x.source.type, dependency: "nodeDependency", propertyTypes: ""   }            
            };
        });
    
    var newVertexT = json.edgeTypes.map(function(x) {
          return {
            id: x.target.type,        
            value: { module: x.target.module, label: x.target.type, dependency: "nodeDependency", propertyTypes: "" }
            };
        }); 

    var newVertexDep = newVertexS.concat(newVertexT);
    
    //////

    // Transforming json edges structure with a .map function:
        var newEdgesDep = json.edgeTypes.map(function(x) {
          return {
            id: x.label,
            u: x.source.type,     
            v: x.target.type,
            value: { module: module, label: x.label, inArity: x.source.arity, outArity: x.target.arity, propertyTypes: x.properties }            
          };
        });
    
  ////////

  // Using the GRAPHLIB GRAPH as input for DAGRE-D3:
  var renderer = new dagreD3.Renderer();
  var graph = dagreD3.json.decode(newVertexDep, newEdgesDep);
    
  //alter the drawNodes function:
    var oldDrawNodes = renderer.drawNodes();
  renderer.drawNodes(function(graph, root) {

    var svgNodes = oldDrawNodes(graph, root);
    svgNodes.attr("id", function(u) { return  u });
    return svgNodes;
  });

  //alter the drawEdges function:
  var oldDrawEdge = renderer.drawEdgePaths();
  renderer.drawEdgePaths(function(graph, root) {

    var svgEdgePaths = oldDrawEdge(graph, root);
    svgEdgePaths.attr("id", function(e) { return  e })
    return svgEdgePaths;

  });

/////////////////////////
  
  //Configuring the layout:
  var layout = dagreD3.layout()
                // .nodeSep(120)  //50=default
                //.edgeSep(10)
                //.rankSep(20);   //Separation between levels, childs
                .rankDir("LR"); //TB:top-to-bottom / BT:bottom-to-top / LR:left-to-right / RL:right-to-left 

    //Configuring the renderer-original:
  var renderinglayout = renderer.layout(layout)
              // .edgeTension(.5)
              .edgeInterpolate("bundle")  // Bundle, linear, step-after, basis, cardinal, monotone..
              // .zoom(false)
              .run(graph, svgGraph.select("g"));

zooming();

function zooming() {

  //Restarting zoom from previous explorations
  d3.selectAll("g.zoom")
          .transition()
          .duration(1000)
          .attr("transform", "translate(0,0) scale(1)");
          
  //Centering the graphs depending on their size
  wGraph = renderinglayout.graph().width;
  hGraph = renderinglayout.graph().height;

  var distanceX = (mainGraphWidth/2)-(wGraph/2);  
  var distanceY = (mainGraphHeight/2)-(hGraph/2)-20;  

  svgGraph.select("#grafo")
          .attr("transform", "translate(0,+"+(mainGraphHeight/2)+ ")")
          .transition()
          .duration(1000)
          .attr("transform", "translate(" + distanceX +"," + distanceY + ")"); 
};

mainGrafoInformation();

function mainGrafoInformation() {

    //MAIN GRAFO INFORMATION
  renderinglayout.eachNode(function(u, value) {
      // console.log("VertexTypes " + u + ": " + JSON.stringify(value));
   });
    
  renderinglayout.eachEdge(function(e, u, v, value) {
      // console.log("EdgeTypes " + e + ": " + JSON.stringify(value));
  });
}

bindingData1();

function bindingData1() {

    //Binding Nodes&Edges DATA to the graph by iterating over the generated svg adding ATTRIBUTES:
    //Maybe I need data-attribute instead: http://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function

    d3.selectAll(".edgePath.enter")
        .data(newEdgesDep)
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
        .data(newVertexDep)
        .attr("module", function(d) {
            return d.value.module
        })
        .attr("label", function(d) {
            return d.value.label
        })
        .attr("propertyTypes", function(d) {
            return d.value.propertyTypes
        })
        .attr("dependency", function(d) {
            return d.value.dependency
        })
      .selectAll("rect").attr("class", "mainNodeRect");
};

      //Nodes color by module update
      d3.selectAll("[dependency=nodeDependency]")
        .each(function(d) {
          var eachModule = d3.select(this).attr("module");
          var eachModuleColor = d3.select("[newid ="+eachModule+"]").style("fill");

      d3.select(this).selectAll("rect")
          .style("fill", eachModuleColor);
          });

      d3.select("#DepText").remove();

      //Dependency text
      svgGraph.append("text")
          .attr("id", "DepText")
          .attr("x", 325)
          .attr("y", 210)
          .text("collapsible modules")
          .attr("text-anchor", "left")
          .attr("font-weight", "bold")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .style("fill", "lightgrey");

    nodeDependencyOuterElement();

    function nodeDependencyOuterElement(){

     //Adding a visual element to indidicate a collapsible module due a dependency
        d3.selectAll("[dependency=nodeDependency]") 
            .each(function(d) {
                selected = d3.select(this)
                selectedRect = selected.select("rect")
       
                return selected.append("rect")
                    .attr("class", "dependencyOuterElement")
                    .attr("x", +selectedRect.attr("x")-15)
                    .attr("y", +selectedRect.attr("y")-15)

                    .attr("width", +selectedRect.attr("width")+30)
                    .attr("height", +selectedRect.attr("height")+30)

                    .attr("rx", selectedRect.attr("rx"))
                    .attr("ry", selectedRect.attr("ry"))

                    .style("fill", "none")
                    .style("stroke-width", 6)
                    .style("stroke", "lightgrey")
                    .style("stroke-dasharray", "5,4");
              })
    
  //Adding ONCLICK event to EXPAND/COLLAPSE the module-dependency
  d3.selectAll(".dependencyOuterElement") 
       .on("click", click);
    }
   
function click(d) {
  
  d3.select("#DepText")
          .transition()
          .duration(500)
          .style("opacity", 0);

  if (graph.nodes().length==2) {

        d3.select(this)
            .transition()
            .duration(1000)
            .attr("transform", "scale(3) translate(35,0)")
            .style("stroke", "lightgrey");

        selected2 = d3.select(this.parentNode);
        selected2Module = selected2.attr("module");
        selected2Id = selected2.attr("id");

        url1 = urlFunction(selected2Module);

        d3.json(url1, function(json) {

            var module = json.label;
            var properties = json.propertyTypes;

            var newVertexPart = json.vertexTypes.map(function(x) {
                  return {
                    id: x.label,        
                    value: { module: module, label: x.label, propertyTypes: x.properties }            
                    };
                });
                        
            ///
            
          for (i = 0, longitud = newVertexPart.length; i < longitud; i++){
                  if ((newVertexPart[i].id) == selected2Id)  {
                  }
                  else {
                      graph.addNode(newVertexPart[i].id, {label: newVertexPart[i].value.label});
                  }
            }

            newVertex = newVertexDep.concat(newVertexPart);

    //////

            //Transforming json edges structure with a .map function:
                var newEdgesPart = json.edgeTypes.map(function(x) {
                  return {
                    id: x.label,
                    u: x.source.type,     
                    v: x.target.type,
                    value: { module: module, label: x.label, inArity: x.source.arity, outArity: x.target.arity, propertyTypes: x.properties }            
                  };
                });
            
          //////        

           for (i = 0, longitud = newEdgesPart.length; i < longitud; i++){

           graph.addEdge(newEdgesPart[i].id, newEdgesPart[i].u, newEdgesPart[i].v, {u: newEdgesPart[i].u, v: newEdgesPart[i].v, inArity:"", outArity:"", label: newEdgesPart[i].id, module:"", propertyTypes:""});
           }

          newEdges = newEdgesDep.concat(newEdgesPart);
          
          /////////////////////

          postLayout();

          function postLayout() {
            
            //Configuring the layout:
            var layout = dagreD3.layout()
                          //.nodeSep(50)  //50=default
                          //.edgeSep(10)
                          //.rankSep(20);   //Separation between levels, childs
                          .rankDir("LR"); //TB:top-to-bottom / BT:bottom-to-top / LR:left-to-right / RL:right-to-left 

            // Custom transition function
            function transition(selection) {
              return selection.transition().duration(1500);
              // return selection.transition().delay(300).duration(3000);
            }

            renderinglayout = renderer.transition(transition).run(graph, svgGraph.select("g"));

            bindingData2();
            arity(); 
          };

          function bindingData2() {

              //Binding Nodes&Edges DATA to the graph by iterating over the generated svg adding ATTRIBUTES:
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
                  .attr("dependency", function(d) {
                      return d.value.dependency
                  })
                .selectAll("rect").attr("class", "mainNodeRect");
          };


        //Nodes color by module update
        d3.selectAll(".node.enter")
          .each(function(d) {
            var eachModule = d3.select(this).attr("module");
            var eachModuleColor = d3.select("[newid ="+eachModule+"]").style("fill");

        d3.select(this).selectAll("rect")
            .style("fill", eachModuleColor);
            });

    ///////////////

          zooming();
          // zooming2();

          function zooming2() {
          //Restarting zoom from previous explorations
          d3.selectAll("g.zoom")
                  .transition()
                  .duration(1000)
                  .attr("transform", "translate(0,0) scale(1)");

            //Centering the graphs depending on their size
            wGraph = renderinglayout.graph().width;
            hGraph = renderinglayout.graph().height;

            var distanceX = (mainGraphWidth/2)-(wGraph/2);  
            var distanceY = (mainGraphHeight/2)-(hGraph/2)-20;  

            svgGraph.select("#grafo")
                    .transition()
                    .duration(1000)
                    .attr("transform", "translate(" + distanceX +"," + distanceY + ")"); 
          };

          nodeDependencyOuterElement();

          });
  } 

  else {

        selected2 = d3.select(this.parentNode);
        selected2Module = selected2.attr("module");
        selected2Id = selected2.attr("id");

           d3.json(url1, function(json) {

            var module = json.label;
            var properties = json.propertyTypes;

            var newVertexPart = json.vertexTypes.map(function(x) {
                  return {
                    id: x.label,        
                    value: { module: module, label: x.label, propertyTypes: x.properties }            
                    };
                });
            
           for (i = 0, longitud = newVertexPart.length; i < longitud; i++){
                  if (newVertexPart[i].id == selected2Id)  {
                  }
                  else {
                      graph.delNode(newVertexPart[i].id);
                  }
            }

 //////
            //Transforming json edges structure with a .map function:

                var newEdgesPart = json.edgeTypes.map(function(x) {
                  return {
                    id: x.label,
                    u: x.source.type,     
                    v: x.target.type,
                    value: { module: module, label: x.label, inArity: x.source.arity, outArity: x.target.arity, propertyTypes: x.properties }            
                  };
                });
            
          //////        
          
          for (i = 0, longitud = newEdgesPart.length; i < longitud; i++) {

              if (graph.hasEdge(newEdgesPart[i].id)) {
                  
                  graph.delEdge(newEdgesPart[i].id);
              }

          postLayout();
          };

        /////////////////////

        function postLayout(){
            
            //Configuring the layout:
            var layout = dagreD3.layout()
                          //.nodeSep(50)  //50=default
                          //.edgeSep(10)
                          //.rankSep(20);   //Separation between levels, childs
                          .rankDir("LR"); //TB:top-to-bottom / BT:bottom-to-top / LR:left-to-right / RL:right-to-left 

            // Custom transition function
            function transition(selection) {
              return selection.transition().duration(1500);
            }

            renderinglayout = renderer.transition(transition).run(graph, svgGraph.select("g"));

          bindingData();
          arity(); 
        
        };

          bindingData();

          function bindingData() {

              //Binding Nodes&Edges DATA to the graph by iterating over the generated svg adding ATTRIBUTES:
              d3.selectAll(".edgePath.enter")
                  .data(newEdgesDep)
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
                  .data(newVertexDep)
                  .attr("module", function(d) {
                      return d.value.module
                  })
                  .attr("label", function(d) {
                      return d.value.label
                  })
                  .attr("propertyTypes", function(d) {
                      return d.value.propertyTypes
                  })
                  .attr("dependency", function(d) {
                      return d.value.dependency
                  })
                .selectAll("rect").attr("class", "mainNodeRect");
          };

          //Nodes color by module update
          d3.selectAll("[dependency=nodeDependency]")
            .each(function(d) {
              var eachModule = d3.select(this).attr("module");
              var eachModuleColor = d3.select("[newid ="+eachModule+"]").style("fill");

          d3.select(this).selectAll("rect")
              .style("fill", eachModuleColor);
              });

          zooming2();

          function zooming2() {
          //Restarting zoom from previous explorations
          d3.selectAll("g.zoom")
                  .transition()
                  .duration(1000)
                  .attr("transform", "translate(0,0) scale(1)");

            //Centering the graphs depending on their size
            wGraph = renderinglayout.graph().width;
            hGraph = renderinglayout.graph().height;
            
            var distanceX = (mainGraphWidth/2)-(wGraph/2);  
            var distanceY = (mainGraphHeight/2)-(hGraph/2)-20;  

            svgGraph.select("#grafo")
                    .transition()
                    .duration(1000)
                    .attr("transform", "translate(" + distanceX +"," + distanceY + ")"); 

          };
          
          nodeDependencyOuterElement();
 });
}
}

////////////////////////////////////////////////////////////

svgRouteMap.selectAll("#moduleTitle")
        .remove();

text = svgRouteMap.append("text")
          .attr("id", "moduleTitle")
          .attr("x", 30)
          .attr("y", 20)
          .text(module + " dependency")
          .attr("font-family", "sans-serif")
          .attr("font-size", "20px")
          .attr("font-weight", "bold")
          .attr("fill", "brown");

svgRouteMap.selectAll("#moduleInfo")
        .remove();

text2 = svgRouteMap.append("text")
          .attr("id", "moduleInfo")
          .attr("x", 30)
          .attr("y", 40)
          .text(graph.order() + " vertex + " + graph.size() + " edges")
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("font-weight", "normal")
          .attr("fill", "brown");

////////////////////////////////////////////////////////////
      
  //GRAPH FEATURES ON CLICK
// d3.selectAll(".node rect")
d3.selectAll(".mainNodeRect")
       .on("click", function(u, value) {
 
 /////////////////////////////////////////////

        // INDEXES-PROPERTIES INFO                            
        //Accessing to the properties info through .parentNode      
        ParentNode2 =  d3.select(this.parentNode);
        ParentNode2Label = ParentNode2.attr("label");
        ParentNode2Properties = ParentNode2.attr("propertyTypes");

        //removing previous text
        svgRouteMap.selectAll(".VertexIndexProperties") 
                    .remove();         
  
        //adding INDEX info
        svgRouteMap.append("text")
          .attr("class", "VertexIndexProperties")
          .attr("x", function(d,i) { return i + 30 })
          .attr("y", function(d,i) { return 250+(i + 20) })
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
          .attr("x", function(d,i) { return i + 30 })
          .attr("y", function(d,i) { return  250+(i + 35) })
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

      });

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
      .attr("style", "fill: #E75347")
      .append("svg:path")
        .attr("d", "M 0,0 m -5,-5 L 1,-5 L 1,5 L -5,5 Z");

arity();

////////////////////////////

//ARITY GRAPH INFO-REPRESENTATION
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
  
  d3.selectAll("#arityTitle").remove(); 
  d3.selectAll("#legendText").remove(); 

  d3.selectAll("#pathLegend0").remove();
  d3.selectAll("#pathLegend1").remove();
  d3.selectAll("#pathLegend2").remove();
  d3.selectAll("#pathLegend3").remove();

    var arities = d3.selectAll(".edgePath").each( function(d,i) {
    OUTarityInfo = d3.select(this).attr("outArity");
    INarityInfo = d3.select(this).attr("inArity");
    arityInfo = OUTarityInfo + "-" + INarityInfo;
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

    return manyMany.style("stroke", colorMod)
                      .each( function(d, i) {
                            allPath = d3.select(this);     
                            allPathData = allPath.selectAll("path").attr("d");
                            
                            allPathDataId = allPath.attr("id");
       
                          return svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                .attr("d", allPathData)
                                .attr("transform", "translate(0," + offset + ")")
                                .style("stroke-width", arityStrokeWidth)
                                .attr("class", "manymanyOuter")
                                .attr("id", "pathOuter"+allPathDataId)
                                .style("stroke", "white")
                                .transition().duration(1000)
                                .style("stroke", colorMod)
                                .style("fill", "none"),

                        svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                .attr("d", allPathData)
                                .attr("transform", "translate(0," + (-offset) + ")")
                                .style("stroke-width", arityStrokeWidth)
                                .attr("class", "manymanyOuter")
                                .attr("id", "pathOuter2"+allPathDataId)
                                .style("stroke", "white")
                                .transition().duration(1000)
                                .style("stroke", colorMod)
                                .style("fill", "none");

                        //Removing marker-end of self-linking nodes as has no sense on them
                        svgGraph.selectAll("g.edgePath.enter")
                                .filter(function(d) {

                                  if ((d3.select(this).attr("u")) == (d3.select(this).attr("v"))) {
                                    return d3.select(this)
                                            .selectAll("path")
                                            .attr("marker-end", "none");
                                  }
                               });
              })    
    }
    
    if (arityInfo == "many-one") {
      var manyOne = d3.select(this);
      return manyOne.style("stroke", colorMod)
                 .each( function(d, i) {
                          allPath = d3.select(this);     
                          allPathData = allPath.selectAll("path").attr("d");
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

/////////////////////////////////////////////
 
            var PathListNums4Up = allPathData.split(patronNums);
            
            var SubontolyPath4 = allPathData.replace(/\./g,"");
            var PathListSymbols = SubontolyPath4.split(patronSymbols);

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

//////////////////////////////////////////////////// 



                        return svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathManyOneDown)
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "manyoneOuter")
                                        .attr("id", "pathOuter"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none"),

                        svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathManyOneUp)
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "manyoneOuter")
                                        .attr("id", "pathOuter2"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none");
                          })
                          }
    
  if (arityInfo == "one-many") {
      var oneMany = d3.select(this);
      return oneMany.style("stroke", colorMod)
                    .each( function(d, i) {
                          allPath = d3.select(this);     
                          allPathData = allPath.selectAll("path").attr("d");
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

/////////////////////////////////////////////
 
            var PathListNums3Up = allPathData.split(patronNums);
            
            var SubontolyPath3 = allPathData.replace(/\./g,"");
            var PathListSymbols = SubontolyPath3.split(patronSymbols);

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

//////////////////////////////////////////////////// 

                          return svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathOneManyDown)
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "onemanyOuter")
                                        .attr("id", "pathOuter"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none"),

                          svgGraph.select("g.edgePaths").select("#"+allPathDataId).append("path")
                                        .attr("d", SubontolyPathOneManyUp)
                                        .style("stroke-width", arityStrokeWidth)
                                        .attr("class", "onemanyOuter")
                                        .attr("id", "pathOuter2"+allPathDataId)
                                        .style("stroke", colorMod)
                                        .style("fill", "none")
                                        .style("fill", "none");
                            })
                        }
  })

var offset2 = offset;
var verticalSeparation = 25;

var classes = ["many-many", "many-one", "one-many", "one-one"];

//TO DO: IMPLEMENT THE LEGEND CODE
svgArityLegend.selectAll("pathLegend")
          .data(classes)
          .enter()
          .append("path")
          .attr("id", function(d,i) {return "pathLegend"+i })
          .attr("class", "edgePathLegend")
          .attr("arityInfo", function(d,i) {return d})
          .attr("d", function(d, i) { 
            var Ycord = +50 + (i*verticalSeparation);
            return "M480," + Ycord + "L530," + Ycord  })
          .style("stroke-width", .3)          
          .style("stroke", colorMod)
          .attr("marker-end", "url(#arrowhead)")
          .attr("transform", "translate(-450,0)");

//Many-many legend
var manyManyLegendInfo = d3.select("#pathLegend0").attr("d");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", manyManyLegendInfo)
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .attr("transform", "translate(-450,"+ offset + ")");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", manyManyLegendInfo)
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .attr("transform", "translate(-450," + (-offset) + ")");

//Many-one legend
var manyOneLegendInfo = d3.select("#pathLegend1").attr("d");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,"+(75+offset2)+",510,75L530,75")
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .style("fill", "none")
        .attr("transform", "translate(-450,0)");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,"+(75-offset2)+",510,75L530,75")
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .style("fill", "none")
        .attr("transform", "translate(-450,0)");

//One-many legend
var oneManyLegendInfo = d3.select("#pathLegend2").attr("d");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,100,500,100L530," + (+100+offset2))
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .style("fill", "none")
        .attr("transform", "translate(-450,0)");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", "M480,100,500,100L530," + (+100-offset2))
        .style("stroke", colorMod)
        .style("stroke-width", .3)        
        .style("fill", "none")
        .attr("transform", "translate(-450,0)");

//One-one legend
var oneOneLegendInfo = d3.select("#pathLegend3").attr("d");

svgArityLegend.append("path")
        .attr("class", "pathLegend")
        .attr("d", oneOneLegendInfo)
        .style("stroke", colorMod)
        .style("stroke-width", .3)
        .attr("transform", "translate(-450,0)");

//Arity titles
svgArityLegend.selectAll("text2")
          .data(["many-many", "many-one", "one-many", "one-one"])
          .enter()
          .append("text")
          .attr("id", "legendText")
          .attr("x", 545)
          .attr("y", function(d, i) { return 53 + (i*verticalSeparation) })
          .text(function(d) { return d})
          .attr("text-anchor", "left")
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
        .attr("transform", "translate(-450,0)");

svgArityLegend.append("text")
          .attr("id", "arityTitle")
          .attr("x", 545)
          .attr("y", 30)
          .text("ARITY")
          .attr("text-anchor", "left")
          .attr("font-family", "sans-serif")
          .attr("font-size", "13px")
        .attr("transform", "translate(-450,0)");
};

////////////////////////////////////

//Parameters for context menu
var mySelectionCMenu;
var id;

  d3.selectAll(".mainNodeRect")
       .on("mousedown", function(u, value) {
      mySelectionCMenu = u;
      id = d3.select(this);

      // UPDATE to normal status
      d3.selectAll(".mainNodeRect")
         .attr("transform", "scale(1)")
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
      
      d3.select(this.parentNode).selectAll("text")
                                .transition(400)
                                // .style("font-size", "16px")
                                .style("font-weight", "regular")
                                .style("opacity", 1);
     });
     

// CONTEXT MENU
// +info here http://www.trendskitchens.co.nz/jquery/contextmenu/

   //right click menu items
    $("g.nodes").contextMenu("cntxtMenu",
    {
        itemStyle: {
            fontFamily : "sans-serif",
            fontSize: "12px",
            border: "none",
            padding: "0px"
        },
         shadow: false,

         itemHoverStyle: {
            backgroundColor: "lightgrey",
            border: "none"
        },

        bindings:
        {
            "neighbour": function(u) {

                //GRAPH Features Possibilities
                idNeighborsVertex = graph.neighbors(mySelectionCMenu)

               return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                myArray = idNeighborsVertex

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(selectingThisId) >= 0)  {
                                                                            
                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8);
                               
                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

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
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };             
                            })
            },

            "predecessors": function(d) {
                
                //GRAPH Features Possibilities
                idPredecessorsVertex = graph.predecessors(mySelectionCMenu)

                return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                myArray = idPredecessorsVertex

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(selectingThisId) >= 0)  {
                                                                            
                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8);
                               
                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

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
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };             
                            })
            },

    "strongly-connected": function(d) {
            
            idStronglyConnected0 = tarjan(graph);

            for (i = 0, longitud = idStronglyConnected0.length; i < longitud; i++){
            idStronglyConnected = tarjan(graph)[[i]]
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

                                    d3.select("#"+mySelectionCMenu).selectAll("rect")
                                              .transition(400)
                                              .style("opacity", .8); 

                                    d3.select("#"+mySelectionCMenu).selectAll("text")
                                    .transition(400)
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
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };   
                            })
            },

            "successors": function(d) {
               
                //GRAPH Features Possibilities
                idSuccessorsVertex = graph.successors(mySelectionCMenu)

                return d3.selectAll(".node.enter")
                            .filter(function(d) { 
                                selectingThis = d3.select(this)
                                selectingThisId = selectingThis.attr("id")

                                myArray = idSuccessorsVertex

                                //Array Based method with `indexOf` to see whether the value matches one of the values in the array
                                if (myArray.indexOf(selectingThisId) >= 0)  {
                                                                            
                                    selectingThis.selectAll("rect")
                                                  .transition(400)
                                                  .style("opacity", .8);         
                                
                                d3.select("#"+mySelectionCMenu).selectAll("rect")
                                          .transition(400)
                                          .style("opacity", .8);
                               
                                //SelectingThis edges filtering
                                incidentEdgesmySelectionCMenu = graph.incidentEdges(mySelectionCMenu)

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
                                .style("font-weight", "regular")
                                .style("opacity", 1); 
                                 };             
                            })
                  },
              }
          });

      });   
  });
  }
