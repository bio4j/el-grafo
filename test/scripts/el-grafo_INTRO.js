//COLOR PALETTE:
var bio4jColors = ["#449FB3  ","#2B5F73", "#49B4B4","#8E8E8E","#457FC1","#68DCFF","#3F464E "];
//Related colors:
// #817327,  #675D25, #673415

var color = d3.scale.category10()
    .range(bio4jColors);

var introModulesWidthAux2 = 570;
var introModulesHeightAux2 = 500;

//SVG canvas for modules loading
SvgModulesINTRO = d3.select("#svgModulesINTRO")
            .attr("width", introModulesWidthAux2)
            .attr("height", introModulesHeightAux2)
            .append("g");

////////////////////////////////


function draw0() {

  //Complete Domain Model schema:
  url0 = "data/modelService_schema.json";

  d3.json(url0, function(json0) {

    console.log("json0", json0);

    var newjson0 = json0.map(function(x) {
          return {
            id: x.label,
            Nvertex: x.vertexTypes.length,
            Nedges: x.edgeTypes.length,

            Dependencies: x.dependencies.length,
            };
        });
      
    console.log("newjson0", newjson0);


////////////////////////////////////////////////////////////
  


 var graph2 = json0.map(function(x) {
          return {
            id: x.label,
            Nvertex: x.vertexTypes.length,
            Nedges: x.edgeTypes.length,

            Dependencies: x.dependencies.length,
            };
        });
      
    console.log("graph2", graph2);


/////////////////////////////////////////////////

      //data remaped for the forcelayout scheme
      var nodes = newjson0.map(function(x) {
  /*    if (x.Nvertex>0) return {"wowow"}
                    else {"wiwi" };*/

        return {
            id: "LALALA",
            label: x.id,
            vertexTypesLength: x.Nvertex,
            edgeTypesLength: x.Nedges
            };
        });
      
    console.log("nodes", nodes);

    
    /*else {

    console.log("ELSE");

    var links = newjson0.map(function(x) {
        arrayModules = [];
        var (i = 0; i < 10; i++
          return {
            id: arrayModules.push(i),
            label: x.id,
            edgeTypesLength: x.Nvertex,
            vertexTypesLength: x.Nedges

            // nodes: { module: x.label },
            // nodes: { module: x.label, label: x.vertexTypes.label, propertyTypes: x.vertexTypes.properties },
            // links: { module: module, label: x.label, propertyTypes: x.properties }     
            };*/

})
}

/////////////////////////////////////////


 d3.json("data/rev_schema_forceLayout_CLEAN.json", function(error, graph) {
    
    console.log("graph", graph);

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

    var Strength = function(x, y, name) {
        return {
            x: x,
            y: y,
            charge: -2.5,
            fixed: true,
            name: name
        }
    };

    var Links = function(nodes, strength) {
        return nodes.map(function(node) {
            return {
                source: node,
                target: strength
            }
        })
    };


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


///////////////////////////////////////////////////


        var NumNodes = new Array(graph.nodes.length);
        var NumEdges = new Array(graph.nodes.length);
        
        var nodesv = new Array(graph.nodes.length);
        var nodese = new Array(graph.nodes.length);

        var nodesVector = new Array(graph.nodes.length);
        
        for(i = 0, longitud = graph.nodes.length; i < longitud; i++){

            NumNodes[i] = graph.nodes[i].vertexTypesLength;
            NumEdges[i] = graph.nodes[i].edgeTypesLength;

            nodesv[i] = Nodes(NumNodes[i], i, "node-"+i),
            nodese[i] = Nodes(NumEdges[i], i, "edge-"+i),
            nodesVector[i] = nodesv[i].concat(nodese[i]);
        }

    //POSITIONS STRENGHTS MANUALLY TEMPORARY   
    xUniprot = (introModulesWidthAux2 / 2);
    yUniprot = (introModulesHeightAux2 / 2);

    var positionsManuallyX = [(xUniprot + 130), (xUniprot - 95), (xUniprot + 100), (xUniprot - 140), (xUniprot)]; 
    var positionsManuallyY = [(yUniprot - 50), (yUniprot - 120), (yUniprot + 60), (yUniprot + 90), (yUniprot)];

    //STRENGTHS AND LINKS STRENGTHS-NODES
    var strength = new Array(graph.nodes.length);
    var links = new Array(graph.nodes.length);
    for(i = 0, longitud = graph.nodes.length; i < longitud; i++){
        strength[i] = Strength(positionsManuallyX[i], positionsManuallyY[i], graph.nodes[i].label);
        links[i]  = Links(nodesVector[i], strength[i]);
    }

    var aux = new Array(graph.nodes.length);
    var all = nodesVector[0].concat(nodesVector[1]);
    for(i = 2, longitud = graph.nodes.length; i < longitud; i++){
        if(i+1 != longitud)
            all = all.concat(nodesVector[i]);
        else{
            all = all.concat(nodesVector[i]);
            for(i = 0, longitud = graph.nodes.length; i < longitud; i++)
                aux[i] = (strength[i]);
                
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


/////////////////////

    d3.select("#svgMainGraph")
        .attr("width", 10);

///////////////////

    //All vertex and edges: 
    svgtypes = SvgModulesINTRO
        .append("g")
        .attr("id", "modulesTypes")
        .selectAll("types")
        .data(all)
        .enter()

    var r = 1.6; 
    types = svgtypes.append("circle")
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
                        // "class": "strengths"
                    })

                    .style("fill", function(d) {
                        return color(d.id)
                    });
                    // .call(force.drag);


    //LINKS as LINES by function
   for(i = 0, longitud = graph.links.length; i < longitud; i++){
        SvgModulesINTRO.append("line")
            .attr("x1", strength[graph.links[i].target].x)
            .attr("x2", strength[graph.links[i].source].x)
            .attr("y1", strength[graph.links[i].target].y)
            .attr("y2", strength[graph.links[i].source].y)
            .style("stroke", "#ccc")
            .attr("class", "link");
    }

    //double links as LINES by function
   for(i = 0, longitud = graph.links.length; i < longitud; i++){
        SvgModulesINTRO.append("line")
            .attr("x1", strength[graph.links[i].target].x)
            .attr("x2", strength[graph.links[i].source].x)
            .attr("y1", strength[graph.links[i].target].y)
            .attr("y2", strength[graph.links[i].source].y)
            .style("opdacity", 0)
            .attr("id", "line"+[i]);
    }

////////////////////////////////////////////////////////////////////


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
        .attr("class", "dependenciesText")
        .selectAll("text")        
        .data(graph.links)
        .enter()
        .append("text")
        .attr("id", (function(d) { return d.label }))
        .text(function(d) { return d.label })
        .attr("x", function(d,i) { return positionsTextX[i] })
        .attr("y", function(d,i) { return positionsTextY[i] })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        .attr("fill", "#606060")
        .style("opacity", .1);


////////////////////////////////////////////////////////////////////


function backIntro() {

    //Removing all legend on Intro Menu
    svgRouteMap.select("#legend") 
        .style("opacity", 0); 
    svgRouteMap.select("#moduleTitle") 
        .style("opacity", 0); 
    svgRouteMap.select("#moduleInfo") 
        .style("opacity", 0); 

    //Modules texts back to their color & opacity   
    var textColor = d3.select("#modulesText").selectAll("text").each( function(d,i) {
        textColor2 = d3.select(this).attr("textColor");
        console.log("textColor2", textColor2);

        d3.select(this).transition()
        .duration(500)
        .style("font-size", 20)
        .style("opacity", 1)
        .style("fill", textColor2);
    });

    d3.select("#modulesText").selectAll("text")

}

/////////

function clickIntro() {

  // zoom.scale(1);
  //   zoom.translate([0, 0]);

    //COMMON BEHAVIOUR
    //SVG size transformation to avoid overlapping issues
    d3.select("#svgModulesINTRO")
        .transition()
        .duration(750)
        .attr("width", (introModulesWidthAux2-200));

    d3.select("#svgMainGraph")
        .attr("width", mainGraphWidth);

    d3.selectAll(".introTEXT")
        .transition()
        .duration(750)
        .style("opacity", 0);

    d3.select("#instructionsTEXT")
                .transition()
                .duration(500)
                .style("opacity", 1);

    //UPDATE TO NORMAL STATUS
    d3.select("#modulesText").selectAll("text")
        .transition()
        .duration(750)
        .style("font-size", 20)
        .style("opacity", .3)
        // .style("fill", "lightgrey");

    //modules scheme smaller as guide
    d3.select("#svgModulesINTRO").select("g")
        .transition()
        .duration(1000)
        .attr("transform", "scale(.7) translate(-70,-20)");

    d3.select("#svgMainGraph")
        .transition()
        .duration(750)
        .style("opacity", 1);

    //un-highligting elements
    d3.selectAll(".hull")
        .style("opacity", .4);                 

    d3.selectAll(".link")
        .transition()
        .duration(750)
        .style("opacity", .4)
        .style("stroke-width", 10);

    d3.selectAll(".backButton")
        .transition()
        .duration(750)
        .style("opacity", 1);
    
    d3.selectAll("#buttons")
        .transition()
        .duration(750)
        .style("opacity", 1);

    //Removing specific Protein info
    svgRouteMap.selectAll(".VertexIndexProperties") 
        .remove();   


    svgRouteMap.select("#legend") 
        .style("opacity", 1); 
    svgRouteMap.select("#moduleTitle") 
        .style("opacity", 1); 
    svgRouteMap.select("#moduleInfo") 
        .style("opacity", 1); 

}


/////////////////////////////////////////

    //LINKS ON CLICK
    d3.selectAll(".link")
        .data(graph.links)
        .attr("id", function(d) { return d.label })
        .on("click", function(d) {
                    clickIntro();                                       

                    title = d3.select(this).attr("id");
                    url = urlFunction(title);
                    console.log("title", title);

                    colorMod = d3.select(this).style("stroke");
                    color = colorMod.toString(); 

                    d3.selectAll(".dependenciesText").selectAll("text")
                        .transition()
                        .duration(750)
                        .style("opacity", 1);

                    // d3.selectAll(".dependenciesText").select("#"+title)


                    d3.selectAll("#"+title).selectAll("text")
                        .transition()
                        .duration(750)
                        .style("fill", "brown");
      

                    d3.select(this)
                        .transition()
                        .duration(750)      
                        .style("stroke-width", 30);
                        // .style("stroke", "grey");

                    previousColor = d3.select(this).style("fill");



                    d3.selectAll("#buttons")
                        .on("click", function(d) {
                            
                            backIntro();                                       

                            //SVG size transformation to avoid overlapping issues
                            d3.select("#svgModulesINTRO")
                                .transition()
                                .duration(1000)
                                .attr("width", introModulesWidthAux2);

                            d3.select("#svgMainGraph")
                                .attr("width", 10);

                            //UPDATE TO NORMAL STATUS
                            d3.select("#svgModulesINTRO").select("g")
                                .transition()
                                .duration(1000)
                                .attr("transform", "scale(1) translate(0,0)");
                                
                            d3.selectAll(".introTEXT")
                                    .transition()
                                    .duration(1000)
                                    .style("opacity", 1);

                            d3.select("#instructionsTEXT")
                                .transition()
                                .duration(500)
                                .style("opacity", 0);

                            d3.selectAll(".backButton")
                                .transition()
                                .duration(750)
                                .style("opacity", 0);

                            d3.selectAll(".backButton")
                                .transition()
                                .duration(750)
                                .style("opacity", 0);

                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style("opacity", 0);

                            d3.selectAll(".hull")
                                .transition()
                                .duration(500)
                                .style("opacity", .3);

                            d3.select("#svgMainGraph")
                                .transition()
                                .duration(750)
                                .style("opacity", 0)

                            d3.selectAll(".link")
                                .transition()
                                .duration(750)
                                .style("opacity", .4)
                                .style("stroke-width", 10);

                            d3.select("#INTRO")
                                    .transition()
                                    .duration(750)
                                    .style("opacity", 0);
                    });
                   
            return drawDep();
        });



////////////////////////////////////////////////////////////////////

    //Filtering all edges:
    d3.selectAll(".edge-0, .edge-1, .edge-2, .edge-3, .edge-4")
        .transition(500)
        .attr("r", .7);
    
    strengths = [strength[0], strength[1], strength[2], strength[3], strength[4]];
    // console.log("strengths", strengths);

 //////////////////////////////////////////


 //Function for each module url:
    var urlFunction = function(d) {
      return ("data/rev_" + d + ".json")
    };

    //LABELS MODULES
    labels = SvgModulesINTRO
        .append("g")
        .attr("id", "modulesText")
        .selectAll("text")        
        .data(strengths)
        .enter()
        .append("text")
        .text(function(d) { return d.name })
        .attr("id", function(d) { return "text-"+d.name })
        .attr("x", function(d) { return d.x })
        .attr("y", function(d) { return d.y })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "20px")
        .attr("textColor", function(d, i) { return color(i)} )
        .style("fill", function(d, i) { return color(i)} );


//////////////////////////////////////////


    //Back to intro button/text
    var IntroXPosit = (+introModulesWidthAux2-150);
    var IntroYPosit = (+introModulesHeightAux2-50);

    d3.select("#svgModulesINTRO").select("g")
        .append("text")
        // .transition()
        // .duration(500)
        .attr("x", IntroXPosit)
        .attr("y", IntroYPosit)
        .text("back to INTRO")
        // .style("fill", "grey")
        .attr("font-size", "20px")
        .attr("text-anchor", "right")
        .attr("id", "INTRO")
        .attr("class", "backButton")
        .style("opacity", 0);

    d3.select("#svgModulesINTRO").select("g")
        .append("g")
        .attr("id", "buttons")
        .selectAll("path")
        .data([0,1,2])
        .enter()
        .append("path")
        .attr("class", "backButton")
        .attr("d", d3.svg.symbol().type('triangle-up').size(80))
        .style("fill", "brown")
        .attr("transform", function(d, i) {return "translate("+ ((+IntroXPosit-15)-(i*15))+","+(+IntroYPosit-5)+") rotate(-90)"})
        .style("opacity", 0);


    //MODULES ON CLICK
     // for(i = 0, longitud = graph.nodes.length; i < longitud; i++){

    // d3.selectAll("#path"+i)
    d3.selectAll(".hull")
            .data(strengths)
            .attr("newid", function(d) { return d.name})

            .on("click", function(d) {
                clickIntro();
                console.log("d.newid", d3.select(this).attr("newid"));


                d3.select(this)
                    .transition()
                    .style("stroke-width", 50)
                    .style("opacity", .7);
                
                previousColor = d3.select(this).style("fill");

                title = d3.select(this).attr("newid");
                textId = "text-"+ title;

                url = urlFunction(title);

                colorMod = d3.select(this).style("fill");
                color = colorMod.toString(); 

                d3.select("#"+textId)
                    .transition()
                    .duration(750)
                    .style("font-size", 40)
                    .style("opacity", 1)
                    .style("fill", "brown");
                

                
                // return force.start();
                // return draw0();

                d3.selectAll("#buttons")
                    .on("click", function(d) {

                        backIntro(); 

                        // console.log("colorMod", colorMod);

                        //SVG size transformation to avoid overlapping issues
                        d3.select("#svgModulesINTRO")
                            .transition()
                            .duration(1000)
                            .attr("width", introModulesWidthAux2);

                        d3.select("#svgMainGraph")
                            .attr("width", 10);

                        //UPDATE TO NORMAL STATUS
                        d3.select("#svgModulesINTRO").select("g")
                            .transition()
                            .duration(1000)
                            .attr("transform", "scale(1) translate(0,0)");
                            
                        d3.selectAll(".introTEXT")
                                .transition()
                                .duration(1000)
                                .style("opacity", 1);

                        d3.select("#instructionsTEXT")
                            .transition()
                            .duration(500)
                            .style("opacity", 0);

                        d3.selectAll(".backButton")
                            .transition()
                            .duration(750)
                            .style("opacity", 0);

                        d3.selectAll(".backButton")
                            .transition()
                            .duration(750)
                            .style("opacity", 0);

                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style("opacity", 0);

                        d3.selectAll(".hull")
                            .transition()
                            .duration(500)
                            .style("opacity", .3);

                        d3.select("#svgMainGraph")
                            .transition()
                            .duration(750)
                            .style("opacity", 0)

                        d3.select("#INTRO")
                                .transition()
                                .duration(750)
                                .style("opacity", 0);
                });

            return draw();
         });
    // }

    force.start();
    
})
