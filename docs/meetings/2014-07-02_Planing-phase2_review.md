# CONTENT PHASE2

## Project Structure

Set the **Project structure** with **require.js**.
    - Have a look to some tutos: [here](http://elblogdepicodev.blogspot.com.es/2013/03/introduccion-y-ejemplo-de-requirejs.html) and [here](http://www.cuble.es/javascript-modular-con-requirejs/).
    - Test again the **work-flow** and solve the issue I had with it.
    - Establish the **project modules**.



## 3 Navigation Levels:

### A. INTRO: BIO4J DATABASE GLOBAL VIEW, GENERIC INFO 
Intro page of the project.

1. Represent the **whole graph** on a very simple graphical way, with all the **modules connected** to the root protein vertex and the **module dependencies** between modules.
    - Get the model data of all the modules via http request. By now 'http://localhost:8080/schema/...' 
    - Load all json files at once and represent them on something schematic visually based on relevant graph data (Nº of vertex and nodes, etc).
    - Vertex colored by its module, by selecting them with attribute/classes.
    - **"LOAD button"** to load the desire module selection as graph, by associating an url with the json file to each module representation

2. Link to it all **general info** about each **module** loaded: a simple function to say the module name and a resume about it, the existence or not of dependencies, the number of vertex and edges loaded, last update, etc.
    - Find this info on Bio4j platform.
    - Code it so it is automatically linked. A post about this [here](http://www.vbforums.com/showthread.php?640866-How-to-use-javascript-to-extract-text-from-an-external-webpage)

3. Once a module is loaded, exit this page, but keep the whole schmema as small icon on the main page (highlighting the module hat has been loaded as guide), so it works as link to intro page.




### B. GRAPH REPRESENTATION BY MODULES: Basic Representation & Interactions (test/user/interaction/graph)
Finish representation and user interaction aspects.

1. **Use graphlib/algos** (sources, neighbors, tarjan...) on a interactive way instead of the alert boxes/console.log with textual info. 
    - **Selection test**: selecting and **graphically highlighting** them when clicking on a **specific vertex**, etc.  --> *DONE*
    - If Test the **filtering dagre-d3** command `digraph.filterNodes(f)` to make a copy of the diagraph that only includes the nodes based on a filter function. 
    - Implement this coding with a **contextual menu** or something similar to choose between the different options. [Relevant example](http://cs.brown.edu/people/jcmace/d3/graph.html?id=small.json) and [here](http://bl.ocks.org/clemens-tolboom/7229863)

3. **Graphical representation** of **ARITY possibilities** -> many/many, many/one, etc with a legend. Some useful info [here](http://www.graphviz.org/doc/info/attrs.html#d:constraint).
    - Test: Select the edges by classes/attributes and modify their style, for example its color.
    - Select and modify the svg edge path elements to represent the different possibilities. 
        - a. Playing with the line-tension/multiplying elements at the beginning/end of the edge.
        - b. Edge tapering possibilities.

4. **Dependencies** between modules to be represented graphically collapsing the modules connected, highlighting the vertex connected by them.  
    - Research how to collpase communities with d3 and code it. Relevant example: [bundle nodes](http://bl.ocks.org/idibidiart/3210979)
    - On click expand its community (could be the connected components for example, instead of the whole module)

5. Potential **path drawing** on the network when clicking on consecutive vertex, for pre-defining queries.
    -    - Display a text element as **label** of each node showing its **id and properties**.
    - Display the relevant info (id and properties) of each node/vertex selected useful for further queries.

6. Append relevant info published about each vertex and edge.
    - Find and select this info
    - Code it by linking it as on the Intro page.



### C. LOCAL VIEW VISUALIZATION
2 possibilities to be explored.

- ***Option1:*** a simple succesors/predecessors view (1 level), to see backwards/afterwards connections of a certain vertex. In parallel with the graph navigation. 
    + Code it using `digraph.successors(u)` and `digraph.predecessors(u)` graphlib/diagraph features, based on an 1 degree.
    + Path drawing in parallel with the Graph representation.

- ***Option2:*** a bundle/chord diagram or similar.
    + Explore what kind of layout could work beteter. Relevant info: [example](http://bl.ocks.org/gka/5145845), [force-layout/bundle](http://stackoverflow.com/questions/22568764/hierarchical-edge-bundling-from-force-layout-in-d3), [search text-bundle](http://stackoverflow.com/questions/22873374/search-functionality-for-d3-bundle-layout)

On both cases, an **RouteMap/histiogram** to accompaign the navigation and go steps backwards if needed.
    - Connect the diagram with a simple tree layout [d3.layout.tree()](https://github.com/mbostock/d3/wiki/Tree-Layout) for showing the route as far as the user navigates on the graph. 
    - When clicking on a vertex, pushing a node on the tree layout, and so on, giving its basic hierarchy structure (root, parent/child...). 





### (+) OPTIONAL IMPLEMENTATIONS

1. Add a **Search text box** to browse the network on this way and searching for a specific element/family.
2. **Automatized the queries** on basic level, by defining a function that takes the indexes and parse them as they are needed on the Bio4j model.
2. Express somehow the **quantity of data** will be received with an specific request on both vertex/edges, like an order or magnitude.
4. Intangible properties ---> if a relation exists, then that means many other will be, or not... choose a representative example of this.




## Timeline PHASE2

- Week1 (30 June - 4 July)                              [0-B]
- Week2 (7 July - 11 July)                              [B-A]
- Week3 (14 July - 18 July)                             [A]
- Week4 (21 July - 25 July)                             [C]
- Week5 (28 July - 1 August)                            [C]
- Week6 (4 August - 8 August)                           (+)

----

- Week7 (11 August - 15 August) // PENCILS DOWN PERIOD
- Week8 (18 August - 22 August) // FINAL EVALUATION PERIOD
- Week9 (25 August - 29 August) // FINAL RESULTS ANNUNCED

/////////////////////////////////////////////////////////////////////


