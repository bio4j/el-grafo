if (arityInfo == "one-many") {
    var oneMany = d3.select(this);
    return oneMany.style("stroke", "brown")
        .each(function(d, i) {
            allPath = d3.select(this);
            allPathData = allPath.selectAll("path").attr("d");
            console.log(allPathData);

            //TO DO: A function that generate those modified paths!!
            var SubontolyPath = "M101,115.2109375L110.86249999999998,110.82978515624998C120.725,106.4486328125,140.45,97.68632812499999,158.11666666666667,93.19283854166666C175.78333333333333,88.69934895833333,191.39166666666665,88.47467447916665,199.19583333333333,88.36233723958333L207,88.25";

            var patron = /[^\d^.]/;

            // Divide la cadena en piezas separadas por el patrón anterior y
            // almacena las piezas en un arreglo llamado PathList
            var PathList = SubontolyPath.split(patron);
            var i, longitud;
            for (i = 0, longitud = PathList.length; i < longitud; i++) {
                if (i % 2 != 0)
                    console.log(PathList[i]);

            }

            //Case MANY-ONE
            //On this case, ADD the "offset" value to the y component (the second element of each point defined by x,y). Each value is separated either by a "," or by a letter. That should affect to the first "n" parameters (n being a controlable parameter). On the following case, the parameters were:

            var offset = 3;
            var n = 2;


            var SubontolyPathDown = "M101,118.2109375L110.86249999999998,113.82978515624998C120.725,109.4486328125,140.45,97.68632812499999,158.11666666666667,93.19283854166666C175.78333333333333,88.69934895833333,191.39166666666665,88.47467447916665,199.19583333333333,88.36233723958333L207,88.25";


            //Case OONE-MANY
            //Exactly the same case as MANY-ONE, but just affecting the last n components (always the y:2nd component)

            var SubontolyPathDown = "M101,115.2109375L110.86249999999998,110.82978515624998C120.725,106.4486328125,140.45,97.68632812499999,158.11666666666667,93.19283854166666C175.78333333333333,88.69934895833333,191.39166666666665,88.47467447916665,199.19583333333333,91.36233723958333L207,91.25";


            //Case MANY-MANY
            //The same as the other cases, but affecting ALL Y values (no "n" parameter)

        })
}