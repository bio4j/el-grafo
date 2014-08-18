
el-grafo
GSoC 2014 project - D3-based Bio4j data model visualization

Student: Carmen Torrecillas
Organization: Bio4j
Mentors: @eparejatobes, @laughedelic, @evdokim

PROJECT DESCRIPTION
el-grafo is the first development of an interactive web-based tool that allows users to intuitively explore the Bio4j domain model, detailing the connection between its vertex and edge components which shape the model, as well as providing specific information for retrieving useful data. / a guide to … 

Its purpose is to help users gain a better understanding of the Bio4j structure in order to utilise the system easier and more efficiently. 




TECHNOLOGY
Technologically speaking, both open-source JavaScript libraries [d3.js] for visualization and dagre/dagre-d3 graph... ...componen.. the main core.

The project consists of two parts: Intro.html and Main.html pages. These are accompanied by the use of several different scripts, data files from the model database, and an external css-type file. The directory layout is presented as follows:

el-grafo-directory
- el-grafo_Intro.html
- el-grafo_Main.html
- scripts
    + lib
    + alg
- data
- css

The scripts folder contains: 
Apart from the main d3 and dagre/dagre-d3 libraries aforementioned, the scripts folder contains algorithms from graphlib and a contextmenu jQuery plugin (http://www.trendskitchens.co.nz/jquery/contextmenu/)

ContextMenu is a lightweight jQuery plugin that lets you selectively override the browser's right-click menu by a custom-designed one applied by the user.


INSTRUCTIONS
....
The latest browser-ready scripts can be found in their github repositories:
d3
dagre
dagre-d3

All scripts are loaded from the HTML pages with
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://cpettitt.github.io/project/dagre-d3/latest/dagre-d3.min.js"></script>
As the API may change over the time, a copy of the libraries are included in the scripts folder.

------------------------------------------------------



ABOUT------

>>> ABOUT THE MODEL DATA.

...........
HTTP-service for exploring the Bio4j domain model

More infomation about this feature [here](https://github.com/bio4j/model-service)
 returning JSON objects of the different modules.

Retrieve model data in json by a service
Adaptthe service data (as needed) to graphlib
Use the graphlib graph as the input for dagre-d3
Link between the layout and the represented graph

graphson
https://github.com/thinkaurelius/faunus/wiki/GraphSON-Format



>>> ABOUT THE NETWORK LAYOUT AND REPRESENTATION. 

Network structures are usually represented by plotting x, y coordinates as attributes of the nodes, or by applying any "force-based" algorithm, based on repulsive/attractive ?*** negative/positive(?) forces and a canvas gravity. (?)

A set of tools and libs for graph data manipulation and representation were explored in order to find the most suitable solution for the Bio4j database model visualization.

On first trial, I discovered that the d3.js JavaScript library has its own [Force Layout](https://github.com/mbostock/d3/wiki/Force-Layout) for visualizing networks. It utilizes physical "forces" to arrange the elements and give attributes to the nodes (x and y coordinates, weight..) and links (source and target nodes). Although it is a flexible and interactive way to visualize these networks, it was decided that it was not suitable for this project as it jumbles the layout and the representation. 
Due to the dynamic nature of the d3.js JavaScript library the physics behind it would make it difficult in terms of useability.

Other very interesting open-source JavaScript libraries consulted where [cola.js](http://marvl.infotech.monash.edu/webcola): a constraint-Based Layout in the Browser that works with d3.js, or [joint](https://github.com/DavidDurman/joint) for interactive diagramming.

The final election regarding the layout component of the project was to integrate the graph data lib [dagre.js](https://github.com/cpettitt/dagre) as the most orderly and simple way to layout the network. It has [graphlib](https://github.com/cpettitt/graphlib) bundle on it to provide data structures for undirected and directed multi-graphs along with algorithms that can be used jointly. ?? 

In our case, Digraph represents a directed multigraph

On the rendering side, I used [dagre-d3.js](https://github.com/cpettitt/dagre-d3), the d3-based rendered for dagre.js on the client-side. 









------------------------------------------------------



DESCRIPTION----------


INTRO PAGE
First approach to the Bio4j Database representation and main aspects.

Elements included:
	- General info about the project: the Bio4j Database, the Visualization project, description, application, credits...
	- Modules Schematic representation. Their size is relative to the number of types (vertexes and edges) of each module. ?? 
	- Textual description of each Module on hover.

	- Selection of the Modules and Dependencies between them that could be explored by click.


Visual representation into the Modules Graphical scheme.
Textual description of each dependencies.
"Access to the Network" button -> The network will be loaded with the selected Modules (the selection could be changed afterwards).



About MODULES and DEPENDENCIES
The Bio4j database is modular and customizable, allowing users to import only the data that they are interested in. 

It is important to mention that all desired data sources to be included in the database must be selected coherently. 

There are some modules that require others modules to be present in the database before they can be imported.  

For this I created a simple scheme showing the dependencies between the current modules:

About DEPENDENCIES
For the interest of the user, it seems important that the dependency is not only one direction A->B (A depends on B), but also the inverse is ??posible (B is connected with all those other things).?? 


------------------------------------------------------

MAIN PAGE
Basic network exploration of 



1. Graph filtering actions via Contextual Menu.

 Will allow users to perform specific graph actions (filtering by successors, predecessors, neighbors, etc) 

Some graphlib Digraph functions used: inEdges, outEdges, filterNodes...
graphlib alg modules: 


*Note1
To be implemented with t
Filtering test: test digraph.filterNodes(f) to make a copy of the digraph that only includes the vertex/edges based on a filter function. This will allow a more interactive exploration of the graph.



2. Graphical representation of ARITY possibilities:
many/many, many/one


3. Each vertex/edge specific information on hovering (id and properties)
Display a text element as label of each node showing its id and properties.

--------------




------------------------------------------------------


WHAT'S NEXT
The findings above are a starting point for the el-grafo project which demonstrates connections between the Bio4j model components and specific information to utilise the relative information it contains. Further development of this guide is necessary for the tool to function for complete use of the program. In my findings the links between data functions and dependencies can be examined more closely in order to elaborate the on the uses and functions of the Bio4j model to provide a complete guide for its users.

I plan to take this project further to research and test the linkages of vertexes and edges and develop a more explanatory guide//elaborate tool to be applied simultaneously with usage of the Bio4j domain. 

