
LOCAL INFO: REPRESENTATION+INTERACTIONS:
    - Test classes and atributes of vertex/edges
    - Test graphlib elements (sources, neighbours, tarjan...) on a different way than with alert boxes. For example highligting, etc.
    - Graphical representation: ARITY-> many/many, many/one. With a leyend.
    - Dependencies: a simple function to say if there are dependencies or not (empty).
    - 

GENERAL
    - structure with require.js



ROUTE MAP VIEW 
for displaying properties of vertex/nodes & route
	- create a new svg canvas for a RouteMap
	- onClick on a vertex, duplicate the node.
	- transition its position to the RouteMap
	- display its id and its properties
	- on the graph, highlight its neighbours after clicking it, by giving transparency to the rest.
	
    - contextual menu on the RouteMap to allows removing steps, etc

GLOBAL VIEW
- dependencies!!



INTRO PAGE
all texts/descriptions about the platform -> linked from Bio4j website
    - find the relevant info
    - see how to code this.


OPTIONAL IMPLEMENTATIONS:
1.  **Automatized the queries** on basic level, by defining a function that takes the indexes and parse them as they are needed on the Bio4j model.
2. Express somehow the **quantity of data** will be received with an specific request on both vertex/edges, like an order or magnitude.
3. Add a **Search text box** to browse the network on this way.
4. Intangible properties ---> if a relation exists, then that means many other will be, or not... choose a representative example of this





+info:

- **ROUTE MAP VIEW** 
  - Protein node as **root** of the diagram.
  - From root will grow a small **tree path**. Each **branch** will corresponds to a different **Module**. 
  - **Contextual Menu**: Allows removing steps, go backwards.
  - Important info accompanying the diagram:
     -  **Indexes/typing information** listed for the route covered *(up of the each step on the diagram)*
     -  **Properties** of nodes & edges *(down each node and each edge of the digram)*
     -  **"Copy route"** button of the Indexes list for a further easy copy/paste operation on the Bio4j platform *(lateral position)*
  - (Optional): When hovering a node/link, it will be highlighted on both the Full Network and the Zoomed Network

 *d3-based possible components to be used:*    
    - [d3.layout.tree()](https://github.com/mbostock/d3/wiki/Tree-Layout) to give it the basic hierarchy structure (root, parent...)
    - [selection.data](https://github.com/mbostock/d3/wiki/Selections#data): `enter, update, exit...` with [transitions](https://github.com/mbostock/d3/wiki/Transitions) to update the diagram as the user network selections changes. 
    - [js events](http://www.w3schools.com/js/js_htmldom_events.asp): `onClick, onMouseOver, on MouseOut...` to allow interacting with the diagram



REFERENCIES
http://bl.ocks.org/rkirsling/5001347

TO FIX:
1. Edge labels 