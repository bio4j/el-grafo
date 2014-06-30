**MESS with absolute positions of vertex on the graph, as they are into groups that are being transformed, etc.**

Some relevant info here:

- http://jsfiddle.net/WFwTg/1/

SOLUTION:
d3.select(this)[0][0].getCTM();

d3.select(this)[0][0].getCTM().e;       // for absolute x position
d3.select(this)[0][0].getCTM().f;       // for absolute y position