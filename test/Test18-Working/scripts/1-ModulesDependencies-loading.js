    // -------> 1_MODULES AND DEPENDENCIES buttons/loading

    //Filtering between modules and dependencies. For example with circles and rects
    var shapesToFilter = svgModules.select("g").selectAll("circle")
        .data(newjson0)
        .enter();

    //svg for MODULES
    shapesToFilter.append("circle")
        .filter(function(d) {
            return d.Dependencies < 1;
        })
        .attr("id", function(d) {
            return d.id;
        })
        .attr("cx", function(d, i) {
            return i * 75
        })
        .attr("cy", 30)
        .attr("r", function(d) {
            return (1 + d.Nvertex + d.Nedges) * 1.5
        })
        .attr("fill", function(d, i) {
            return color(i);
        });
    // .attr("fill", "teal");

    //svg for DEPENDENCIES
    shapesToFilter.append("rect")
        .filter(function(d) {
            return d.Dependencies >= 1;
        })
        .attr("x", function(d, i) {
            return 20 + i * 150
        })
        .attr("y", 30 + 140)
        .attr("width", 20)
        .attr("height", 1.5);


    //Filtering between modules and dependencies
    textToFilter = svgModules.select("g").selectAll("text")
        .data(newjson0)
        .enter();
    //texts for MODULES
    textToFilter.append("text")
        .filter(function(d) {
            return d.Dependencies < 1;
        })
        .text(function(d) {
            return d.id;
        })
        .attr("x", function(d, i) {
            return i * 75
        })
        .attr("text-anchor", "middle")
        .attr("y", 65);

    //texts for DEPENDENCIES
    textToFilter.append("text")
        .filter(function(d) {
            return d.Dependencies >= 1;
        })
        .text(function(d) {
            return d.id;
        })
        .attr("x", function(d, i) {
            return 20 + i * 150 + 10;
        })
        .attr("text-anchor", "middle")
        .attr("y", 55 + 140);


    // -------> 2_URL loading

    //Function for each module url:
    var urlFunction = function(d) {
        return ("data/rev_" + d + ".json")
    };


    //Onclick on each Module, highlight it, define the url path and run the dagre-d3 lib
    svgModules.select("g").selectAll("circle")
        .on("click", function(d) {
            svgModules.select("g").selectAll("circle")
                .style("stroke-width", 0);

            d3.select(this)
                .style("stroke", d3.select(this).attr("fill"))
                .style("stroke-width", 10)
                .style("stroke-opacity", .3);
            console.log(d.id);
            url = urlFunction(d.id);
            console.log(url);
            return draw();

        });