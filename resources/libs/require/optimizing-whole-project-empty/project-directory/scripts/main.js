/*
Inside of main.js, you can use require() to load any other scripts you need to run. 
This ensures a single entry point, since the data-main script you specify is loaded asynchronously.
*/
require(["helper/util"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});

/*That will load the helper/util.js script. 
To get full advantage of RequireJS, see the API docs to learn more about defining and using modules.*/