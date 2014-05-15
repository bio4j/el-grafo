# Tentative format for the Bio4j data model in JSON

Bio4j data model is a set of modules, every of which is a [`TypedGraph`](https://github.com/ohnosequences/typed-graphs/blob/master/docs/src/main/java/com/ohnosequences/typedGraphs/TypedGraph.java.md), so it has:
  + `pkg` - package in which this graph is defined
  + `dependencies` - a set of other `TypedGraph`s
  + `nodeTypes` - a set of `NodeType`s
  + `relationshipTypes` - a set of `RelationshipType`s
  + `propertyTypes` - a set of `PropertyType`s
  + _indexes?_ (maybe later)

For relationship types we want to store the following information (defaults are **bold**):
  + `in-arity`: one/**many**  
    _`node.in(label)` gives you an `Option` or a `List` of results_
  + `out-arity`: one/**many**  
    _`node.out(label)` gives you an `Option` or a `List` of results_
  + `always defined`: yes/**no**  
    _whether _every_ source node has to have an edge with this label_
  + `locally unique`: yes/**no**  
    _any two particular nodes cannot have more than one edge with this label_
  + `indexed by`: `<some property>`  
    _see also [titan manual](https://github.com/thinkaurelius/titan/wiki/Type-Definition-Overview#sortkeytitantype-and-signaturetitantype)_
  + `sorted by`: `<some property>`  
    _arguable, doesn't make sense without index, maybe should be somewhere else_

For property types:
  + data type
  + _maybe_ "uniqueness" property, stating that no two edges can have the same value of this property ([like in titan](https://github.com/thinkaurelius/titan/wiki/Type-Definition-Overview#unique))

`TODO`: what about node types?

`TODO`: formal json schema definition? or cooresonding Scala types + json codecs?
