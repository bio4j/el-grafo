//COLOR PALETTE:
var bio4jColors = ["#449FB3","#2B5F73", "#49B4B4","#8E8E8E","#457FC1","#68DCFF","#3F464E"];
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

    var newjson0 = json0.map(function(x) {
          return {
            id: x.label,
            Nvertex: x.vertexTypes.length,
            Nedges: x.edgeTypes.length,
            Dependencies: x.dependencies.length,
            source: x.dependencies[0],
            target: x.dependencies[1],
            };
        });
      
/////////////////////////////////////////////////

    var nested_data = d3.nest()
            .key(function(d) {return d.Dependencies; })
            .entries(newjson0);

/////////////////////////////////////////

    var nodes0 = nested_data[0].values

    var nodes = nodes0.map(function(x, i) {
          return {
            id: i,
            label: x.id,
            vertexTypesLength: x.Nvertex,
            edgeTypesLength: x.Nedges,
            };
        });
      
    ////
    
    function arrayObjectIndexOf(nodes, searchTerm, property) {
        for(var i = 0, len = nodes.length; i < len; i++) {
            if (nodes[i][property] === searchTerm) return i;
        }
        return -1;
    }
    arrayObjectIndexOf(nodes, "refseq", "label");

    ////

    var edges0 = nested_data[1].values

    var edges = edges0.map(function(x, i) {
          return {
            label: x.id,
            vertexTypesLength: x.Nvertex,
            edgeTypesLength: x.Nedges,
            sourceLabel: x.source,
            source: arrayObjectIndexOf(nodes, x.source, "label"),
            targetLabel: x.target,
            target: arrayObjectIndexOf(nodes, x.target, "label"),
            };
        });

    ////////////////////

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
                charge: -6.0,
                name: name,
            }
        })
    };

    var Strength = function(x, y, name) {
        return {
            x: x,
            y: y,
            charge: -1,
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
    for (var i = 0; i < nodes.length; i++) {         
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

        var NumNodes = new Array(nodes.length);
        var NumEdges = new Array(nodes.length);
        
        var nodesv = new Array(nodes.length);
        var nodese = new Array(nodes.length);

        var nodesVector = new Array(nodes.length);
        
        for(i = 0, longitud = nodes.length; i < longitud; i++){

            NumNodes[i] = nodes[i].vertexTypesLength;
            NumEdges[i] = nodes[i].edgeTypesLength;

            nodesv[i] = Nodes(NumNodes[i], i, "node-"+i),
            nodese[i] = Nodes(NumEdges[i], i, "edge-"+i),
            nodesVector[i] = nodesv[i].concat(nodese[i]);
        }

    //POSITIONS STRENGHTS MANUALLY    
    xUniprot = (introModulesWidthAux2 / 2);
    yUniprot = (introModulesHeightAux2 / 2);

    var positionsManuallyX = [(xUniprot + 130), (xUniprot - 95), (xUniprot + 100), (xUniprot - 140), (xUniprot)]; 
    var positionsManuallyY = [(yUniprot - 70), (yUniprot - 120), (yUniprot + 60), (yUniprot + 90), (yUniprot)];

    //STRENGTHS AND LINKS STRENGTHS-NODES
    var strength = new Array(nodes.length);
    var links = new Array(nodes.length);
    for(i = 0, longitud = nodes.length; i < longitud; i++){
        strength[i] = Strength(positionsManuallyX[i], positionsManuallyY[i], nodes[i].label);
        links[i]  = Links(nodesVector[i], strength[i]);
    }

    var aux = new Array(nodes.length);
    var all = nodesVector[0].concat(nodesVector[1]);
    for(i = 2, longitud = nodes.length; i < longitud; i++){
        if(i+1 != longitud)
            all = all.concat(nodesVector[i]);
        else{
            all = all.concat(nodesVector[i]);
            for(i = 0, longitud = nodes.length; i < longitud; i++)
                aux[i] = (strength[i]);
                
            all = all.concat(aux);
        }
    }

    //FORCES
    var forceLinks = links[0];
    for(i = 1, longitud = nodes.length; i < longitud; i++)
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
        for(i = 0, longitud = nodes.length; i < longitud; i++){
            if((NumEdges[i]) >= 2){
                SvgModulesINTRO.select("#path"+i)
                    .data([d3.geom.hull(nodesVector[i].map(function(d) { return [ d.x, d.y ]; }))])
                    .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
                    .style("fill", bio4jColors[i] )
                    .style("stroke", bio4jColors[i] );
            }
            else {
                var circleId = d3.select(".hull").attr("newid");
            
                d3.select("#path"+i)
                    .remove();

                d3.selectAll(".node-"+i)
                    .style("stroke", bio4jColors[i])
                    .style("stroke-width", 8)
                    .style("opacity", .2)
                    .attr("newid", circleId)
                    // .attr("id", "path"+i)
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
                    })

                    .style("fill", function(d) {
                        return color(d.id)
                    });

    //LINKS as LINES by function
   for(i = 0, longitud = edges.length; i < longitud; i++){
        SvgModulesINTRO.append("line")
            .attr("x1", strength[edges[i].target].x)
            .attr("x2", strength[edges[i].source].x)
            .attr("y1", strength[edges[i].target].y)
            .attr("y2", strength[edges[i].source].y)

            .attr("linkSource", strength[edges[i].source].name)
            .attr("linkTarget", strength[edges[i].target].name)
            .style("opacity", 0)
            .attr("class", "link");
    }

    //double links as LINES by function
   for(i = 0, longitud = edges.length; i < longitud; i++){
        SvgModulesINTRO.append("line")
            .attr("x1", strength[edges[i].target].x)
            .attr("x2", strength[edges[i].source].x)
            .attr("y1", strength[edges[i].target].y)
            .attr("y2", strength[edges[i].source].y)
            .style("opacity", 1)
            .style("stroke", "#ccc")

            .attr("class", "link2")
            .attr("id", "line"+[i]);
    }

////////////////////////////////////////////////////////////////////

    var positionsTextX = new Array(edges.length);
    for(i = 0, longitud = edges.length; i < longitud; i++){
            positionsTextX[i] = ((+d3.select("#line"+[i]).attr("x1")+(+d3.select("#line"+[i]).attr("x2")))/2);
    };

    var positionsTextY = new Array(edges.length);
    for(i = 0, longitud = edges.length; i < longitud; i++){
            positionsTextY[i] = ((+d3.select("#line"+[i]).attr("y1")+(+d3.select("#line"+[i]).attr("y2")))/2 -10);
    };

    //LABELS DEPENDENCIES
    labelsDepend = SvgModulesINTRO
        .append("g")
        .attr("class", "dependenciesText")
        .selectAll("text")        
        .data(edges)
        .enter()
        .append("text")
        .attr("id", (function(d) { return d.label }))
        .text(function(d) { return d.label })
        .attr("x", function(d,i) { return positionsTextX[i] })
        .attr("y", function(d,i) { return positionsTextY[i] })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "20px")
        .attr("fill", "#606060")
        .style("opacity", 0);

////////////////////////////////////////////////////////////////////

function backIntro() {

    //Setting tooltip behaviour
    d3.select("#tooltip")
        .transition()
        .duration(750)
        .style("opacity", 1);

    //Setting tooltip behaviour
    d3.select("#tooltipDep")
        .transition()
        .duration(750)
        .style("opacity", 1);

    //All hull paths back to normal status
    d3.selectAll(".hull").filter("path")
        .style("stroke-width", 30);

    //Removing all legend on Intro Menu
    svgRouteMap.select("#legend") 
        .style("opacity", 0); 
    svgRouteMap.select("#moduleTitle") 
        .style("opacity", 0); 
    svgRouteMap.select("#moduleInfo") 
        .style("opacity", 0); 
    svgRouteMap.selectAll(".VertexIndexProperties") 
        .style("opacity", 0); 

    //Modules texts back to their color & opacity   
    var textColor = d3.select("#modulesText").selectAll("text").each( function(d,i) {
        textColor2 = d3.select(this).attr("textColor");

    d3.selectAll(".link")
        .style("opacity", "0");

     d3.selectAll(".dependenciesText").selectAll("text")
            .transition()
            .duration(750)
            .style("opacity", 0)
            .style("font-size", 20)
            .style("fill", "grey");

    d3.select(this).transition()
        .duration(500)
        .style("font-size", 20)
        .style("opacity", 1)
        .style("fill", textColor2);
    });

    d3.select("#modulesText").selectAll("text")
}

/////////

   function clickCircle() {

    d3.selectAll(".hull").filter("circle")
        .on("click", function(d) {
                
                clickIntro();

                d3.select(this)
                    .transition()
                    .style("stroke-width", 9)
                    .style("opacity", .8);
                
                previousColor = d3.select(this).style("fill");

                //UPDATE texts TO NORMAL STATUS
                d3.select("#modulesText").selectAll("text")
                    .transition()
                    .duration(750)
                    .style("font-size", 20)
                    .style("opacity", .3);

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

            return draw();
});
};

///////////////////////////////////

function clickIntro() {

    //Setting tooltip behaviour
    d3.select("#tooltip")
        .transition()
        .duration(750)
        .style("opacity", 0);

    //Setting tooltip behaviour
    d3.select("#tooltipDep")
        .transition()
        .duration(750)
        .style("opacity", 0);

    d3.selectAll(".dependenciesText").selectAll("text")
        .transition()
        .duration(750)
        .style("opacity", 0)
        .style("font-size", 20)
        .style("fill", "grey");

    //COMMON BEHAVIOUR
    //SVG size transformation to avoid overlapping issues
    d3.select("#svgModulesINTRO")
        .transition()
        .duration(750)
        .attr("width", (introModulesWidthAux2-200));

    d3.selectAll(".hull").filter("path")
        .style("stroke-width", 30);

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
        .style("opacity", .3);

    var modulesReduction = 0.7;
    //modules scheme smaller as guide
    d3.select("#svgModulesINTRO").select("g")
        .transition()
        .duration(1000)
        .attr("transform", "scale(" + modulesReduction +") translate(-70,-20)");

    d3.select("#svgMainGraph")
        .transition()
        .duration(750)
        .style("opacity", 1);

    //un-highligting elements
    d3.selectAll(".hull")
        .style("opacity", .4);                 

    d3.selectAll(".link")
        .style("opacity", "0");

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
        .data(edges)
        .attr("id", function(d) { return d.label })
        .on("click", function(d) {
                    clickIntro();                                       

                    title = d3.select(this).attr("id");
                    url = urlFunction(title);

                    colorMod = d3.select(this).style("stroke");
                    color = colorMod.toString(); 

                    d3.selectAll(".dependenciesText").select("#"+title)
                        .transition()
                        .duration(750)
                        .style("font-size", 35)
                        .style("opacity", 1)
                        .style("fill", "brown");
                    
                    d3.select(this)
                        .style("opacity", ".2");

                    linkSource = d3.select(this).attr("linkSource");
                    linkTarget = d3.select(this).attr("linkTarget");

                    linkSourceColor = d3.select("[newid ="+linkSource+"]")
                        .style("fill");

                    linkTargetColor = d3.select("[newid ="+linkTarget+"]")
                        .style("fill");

                     d3.select("[newid ="+linkSource+"]")
                        .transition()
                        .duration(750)
                        .style("opacity", .9);

                     d3.select("[newid ="+linkTarget+"]")
                        .transition()
                        .duration(750)
                        .style("opacity", .9);

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
        .attr("x", IntroXPosit)
        .attr("y", IntroYPosit)
        .text("back to INTRO")
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
    d3.selectAll(".hull")
            .data(strengths)
            .attr("newid", function(d) { return d.name})
            .on("click", function(d) {

                clickCircle();
                clickIntro();

                d3.select(this)
                    .transition()
                    .style("stroke-width", 70)
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

                        d3.select("#INTRO")
                                .transition()
                                .duration(750)
                                .style("opacity", 0);
                });

            return draw();
         });

//////////////////////// 

    //TOOLTIPS MODULE INFO
    //Order: enzymedb, go, ncbiTaxonomy, refseq, uniprot
    var moduleData = [
    "ENZYME is a repository of information relative to the nomenclature of enzymes. It is primarily based on the recommendations of the Nomenclature Committee of the International Union of Biochemistry and Molecular Biology (IUBMB) and it describes each type of characterized enzyme for which an EC (Enzyme Commission) number has been provided.",
    "The Gene Ontology project provides an ontology of defined terms representing gene product properties. GO consists of three independent sub-ontologies: cellular component, molecular function & biological process.",
    "The Taxonomy Database is a curated classification and nomenclature for all of the organisms in the public sequence databases. Bio4j includes the whole NCBI taxonomy tree.",
    "The Reference Sequence (RefSeq) collection aims to provide a comprehensive, integrated, non-redundant, well-annotated set of sequences, including genomic DNA, transcripts, and proteins.",
    "The UniProt Knowledgebase (UniProtKB) is the central hub for the collection of functional information on proteins, with accurate, consistent and rich annotation."
    ];

    d3.selectAll(".hull")
         .data(moduleData)
         .attr("moduleInfo", function(d) { return d;});

  //HTML div Tooltip for Module info
    d3.selectAll(".hull")
         .on("mouseover", function(d) {

        d3.selectAll(".link")
                .style("opacity", "0");

        d3.select(this)
            .transition()
            .duration(250)
            .style("opacity", .8);

        function getCentroid(selection) {
            var element = selection.node(),
                bbox = element.getBBox();
                bboxwidth = bbox.width;
            return [(+bbox.x +bbox.width ), (bbox.y + bbox.height/2)];
        }

          var xPosition = (+getCentroid(d3.select(this))[0]);
          var yPosition = getCentroid(d3.select(this))[1];
          var newId = d3.select(this).attr("newid");
          var  colorHull = d3.select(this).style("fill");
          var  moduleHull = d3.select(this).attr("moduleInfo");

          //Update the tooltip position and value
          d3.select("#tooltip")
            .style("left", (+xPosition) + 110+ "px")
            .style("top", (+yPosition + 40) + "px")     
            .style("background-color", colorHull)   

            .select("#value")
            .text(function(d) {
                return moduleHull;     
             });

          //Show the tooltip
          d3.select("#tooltip").classed("hidden", false);

         })

         .on("mouseout", function() {
         
          //Hide the tooltip
          d3.select("#tooltip").classed("hidden", true);

          d3.selectAll(".hull")
            .transition()
            .duration(250)
            .style("opacity", .4);

          });

////////////////

//HTML div Tooltip for Module info
    d3.selectAll(".link")
         .on("mouseover", function(d) {

            d3.selectAll(".link")
                .style("opacity", "0");

            d3.select(this)
                .style("opacity", ".2");

            linkSource = d3.select(this).attr("linkSource");
            linkTarget = d3.select(this).attr("linkTarget");

            x1TooltipDep = d3.select(this).attr("x1");
            x2TooltipDep = d3.select(this).attr("x2");
            xTooltipDep = ((+x1TooltipDep + (+x2TooltipDep))/2);

            y1TooltipDep = d3.select(this).attr("y1");
            y2TooltipDep = d3.select(this).attr("y2");
            yTooltipDep = ((+y1TooltipDep + (+y2TooltipDep))/2);
        
        //Update the tooltip position and value
          d3.select("#tooltipDep")
            .style("left",  xTooltipDep + 100 +"px")
            .style("top",  xTooltipDep + (-20) +"px")    
            .style("background-color", "grey")   

            .select("#linkSource")
            .text(function(d) {
                return linkSource;     
             });

        linkSource = d3.select(this).attr("linkSource");
        linkTarget = d3.select(this).attr("linkTarget");

         d3.select("[newid ="+linkSource+"]")
            .transition()
            .duration(250)
            .style("opacity", .8);

         d3.select("[newid ="+linkTarget+"]")
            .transition()
            .duration(250)
            .style("opacity", .8);

        d3.select("#tooltipDep")
            .select("#linkTarget")
            .text(function(d) {
                return linkTarget;     
             });

          //Show the tooltip
          d3.select("#tooltipDep").classed("hidden", false);
         })

         .on("mouseout", function() {
         
          //Hide the tooltip
          d3.select("#tooltipDep").classed("hidden", true);
          
          d3.selectAll(".link")
            .style("opacity", 0);

          d3.selectAll(".hull")
            .transition()
            .duration(250)
            .style("opacity", .4);
          });

    force.start();
    
})
}
