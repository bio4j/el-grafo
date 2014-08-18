

//Linking texts from another url on server
/*    var myUrl1 = "Test-GO_v28_Main_DEP.html";
     function ParseUrl(myUrl){
             $.ajax({
                      url: myUrl,
                      success: function(data) {
                             document.getElementById("textoVariable").innerHTML = data;
                             document.getElementById("textoVariable").innerHTML = $("#origenTexto").html();
                      }
             });
     }
     ParseUrl(myUrl1);*/


//Linking texts from another url on server
/*    var myUrl1 = "https://github.com/bio4j/ncbi-taxonomy-module";
     function ParseUrl(myUrl){
             $.ajax({
                      url: myUrl,
                      success: function(data) {
                             document.getElementById("textoVariable").innerHTML = data;
                             document.getElementById("textoVariable").innerHTML = $("#ncbi-taxonomy-bio4j-module").html();
                      }
             });
     }
     ParseUrl(myUrl1);*/

////////////////////////////////////

//TO DEFINE THE COLOR PALETTE:
var bio4jColors = ["#0E6580  ","#68DCFF","#1BCAFF","#587680","#16A2CC","#68DCFF","#0E6580 ","#1BCAFF","#587680"];

var color = d3.scale.category10()
    .range(bio4jColors);

// d3.rgb(colorMod).darker(2)

///////////////////////////////////

/*var introModulesWidth = 800;
var introModulesHeight = 250;

    //SVG canvas for modules loading
    svgModules = d3.select("#svgIntroModules")
                .attr("width", 800)
                .attr("height", 250);
    svgModules.append("g")
                .attr("transform", "translate(40,40)")


  titles = ["Bio4j MODULES", "Bio4j DEPENDENCIES"]
  d3.select("#svgIntroModules")
        .selectAll("text")
        .data(titles)
        .enter()
        .append("text") 
        .attr("x", 20)
        .attr("y", function(d, i) { return 30 + i*150; } )
        .attr("text-anchor", "left")
        .text( function(d) { return d; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px");

/////////////////////////////// AUXXXX

var introModulesWidthAux1 = 300;
var introModulesHeightAux1 = 300;

    //SVG canvas for modules loading
    svgModulesAux1 = d3.select("#svgIntroModulesAux1")
                .attr("width", introModulesWidthAux1)
                .attr("height", introModulesHeightAux1);*/

/////////

var introModulesWidthAux2 = 500;
var introModulesHeightAux2 = 500;

    //SVG canvas for modules loading
    SvgModulesINTRO = d3.select("#svgModulesINTRO")
                .attr("width", introModulesWidthAux2)
                .attr("height", introModulesHeightAux2)
                .append("g");



////////////////////////////////

function draw0() {

  //Complete Domain Model schema:
  url0 = "data/rev_schema_new_ALL_lengths.json";



  d3.json(url0, function(json0) {

    console.log(json0);

    var newjson0 = json0.map(function(x) {
      function colorModule(d, i) { return color(i); }
          return {
            id: x.label,
            //To be updated when the scala model is ready finally        
/*            Nvertex: x.vertexTypes.length,
            Nedges: x.edgeTypes.length,*/

            //Handy numbers took from https://github.com/bio4j/bio4j/tree/master/src/main/java/com/bio4j/model  
            Nvertex: x.vertexTypesLength,
            Nedges: x.edgeTypesLength,

            Dependencies: x.dependencies.length,
            Color: colorModule(x)
            };
        });
      
    console.log(newjson0);


////////////////////////////////////////////////////////////
  
      //TO DO
/*      var forcelayoutjson = newjson0.map(function(x) {
          return {
            nodes: { module: module, label: x.label, propertyTypes: x.properties },
            links: { module: module, label: x.label, propertyTypes: x.properties }     
            };
        });
      
    console.log(newjson0);*/
    urlForceLayout = "data/rev_schema_new_forceLayout.json";


////////////////////////////////////////////////////////////

    // -------> 1_MODULES AND DEPENDENCIES buttons/loading

    //MODULES AND DEPENDENCIES
    //Filtering between modules and dependencies. For example with circles and rects
/*    var shapesToFilter = svgModules.select("g").selectAll("circle")
                          .data(newjson0)
                          .enter();

    //svg for MODULES
    shapesToFilter.append("circle")
        .filter(function(d) { return d.Dependencies < 1;})
        .attr("id", function(d) { return d.id; })
        .attr("cx", function(d, i) { return i*90} )
        .attr("cy", 30 )
        .attr("r", function(d) { return (5 + (+d.Nvertex) ) } )
        .attr("fill", function(d, i) { return color(i); })
        .style("opacity", 0.5);


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
			color = colorMod.replace("#",""); 
			location.href="Test-GO_v15_Main.html?url="+url+"&color="+color;
            return draw();

          });
*/
})
}


/////////////////////////////////////////


 d3.json("data/rev_schema_forceLayout_CLEAN.json", function(error, graph) {
  
  
  var nodes = graph.nodes


    var Force = function(nodes, links) {
        return d3.layout.force()
            .nodes(nodes)
            .links(links)
            .gravity(0)
            .size([introModulesWidthAux2, introModulesHeightAux2])
            .linkDistance(0)
            .linkStrength(.1)
            .friction(0.9)

            .charge(function(d, i) {
                return d.charge
            })
    };

    var Nodes = function(num, id, name) {
        return d3.range(num).map(function(d) {
            return {
                id: id,
                x: Math.random() * introModulesWidthAux2,
                y: Math.random() * introModulesHeightAux2,
                charge: -4.0,
                name: name,
            }
        })
    };

    // console.log(Nodes);

    var Foci = function(x, y, name) {
        return {
            x: x,
            y: y,
            charge: -2.5,
            fixed: true,
            name: name
        }
    };


    var Links = function(nodes, foci) {
        return nodes.map(function(node) {
            return {
                source: node,
                target: foci
            }
        })
    };

    ////

/*    var LinksModules = function(foci, foci) {
            return {
                source: foci,
                target: foci
            }
    };*/

//////////////

    arrayModules = [];
    for (var i = 0; i < graph.nodes.length; i++) {         
        arrayModules.push(i);       //Add new number to array
            };

    var hull = SvgModulesINTRO
        .selectAll("path")
        .data(arrayModules)
        .enter()
        .append("path")
        .attr("class", "hull")
        .attr("id", function(d,i) {return "path" + i});


/////////////


///////////////////////////////////////////////////


        var NumNodes = new Array(graph.nodes.length);
        var NumEdges = new Array(graph.nodes.length);
        
        var nodesv = new Array(graph.nodes.length);
        var nodese = new Array(graph.nodes.length);

        var nodesVector = new Array(graph.nodes.length);
        
    for(i = 0, longitud = graph.nodes.length; i < longitud; i++){

            NumNodes[i] = graph.nodes[i].vertexTypesLength;
            NumEdges[i] = graph.nodes[i].edgeTypesLength;
            //Equivalent to:
            //var NumNodes0 = graph.nodes[0].vertexTypesLength;
            //var NumEdges0 = graph.nodes[0].edgeTypesLength;

            nodesv[i] = Nodes(NumNodes[i], i, "node-"+i),
            nodese[i] = Nodes(NumEdges[i], i, "edge-"+i),
            nodesVector[i] = nodesv[i].concat(nodese[i]);
            
            //Equivalent to:
            // var nodes0v = Nodes(NumNodes0, 0, "node-0");
            // var nodes0e = Nodes(NumEdges0, 0, "edge-0");
            // var nodes0 = nodes0v.concat(nodes0e);
        }



    //POSITIONS FOCI MANUALLY    
    xUniprot = (introModulesWidthAux2 / 2);
    yUniprot = (introModulesHeightAux2 / 2);

/*    var positionsManuallyX = [(xUniprot + 130), (xUniprot - 95), (xUniprot + 220), (xUniprot - 220), (xUniprot + 100), (xUniprot - 90), (xUniprot - 220), (xUniprot)];
 
     var positionsManuallyY = [(yUniprot + 140), (yUniprot + 160), (yUniprot + 30), (yUniprot + 120), (yUniprot - 180), (yUniprot - 160), (yUniprot - 40), (yUniprot)];*/   
    var positionsManuallyX = [(xUniprot + 130), (xUniprot - 95), (xUniprot + 100), (xUniprot - 140), (xUniprot)];
 
     var positionsManuallyY = [(yUniprot - 50), (yUniprot - 120), (yUniprot + 60), (yUniprot + 90), (yUniprot)];



    //FOCIS AND LINKS FOCI-NODES
    var foci = new Array(graph.nodes.length);
    var links = new Array(graph.nodes.length);
    for(i = 0, longitud = graph.nodes.length; i < longitud; i++){
        foci[i] = Foci(positionsManuallyX[i], positionsManuallyY[i], graph.nodes[i].label);
        links[i]  = Links(nodesVector[i], foci[i]);
    }


/*        linksAux = LinksModules(foci7, foci8);

        console.log("links8", links8);
        console.log("linksAux", linksAux);*/

        var aux = new Array(graph.nodes.length);
        var all = nodesVector[0].concat(nodesVector[1]);
        for(i = 2, longitud = graph.nodes.length; i < longitud; i++){
            if(i+1 != longitud)
                all = all.concat(nodesVector[i]);
            else{
                all = all.concat(nodesVector[i]);
                for(i = 0, longitud = graph.nodes.length; i < longitud; i++)
                    aux[i] = (foci[i]);
                    
                all = all.concat(aux);
            }
        }


        //FORCES
        var forceLinks = links[0];
        for(i = 1, longitud = graph.nodes.length; i < longitud; i++)
            forceLinks = forceLinks.concat(links[i]);
            
        force = Force(all, forceLinks);


/////////////

    force.on("tick", function() {
        // SvgModulesINTRO.selectAll("circle")
            types.attr("cx", function(d) {
                return d.x = Math.max(r, Math.min(introModulesWidthAux2 - r, d.x));
            })
            .attr("cy", function(d) {
                return d.y = Math.max(r, Math.min(introModulesHeightAux2 - r, d.y)); 
            });

            labels.attr("x", function(d) { return d.x + 40; })       
                .attr("y", function(d) { return d.y; }); 




        // var NumTotal[i] = NumNodes[i]+NumEdges[i];

        //PATHS convex hull function
        for(i = 0, longitud = graph.nodes.length; i < longitud; i++){
            if((NumEdges[i]) >= 2){
                SvgModulesINTRO.select("#path"+i)
                    .data([d3.geom.hull(nodesVector[i].map(function(d) { return [ d.x, d.y ]; }))])
                    .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
                    .style("fill", bio4jColors[i] )
                    .style("stroke", bio4jColors[i] );
            }
            else {

                d3.selectAll(".node-"+i)
                    .style("stroke", bio4jColors[i])
                    .style("stroke-width", 8)
                    .style("opacity", .2)
                    .attr("id", "path"+i)
                    .attr("class", "hull");
            }
        }
});



    ///////////////////

    console.log(all);

    //All vertex and edges: 
    svgtypes = SvgModulesINTRO
        .append("g")
        .attr("id", "modulesTypes")
        .selectAll("types")
        .data(all)
        .enter()

    console.log("all", all);

    var r = 1.6; 

    types = svgtypes.append("circle")
        // .filter(function(d, i) { return i < 2;})
        .attr({
            cx: function(d) {
                return d.x
            },
            cy: function(d) {
                return d.y
            },
            r: r,
            "class": function(d) {
                return d.name
            }
        })
        .style("fill", function(d) {
            return color(d.id)
        });
        // .call(force.drag);





    //LINKS as LINES by function
   for(i = 0, longitud = graph.links.length; i < longitud; i++){
        SvgModulesINTRO.append("line")
            .attr("x1", foci[graph.links[i].target].x)
            .attr("x2", foci[graph.links[i].source].x)
            .attr("y1", foci[graph.links[i].target].y)
            .attr("y2", foci[graph.links[i].source].y)
            .style("stroke", "#ccc")
            // .attr("id", function(d,i) {return "line"+[i]});
            .attr("class", "link")
            .attr("id", "line"+[i]);
    }


    //double links as LINES by function
   for(i = 0, longitud = graph.links.length; i < longitud; i++){
        SvgModulesINTRO.append("line")
            .attr("x1", foci[graph.links[i].target].x)
            .attr("x2", foci[graph.links[i].source].x)
            .attr("y1", foci[graph.links[i].target].y)
            .attr("y2", foci[graph.links[i].source].y)
            .style("stroke", "#ccc")
            .style("stroke-width", 12)
            .style("stroke-opacity", .2)
            .style("stroke-dasharray", ("5, 10"));
    }



/*
    var allMap = all.map(function(d) { return [ d.x, d.y ]});
    console.log("all.map", allMap);

    var allGroups = d3.nest()
            .key(function(d) { return d.name;  })
            .entries(all);
    var allGroups0 = allGroups[0];
    console.log("allGroups", allGroups[0]);
*/


    //Filtering all edges:
    d3.selectAll(".edge-0, .edge-1, .edge-2, .edge-3, .edge-4")
        .transition(500)
        .attr("r", .7);

/*    names = [graph.nodes[0].label, graph.nodes[1].label, graph.nodes[2].label, graph.nodes[3].label, graph.nodes[4].label, graph.nodes[5].label, graph.nodes[6].label, graph.nodes[7].label,  graph.nodes[8].label ];*/
    
    focis = [foci[0], foci[1], foci[2], foci[3], foci[4]];

    console.log("focis", focis);


/*      labels = SvgModulesINTRO
        .append("g")
        .attr("id", "modulesText")
        .selectAll("text")        
        .data(names)
        .enter()
        .append("text")
        .text(function(d) { return d })
        .attr("x", function(d, i) {
            return introModulesWidthAux2 / (n+1) + i*75;
        })
        .attr("y", introModulesHeightAux2 / 2)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", function(d, i) { return color(i)} );*/
 

 //Function for each module url:
    var urlFunction = function(d) {
      return ("data/rev_" + d + ".json")
    };

    //LABELS MODULES
    labels = SvgModulesINTRO
        .append("g")
        .attr("id", "modulesText")
        .selectAll("text")        
        .data(focis)
        .enter()
        .append("text")
        .text(function(d) { return d.name })
        .attr("id", function(d) { return "text-"+d.name })
        .attr("x", function(d) { return d.x })
        .attr("y", function(d) { return d.y })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .attr("fill", function(d, i) { return color(i)} );

       /* .on("click", function(d) {
            d3.select(this)
              .style("stroke", d3.select(this).attr("fill"))
              .style("stroke-width", 1)
              .style("stroke-opacity", .3);
            console.log(d.name);
            url = urlFunction(d.name);



            console.log(url);
            colorMod = d3.select(this).attr("fill");
            console.log(colorMod);
      color = colorMod.replace("#",""); 
      location.href="Test-GO_v27_Main_MOD.html?url="+url+"&color="+color;
            return draw();

          });

*/



/*    var pruebaX = d3.select("#line2").attr("x1");
    var pruebaY = d3.select("#line2").attr("y1");

    console.log("#line2.x1", d3.select("#line2").attr("x1"));*/



//////////////////////////////////////////




    var positionsTextY = new Array(graph.links.length);
    for(i = 0, longitud = graph.links.length; i < longitud; i++){

        if ((+d3.select("#line"+[i]).attr("y1"))>(+introModulesHeightAux2/2)+50) {
            positionsTextY[i] = (1.1*((+d3.select("#line"+[i]).attr("y1"))+(+d3.select("#line"+[i]).attr("y2")))/2);
        }
        
        

        else {
            positionsTextY[i] = ((+d3.select("#line"+[i]).attr("y1")+0.5*((+d3.select("#line"+[i]).attr("y2")))/2));
        }

    };


    var positionsTextX = new Array(graph.links.length);
    for(i = 0, longitud = graph.links.length; i < longitud; i++){
            positionsTextX[i] = ((+d3.select("#line"+[i]).attr("x1")+(+d3.select("#line"+[i]).attr("x2")))/2);
    };



    //LABELS DEPENDENCIES
    labelsDepend = SvgModulesINTRO
        .append("g")
        .attr("id", "dependenciesText")
        .selectAll("text")        
        .data(graph.links)
        .enter()
        .append("text")
        .text(function(d) { return d.label })
        .attr("x", function(d,i) { return positionsTextX[i] })
        .attr("y", function(d,i) { return positionsTextY[i] })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "11px")
        .attr("fill", "#606060");

   /*        .on("click", function(d) {
            d3.select(this)
              .style("stroke", d3.select(this).attr("fill"))
              .style("stroke-width", 1)
              .style("stroke-opacity", .3);
            
            SvgModulesINTRO
            .data(focis)

            console.log(d.name);
            url = urlFunction(d.label);
            console.log(url);
            colorMod = d3.select(this).attr("fill");


            console.log(colorMod);
            color = colorMod.replace("#",""); 
            location.href="Test-GO_v28_Main_DEP.html?url="+url+"&color="+color;
            return draw();

          });
*/

    //LINKSSS
     for(i = 0, longitud = graph.nodes.length; i < longitud; i++){
                console.log(focis[i].name);

        // d3.selectAll("#path"+i)
        d3.selectAll(".hull")
                .data(focis)
                .attr("newid", function(d) { return d.name})

            .on("click", function(d) {
                d3.selectAll(".hull")
                    .style("opacity", .4);
                    // .style("stroke-width", 30);

                d3.select("#INTRO").remove();

                d3.select(this)
                    .transition()
                    .style("stroke-width", 50)
                    // .style("fill", "brown")
                    // .style("stroke", "brown")
                    .style("opacity", .7);
                previousColor = d3.select(this).style("fill");

                //UPDATE TO NORMAL STATUS
                d3.selectAll("text")
                    .transition()
                    .duration(750)
                    .style("font-size", 16)
                    .style("fill", previousColor);

                title = d3.select(this).attr("newid");
                textId = "text-"+ title;
                console.log(textId);

                url = urlFunction(title);
                console.log(url);

                // colorMod = d3.select(this).attr("style", "fill");
                colorMod = d3.select(this).style("fill");
                console.log(colorMod);
                // color = colorMod.replace("#",""); 
                color = colorMod.toString(); 

                // location.href="Test-GO_v27_Main_MOD.html?url="+url+"&color="+color;
                // return draw();

                d3.select("#"+textId)
                    .transition()
                    .duration(750)
                    .style("font-size", 40)
                    .style("fill", "brown");
                
                d3.select("#svgModulesINTRO").select("g")
                    .transition()
                    .duration(750)
                    // .style("opacity", .5)
                    .attr("transform", "scale(.6) translate(300,0)");
                    // .attr("transform", "translate(0,100)");

                d3.select("h2")
                    .transition()
                    .duration(750)
                    .style("opacity", 0);
                
                d3.select("#svgModulesINTRO").select("g")
                    .append("text")
                    //                     .transition()
                    // .duration(500)
                    .attr("x", (+introModulesWidthAux2-150))
                    .attr("y", (+introModulesHeightAux2-50))
                    .text("back to INTRO")
                    // .style("fill", "grey")
                    .attr("font-size", "18px")
                    .attr("text-anchor", "right")
                    .attr("id", "INTRO");

               d3.select("#INTRO")
                .on("click", function(d) {
                                    
                    //UPDATE TO NORMAL STATUS
                    d3.select("#svgModulesINTRO").select("g")
                        .transition()
                        .duration(750)
                        // .style("opacity", .5)
                        .attr("transform", "scale(1) translate(0,0)");
                    
                    d3.select("h2")
                        .transition()
                        .duration(750)
                        .style("opacity", 1);

                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("opacity", 0);

                    d3.selectAll(".hull")
                        .transition()
                        .duration(500)
                        .style("opacity", .3);

                    d3.selectAll("text")
                        .transition()
                        .duration(500)
                        .style("font-size", 16)
                        .style("fill", previousColor);

                    });
         });
    }
    
/*    SvgModulesINTRO = d3.select("#svgModulesINTRO").select("g")
                .append("g")
                .attr("id", "background")
                .append("rect")
                .attr("width", introModulesWidthAux2)
                .attr("height", introModulesHeightAux2)
                .attr("x", 0)
                .attr("y", 0)
                .style("fill", "#F8F8F8")
                .style("opacity", .1);*/


    force.start();
    
})
