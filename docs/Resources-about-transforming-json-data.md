##Transforming json data

###LINKS:
- [about json data](http://www.json.org/js.html)
- [a good example](http://stackoverflow.com/questions/9016546/transform-json-object-to-another-format-it)
- [about json-encode](http://php.net/manual/en/function.json-encode.php)
-[about json-stringify](https://developer.mozilla.org/es/docs/JavaScript/Referencia/Objetos_globales/JSON/stringify)


###NOTES:
- A. You can convert a JSON string to a JavaScript object using `JSON.parse(yourJsonString)`, and can convert a JavaScript object to a JSON string using `JSON.stringify(yourJavaScriptObject)`.

- B. Convert to json Wwith `eval()`
```
var input = '({nodes:[{id:"A",value:{label:"A"}},{id:"B",value:{label:"B"}}],edges:[{u:"A",v:"B",value:{label:"a to b",weight:"heavy"}},{u:"B",v:"A",value:{label:"b to a",weight:"light"}}]})';

//turn it into JSON
var gJSON = eval(input);
```