 // NOMENCLATURE -> u:nodes / e:edges

 // SUCCESORS, PREDECESSORS & NEIGHBORS -> LOCAL (node:node)
 // digraph.successors(u)   -> solo a 1 nivel
 console.log(g.successors("8")); //prints 4, 10
 // console.log(g.successors(successors("8"))); //concatenar.. mal

 // digraph.predecessors(u)
 console.log(g.predecessors("10")); //prints 2 (solo conexion directa)
 // digraph.neighbors(u) -> successors + predecessors
 console.log(g.neighbors("3")); //prints 2, 4, 10

 // SOURCES, SINKS -> GLOBAL (general:node)
 // digraph.sources()
 console.log(g.sources());
 // digraph.sinks()
 console.log(g.sinks()); //prints 4, 7, 10, 12, 14

 // EXISTENCE OF EDGE (edge:true/false)
 //digraph.hasEdge(e)
 console.log(g.hasEdge("_5")); //prints true
 console.log(g.hasEdge("_25")); //prints false

 //digraph.edge(e, [value])
 //digraph.edge("A", "Some edge value");
 console.log(g.edge("_2", "loulou")); // mal:undefined..?


 // EDGES/NODE LIST (general: all edges)
 //digraph.edges()
 console.log("all g.edges: " + g.edges());
 console.log("all g.nodes: " + g.nodes());

 //digraph.eachEdge(f) 
 var results = {};
 g.eachEdge(function(e, u, v, label, inArity, alwaysDefined) {
     results[e] = "U: " + u + ", V: " + v + ", L: " + label + ", inArity: " + inArity, +", alwaysDefined: " + alwaysDefined;
 });
 console.log(results)
 // mal..edges labels/properties missing


 // SOURCE, TARGETS & INCIDENTS -> LOCAL  (edge:nodes)
 //digraph.source(e) +   //digraph.target(e)
 console.log(g.source("_2"));
 console.log(g.target("_2"));
 //digraph.incidentNodes(e)  ->   source+target
 console.log(g.incidentNodes("_2"));

 // IN-EDGES, OUT-EDGES & INCIDENTS -> LOCAL (node:edges)
 //digraph.inEdges(target, [source])
 console.log(g.inEdges(11)); //all edges going in node10
 console.log(g.inEdges(10, 9)); //just the edge going in node10 from node9
 //digraph.outEdges(source, [target])
 console.log(g.outEdges(11));
 console.log(g.outEdges(5)); //all edges groing from node5. works well wiht self-linking nodes :)
 //digraph.incidentEdges(u, [v])
 console.log(g.incidentEdges(11, 8)); //inEdges+outEdges



 layout.eachEdge(function(e, u, v, value) {
     console.log("Edge " + u + " -> " + v + ": " + JSON.stringify(value));
 });

 layout.eachNode(function(u, value) {
     console.log("Node " + u + ": " + JSON.stringify(value));
 });

 //ADDING/REMOVING NODES & COPY DIAGRAM
 // digraph.addNode(u, [value])
 // digraph.delNode(u)
 //digraph.copy()

 //digraph.filterNodes(f)
 // function filter(u) { return u === 1 || u === 2; }
 /*var copy = cgraph.filterNodes(filter);
      copy.nodes();
      // => [1, 2]

      copy.node(1);
      // => "node-1"

      copy.neighbors(2);
      // => [1]
    // mal.. dont understand!
*/
 //digraph.toGraph()  -> returns and undirected graph