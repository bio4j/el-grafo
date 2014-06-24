LOCAL INFO - USER INTERACTIONS



1. Display properties of vertex/nodes & route
	- create a new svg canvas for a RouteMap
	- onClick on a vertex, duplicate the node.
	- transition its position to the RouteMap
	- display its id and its properties
	- on the graph, highlight its neighbours after clicking it, by giving transparency to the rest.
	- contextual menu features to allows removing steps, etc.

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



TO FIX:
1. Edge labels 