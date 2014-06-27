

### 1. LOCAL/ZOOMED GRAPH: Basic Representation & Interactions (test/user/interaction/graph)

1. **Use graphlib/algos** (sources, neighbors, tarjan...) on a interactive way instead of the alert boxes/console.log with textual info. 
    - **Selection test**: selecting and **graphically highlighting** them when clicking on a **specific vertex**, etc.  --> *IN PROGRESS*
    - **Filtering test**: test `digraph.filterNodes(f)` to make a copy of the diagraph that only includes the nodes based on a filter function. 

2. **Graphical representation** of **ARITY possibilities** -> many/many, many/one, etc with a legend. Some useful info [here](http://www.graphviz.org/doc/info/attrs.html#d:constraint).
    - Test: Select the edges by classes/attributes and modify their style, for example its color.
    - Select and modify the svg edge path elements to represent the different possibilities. 
        - a. Playing with the line-tension/multiplying elements at the beginning/end of the edge.
        - b. Edge tapering possibilities.

3. Implement this coding a **Contextual menu** to select neighbors, degree/threshold, strong components, cycles...(all graphlib/diagraph features/algos). 
[Relevant example](http://cs.brown.edu/people/jcmace/d3/graph.html?id=small.json)
    - Select the desired elements by calling the diagraph feature as tested.
    - Use `digraph.filterNodes(f)` to filter them as tested.

4. **In/out switch button**, to see the network connected backwards/afterwards (using `digraph.successors(u)` and `digraph.predecessors(u)` graphlib/diagraph features, based on an i degree.


 
### 2. PROJECT STRUCTURE  (test/requirejs/for/deps)

1. Set the **Project structure** with **require.js**.
    - Have a look to some tutos: [here](http://elblogdepicodev.blogspot.com.es/2013/03/introduccion-y-ejemplo-de-requirejs.html) and [here](http://www.cuble.es/javascript-modular-con-requirejs/).
    - Test again the **work-flow** and solve the issue I had with it.
    - Establish the **project modules**.



### 3. ROUTE MAP VIEW: Indexes/properties of vertex and edges while exploring the graph

1. **Connect the zoomed graph with a simple tree layout** [d3.layout.tree()](https://github.com/mbostock/d3/wiki/Tree-Layout) for showing the route as far as the user navigates on the graph. Create a new svg canvas for the RouteMap, and when clicking on a vertex, pushing a node on the tree layout on it, and so on, giving its basic hierarchy structure (root, parent/child...). Transition.
2. Display a text element as **label** of each node showing its **id and properties**.
3. **Contextual menu** on the RouteMap to allow **removing steps** on both RouteMap and Graph-LocalInfo, by exit/remove commands.
4. Possibility of graphically highlight the **path defined** on the graph while clicking on the nodes, which matches the RouteMap view.



### 4. GLOBAL VIEW: 

1. Load the **whole graph**, all the **modules connected** to the root protein vertex.
    - Get the model data of all modules.
    - Combine the json files on a single one.
    - Adapt it to graphlib, use it as input for dagre-d3 and link the layout data with the represented graph... all as done on the GO test, but with the whole set.
    - Vertex colored by its module, by selecting them with attribute/classes.
2. **General info** about each **module** loaded: a simple function to say the module name and a resume about it, the existence or not of dependencies, the number of vertex and edges loaded, last update, etc.
    - Find this info on Bio4j platform.
    - Code it so it is automatically linked. A post about this [here](http://www.vbforums.com/showthread.php?640866-How-to-use-javascript-to-extract-text-from-an-external-webpage)
3. Graphically show the **module dependencies** connection between specific vertex.
    - Edges showing dependencies highlighted by its class.
4. **Connect the whole graph with the local/zoomed graph**. 
    - Needs a **"LOAD button"** to load/refresh the desire modules selection.
    - Needs a **Minimap**/element as guide to show whatever fragment is explored on the local/zoomed graph.




### 5. INTRO INFO

1. Platform presentation with texts/descriptions about the Bio4j platform
2. Find the relevant info on the Bio4j page that could be showed.
3. See how to code this by linking the text info.



### 6. OPTIONAL IMPLEMENTATIONS:

1. Add a **Search text box** to browse the network on this way and searching for a specific element/family.
2. **Automatized the queries** on basic level, by defining a function that takes the indexes and parse them as they are needed on the Bio4j model.
2. Express somehow the **quantity of data** will be received with an specific request on both vertex/edges, like an order or magnitude.
4. Intangible properties ---> if a relation exists, then that means many other will be, or not... choose a representative example of this.




### TIMELINE - PHASE2
- Week0 (23June- 27 June) // from Phase1                [1]

----
- Week1 (30 June - 4 July)                              [1-2]
- Week2 (7 July - 11 July)                              [3]
- Week3 (14 July - 18 July)                             [4]
- Week4 (21 July - 25 July)                             [4]
- Week5 (28 July - 1 August)                            [5]
- Week6 (4 August - 8 August)                           

----

- Week7 (11 August - 15 August) // PENCILS DOWN PERIOD
- Week8 (18 August - 22 August) // FINAL EVALUATION PERIOD
- Week9 (25 August - 29 August) // FINAL RESULTS ANNUNCED
