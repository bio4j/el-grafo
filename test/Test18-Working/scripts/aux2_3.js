var Force = function(nodes, links) {
    return d3.layout.force()
        .nodes(nodes)
        .links(links)
        .gravity(0)
        .size([introModulesWidthAux2, introModulesHeightAux2])
        .linkDistance(0)
        .linkStrength(0.1)
        .friction(0.9)
        .charge(function(d, i) {
            return d.charge
        })
};

var Nodes = function(num, id, name) {
    return d3.range(num).map(function(d) {
        return {
            id: id,
            x: Math.random() * introModulesWidthAux2,
            y: Math.random() * introModulesHeightAux2,
            charge: -10,
            name: name,
        }
    })
};


var Foci = function(x, y, name) {
    return {
        x: x,
        y: y,
        charge: 0,
        fixed: true,
        name: name
    }
};


var Links = function(nodes, foci) {
    return nodes.map(function(node) {
        return {
            source: node,
            target: foci
        }
    })
};


var groupPath = function(d) {
    return "M" +
        d3.geom.hull(d.values.map(function(i) {
            return [i.x, i.y];
        }))
        .join("L") + "Z";
};






//TO DEFINE THE COLOR PALETTE:
var bio4jColors = ["#0E6580", "#68DCFF", "#1BCAFF", "#587680", "#16A2CC", "#68DCFF", "#0E6580 ", "#1BCAFF", "#587680"];

var color = d3.scale.category10()
    .range(bio4jColors);


/*        fill = function(d){
          if(d) return 'red'
          else return 'blue'
        }, 
*/


var lengths = function(d) {
    graph.nodes[d].vertexTypesLength
};

// console.log(graph.nodes[8].vertexTypesLength);

var nodes0 = d3.range(graph.nodes[0].vertexTypesLength).map(Object);



var nodes0 = Nodes(graph.nodes[0].vertexTypesLength, 0, 'node-0'),
    nodes1 = Nodes(graph.nodes[1].vertexTypesLength, 1, 'node-1'),
    nodes2 = Nodes(graph.nodes[2].vertexTypesLength, 2, 'node-2'),
    nodes3 = Nodes(graph.nodes[3].vertexTypesLength, 3, 'node-3'),
    nodes4 = Nodes(graph.nodes[4].vertexTypesLength, 4, 'node-4'),
    nodes5 = Nodes(graph.nodes[5].vertexTypesLength, 5, 'node-5'),
    nodes6 = Nodes(graph.nodes[6].vertexTypesLength, 6, 'node-6'),


    foci0 = Foci(introModulesWidthAux2 / 2, introModulesHeightAux2 / 2, 'foci-0'),
    foci1 = Foci(introModulesWidthAux2 / 2 + 50, introModulesHeightAux2 / 2, 'foci-1'),
    foci2 = Foci(introModulesWidthAux2 / 2 + 100, introModulesHeightAux2 / 2, 'foci-2'),
    foci3 = Foci(introModulesWidthAux2 / 2 + 150, introModulesHeightAux2 / 2, 'foci-3'),
    foci4 = Foci(introModulesWidthAux2 / 2 + 200, introModulesHeightAux2 / 2, 'foci-4'),
    foci5 = Foci(introModulesWidthAux2 / 2 + 200, introModulesHeightAux2 / 2, 'foci-5'),
    foci6 = Foci(introModulesWidthAux2 / 2 + 200, introModulesHeightAux2 / 2, 'foci-6'),

    links0 = Links(nodes0, foci0),
    links1 = Links(nodes1, foci1),
    links2 = Links(nodes2, foci2),
    links3 = Links(nodes3, foci3),
    links4 = Links(nodes4, foci4),
    links5 = Links(nodes5, foci5),
    links6 = Links(nodes6, foci6)


all = nodes0.concat(nodes1).concat(nodes2).concat(nodes3).concat(nodes4).concat(nodes5).concat([foci0, foci1, foci2, foci3, foci4, foci5, foci6])
force = Force(all, links0.concat(links1).concat(links2).concat(links3).concat(links4).concat(links5).concat(link6))

force.on('tick', function() {
    svgModulesAux2.selectAll('circle')
        .attr('cx', function(d) {
            return d.x
        })
        .attr('cy', function(d) {
            return d.y
        })
})
svgModulesAux2.selectAll('circle')
    .data(all)
    .enter().append('circle')
    .attr({
        cx: function(d) {
            return d.x
        },
        cy: function(d) {
            return d.y
        },
        r: 2,
        'class': function(d) {
            return d.name
        }
    })
    .style("fill", function(d) {
        return color(d.id)
    })


/*        .style({
          fill: function(d){ return fill(d.id) }
          , stroke: 'while'
          , 'stroke-width': 1
        })*/

force.start()

// d3.select('.foci-1').drag()

/*      d3.select('.foci-2')
        .transition()
        .ease('cubic-in-out')
        .duration(2000)
        .tween('dataTween', function(d){
          var ix = d3.interpolate(d.x, w / 2)
          var iy = d3.interpolate(d.y, h / 2)
          return function(t){
            d.x = d.px = ix(t)
            d.y = d.py = iy(t)
          }
        })*/