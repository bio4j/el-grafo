#GSoC 2014  el-grafo
d3-based Bio4j data model visualization

Student: Carmen Torrecillas
Organization: Bio4j
Mentors: @eparejatobes, @laughedelic, @evdokim


##PROJECT DESCRIPTION
GSoC 2014 el-grafo project is the first development of an interactive web-based tool that allows users to intuitively explore the abstract domain model of the Bio4j open source bioinformatics data platform, which integrates the data available in the most representative open data sources around protein information: in [UniProtKB](http://www.uniprot.org/help/uniprotkb) (SwissProt + Trembl), [Gene Ontology](http://geneontology.org) (GO), [UniRef](http://www.uniprot.org/help/uniref) (50, 90, 100), [RefSeq](http://www.ncbi.nlm.nih.gov/refseq), [NCBI taxonomy](http://www.ncbi.nlm.nih.gov/taxonomy) and [Expasy Enzyme](http://enzyme.expasy.org). 

el-grafo project details the connection between all vertex and edge components which shape the logic structure of its network module by module, as well as provides specific typing information for retrieving useful data. Its purpose is to help users gain a better understanding of the Bio4j domain model structure lowering their entry barrier to the database platform in order to utilise and query it more efficiently.



##TECHNOLOGY
Technologically speaking, d3.js and dagre /dagre-d3 open-source JavaScript libraries compose the main core of the project.

The project consists on a Html page accompanied by the use of several different scripts, data files from the model database, and an external css-type file. The directory layout is presented as follows:

- 20140818_el-grafo.html
    - scripts
        + lib
        + alg
    - data
    - css

Regarding the external libraries it uses, the latest browser-ready scripts can be found in their respective github repositories: [d3](https://github.com/mbostock/d3), [dagre](https://github.com/cpettitt/dagre) and [dagre-d3](https://github.com/cpettitt/dagre).

Apart from them, the scripts folder contains several algorithms from [graphlib.js](https://github.com/cpettitt/graphlib) and [contextmenu](http://www.trendskitchens.co.nz/jquery/contextmenu/) jQuery plugin.

All scripts could be loaded from the HTML pages, but as the  the API may change over the time, a copy of the libraries is included in the scripts folder. They are loaded as follows:

`<script src="scripts/lib/dagre-d3.js"></script>`



## ABOUT THE MODEL DATA

A HTTP-service request for exploring the Bio4j domain model has been used to returns updated [graphSON](https://github.com/thinkaurelius/faunus/wiki/GraphSON-Format)/JSON objects of the different modules integrated. More infomation about this feature [here](https://github.com/bio4j/model-service)

Once retrieved, all service data where adapted until they suit the graphlib/dagre expected incomes. Once the graph structure and layout is setted, we have used as input for dagre-d3 in order to perform its visualization using d3 on its base. For the purposes of this project, it was necessary to link all info generated on the layout with the represented outcome graph.

It is important to remark that the data represented on el-grafo visualization tool is related with the Bio4j abstract model, not with the actual data stored on the database, alhtough this could be interested to be somehow represented on the tool in the future, on further develops.



## ABOUT THE NETWORK LAYOUT AND REPRESENTATION

Network structures are usually represented by plotting x, y coordinates as attributes of the nodes, or by applying any "force-based" algorithm, based on repulsive/attractive forces and a canvas gravity. 

A set of tools and libs for graph data manipulation and representation were explored in order to find the most suitable solution for the Bio4j database model visualization.

On first trial, I discovered that the d3.js JavaScript library has its own [Force Layout](https://github.com/mbostock/d3/wiki/Force-Layout) for visualizing networks. It utilizes physical "forces" to arrange the elements and give attributes to the nodes (x and y coordinates, weight..) and links (source and target nodes). Although it is a flexible and interactive way to visualize these networks, it was decided that it was not suitable for this project as it jumbles the layout and the representation. 
Due to the dynamic nature of the d3.js JavaScript library the physics behind it would make it difficult in terms of useability.

Other very interesting open-source JavaScript libraries consulted where [cola.js](http://marvl.infotech.monash.edu/webcola): a constraint-Based Layout in the Browser that works with d3.js, or [joint](https://github.com/DavidDurman/joint) for interactive diagramming.

The final election regarding the layout component of the project was to integrate the graph data lib [dagre.js](https://github.com/cpettitt/dagre) as the most orderly and simple way to layout the network. It has [graphlib](https://github.com/cpettitt/graphlib) library bundle on it to provide data structures for undirected and directed multi-graphs along with algorithms. Our case corresponds with Diagraph as they are directed multigraphs. 

On the rendering side, I decided to use [dagre-d3.js](https://github.com/cpettitt/dagre-d3), the d3-based rendered for dagre.js on the client-side, as 
the main core of the project.



## DESCRIPTION

As explained before, this approach to the Bio4j Database representation consists on a Html page that works initially as introduction page to the project and its purpose and context.

Features:
	- General textual info about the project.
	- Modules and Dependencies schematic representation, as colored areas and lines connecting them. Sizes relative to the number of types (vertexes and edges) on each module. 
	- Selection onClick of the Modules and Dependencies that could be LOADED and explored independently.


Features:
    - Graph representation of how all vertex and edge components are connected between them shaping each module of the network.
    - Graphical representation of ARITY possibilities of the edges: many/many, many/one, one/many, one/one.
    - Graph filtering actions via Contextual Menu, that allow users to perform specific graph actions (filtering by successors, predecessors, neighbors, etc). Some graphlib Digraph functions used: inEdges, outEdges, filterNodes...
    - Specific information of each vertex/edge of the graphs (id and properties).
    - Dependencies collapsing/expanding features to see which particular vertexes are connected between modules, but also to keep on exploring the rest of elements forwards and backwards.



## WHAT'S NEXT
The findings above are a starting point for the el-grafo project as first approach to its complex data structure.

Further development of this guide is necessary for the tool to function for complete use of the program. In my findings the links between modules and dependencies can be examined more closely in order to elaborate the on the uses and functions of the Bio4j model to provide a complete guide for its users.

I plan to take this project further to implement its current functionalities, research and test some new ones regarding the network representation and users interaction, and in general achieve a more elaborate and useful tool. 

