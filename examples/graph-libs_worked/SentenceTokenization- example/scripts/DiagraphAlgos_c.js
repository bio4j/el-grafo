 // ALG:

 // TARJAN: STRONGLY CONNECTED COMPONENTS
 // var tarjan = require("graphlib").alg.tarjan;
 console.log(tarjan(g))
 //Array of components, each of them is itself an array with the ids. It gives lots of 1-array objetcs when there are no strongly connected components.


 // IS ACYCLIC, FIND CLYCLES
 // alg.isAcyclic(g)
 // console.log(isAcyclic(g));    //Gives TRUE if the graph has no cycles and returns false if it does. -ERROR: if there are cycles gives Exception isntead of False.
 // alg.findCycles(g)
 console.log(findCycles(g)); //Returns all nodes that are part of a cycle-> Arrays of these cycles if there are more.


 // TOPSORT: TOPOLOGICAL SORTING
 // var alg = require("graphlib").alg;
 // var topsort = require("graphlib").alg.topsort.
 // console.log(topsort(g));  // If the graph has a cycle it is impossible to generate such a list and CycleException is thrown. ojo! cycles include self-linking nodes


 // DIJKSTRA & FLOYDWARSHALL: SHORTEST PATH
 // alg.dijkstra(g, source, [weightFunc], [incidentFunc])
 // console.log(dijkstra(g, "5"));      //ERROR: anonymous function (in the js alg file)
 // alg.dijkstraAll(g, [weightFunc], [incidentFunc])
 // console.log(dijkstraAll(g));        //ERROR: anonymous function (in the js alg file)
 // alg.floydWarshall(g, [weightFunc], [incidentFunc])
 console.log(floydWarshall(g)); //Si funciona, xo da lista infinita de cosas


 // ALL CONNECTED COMPONENTS -----ERROR
 // console.log(components(g));    //NO FUNCIONA: anonymous function (in the js alg file)



 //OTHERS, not suitable for directed graphs
 //PRIM: MINIMUM SPANNING TREE
 //alg.prim(g, weightFunc)
 //PREORDER: MINIMUM SPANNING TREE
 // alg.preorder(g, root, callback)  
 //POSTORDER: MINIMUM SPANNING TREE
 // alg.postorder(g, root, callback)