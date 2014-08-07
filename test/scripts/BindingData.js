function bindingData() {

    //Binding Nodes&Edges DATA to the graph by iterating over the generated svg adding ATTRIBUTES:
    //Maybe I need data-attribute instead: http://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function

    d3.selectAll(".edgePath.enter")
        .data(newEdgesDep)
        .attr("u", function(d) {
            return d.u
        })
        .attr("v", function(d) {
            return d.v
        })
        .attr("inArity", function(d) {
            return d.value.inArity
        })
        .attr("outArity", function(d) {
            return d.value.outArity
        })
        .attr("label", function(d) {
            return d.value.label
        })
        .attr("module", function(d) {
            return d.value.module
        })
        .attr("propertyTypes", function(d) {
            return d.value.propertyTypes
        });


    d3.selectAll(".node.enter")
        .data(newVertex)
        .attr("module", function(d) {
            return d.value.module
        })
        .attr("label", function(d) {
            return d.value.label
        })
        .attr("propertyTypes", function(d) {
            return d.value.propertyTypes
        })
        .attr("dependency", function(d) {
            return d.value.dependency
        })
        .selectAll("rect").attr("class", "mainNodeRect")
    // .call(d3.behavior.drag())
    ;


};