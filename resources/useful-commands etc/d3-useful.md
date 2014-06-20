

// IF...ELSE

Dos formas de hacerlo:
... function {
    if (...) { return ..... }
    else { return ......}
}
Equivalente a:

	
	Ej:
	.style("fill", function(d) { 
    	    if (d._children) { return NodeAct; }
        	else { return NodePas; }
      	});

	Es equivalente a:
	.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })

variablename=(condition)?value1:value2
voteable = (age < 18) ? "Too young":"Old enough";


es bastante rápido!
svg.selectAll(".place-label")
    .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
    .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

// POINTERS

.node {
  cursor: pointer;    
}


// IGNORAR LABELS

Ignora los labels en mouse hover
svg text {
        pointer-events: none;
}

//SVG - CSS
SVG’s default style is a black fill with no stroke.
    fill
          A color value. Just as with CSS, colors can be specified as named colors, hex values, or RGB or RGBA values.
    stroke
          A color value.
    stroke-width
          A numeric measurement (typically in pixels).
    opacity
          A numeric value between 0.0 (completely transparent) and 1.0 (completely opaque).
CSS approach has benefits: faster, easier, etc

But! 
Using CSS to apply SVG styles, however, can be disconcerting for some. fill, stroke, and stroke-width, after all, are not CSS properties. (The nearest CSS equivalents are background-color and border.) It’s just that we are using CSS selectors to apply SVG-specific properties. If it helps you remember which rules in your stylesheet are SVG-specific, consider including svg in those selectors:   

      svg .pumpkin {
          /* ... */
       }


// CONVERTIR A NUMERIC VALUE 
Siempre con "+"

    d.close = +d.close;


// ZOOM
Al crear el svg inicial en body, simplemente añado esto:

    .append("g")
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
    .append("g");

...y al final del documento, definir la función zoom:

function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


// TOOLTIPS

	link.append("title")   
        .text(function(d) {
    		return d.source.name + " → " + d.target.name +
               "\n" + "prueba carmen" +
               "\n" + format(d.value); });





// ENTER, UPDATE, EXTI

DOM elements < data elements -> ENTER       --> se suele asociar con append para crear elements

Cndo no tenemos NADA (empty selection) para crear todo en relación a datos. 
Una cadena muy recurrente es: selectAll + data + enter + append
Pero también cndo tenemos algo ya y al actualizar (UPDATE) datos necesitamos crear + elementos.


DOM elements > data elements -> EXIT      --> se suele asociar con remove xa eliminar elements
Cndo tenemos mas elementos que datos, the extra elements se almacenan en exit selection

DOM elements = data elements -> UPDATE

// GRAPHS SHAPE

En general INCREASE charge strength & REDUCE linkDistance to get better results -> emphasis on global structure rather than local connections


// COLORES DARKER
d3.rgb(color(........)).darker(2);


// SELECTIONS & FILTERS
Filters the selection, returning a new selection that contains only the elements for which the specified selector is true. The selector may be specified either as a function or as a selector string, such as ".foo". As with other operators, the function is passed the current datum d and index i, with the this context as the current DOM element. Like the built-in array filter method, the returned selection does not preserve the index of the original selection; it returns a copy with elements removed. If you want to preserve the index, use select instead. For example, to select every odd element (relative to the zero-based index):
`var odds = selection.select(function(d, i) { return i & 1 ? this : null; });`

Equivalently, using a filter function:
`var odds = selection.filter(function(d, i) { return i & 1; });`



// .js COMPARISONS
==      equal to  
!=      not equal

&&      and         (x < 10 && y > 1) is true
||      or          (x == 5 || y == 5) is false
!       not         !(x == y) is true

Modulo:
`10 % 2 === 0` evaluates to true
`7 % 3 === 0` evaluates to false because there is 1 left over.



FILTRAR
BTW, you can also filter the selection set by class name if you need more control:

```
var textNode = d3.select("#barchart").selectAll("svg text").filter(function(d, i){ return this.classList.contains(countryname); });
```
