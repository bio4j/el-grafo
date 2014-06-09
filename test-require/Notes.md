http://requirejs.org/docs/start.html


tree
www/
index.html
js/
app/
sub.js
lib/
jquery.js
canvas.js
app.js


<!-- main.html has script tags for require.js and loads main.js via a require call, like so: -->
<!DOCTYPE html>
<html>
    <head>
        <title>My App</title>
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <script data-main="scripts/main" src="scripts/require.js"></script>
    </head>
    <body>
        <h1>My App</h1>
    </body>
</html>


<!-- main.js loads one.js, two.js and three.js via a require call: -->
require(["one", "two", "three"], function (one, two, three) {
});


<!-- main.css has content like the following: -->
@import url("common.css");

.app {
    background: transparent url(../../img/app.png);
}



OPTIMIZING A WHOLE PROJECT
http://requirejs.org/docs/optimization.html#wholeproject

({
    appDir: "../",
    baseUrl: "scripts",
    dir: "../../appdirectory-build",
    modules: [
        {
            name: "main"
        }
    ]
})


RequireJS takes a different approach to script loading than traditional `<script>` tags. It encourages using **modules IDs** instead of URLs for sript tags.
