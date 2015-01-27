You can load them in series:
  d3.csv("file1.csv", function(rows1) {
    d3.csv("file2.csv", function(rows2) {
      … do something with rows1 and rows2 here …
    });
  });

Or in parallel:

  var rows1, rows2, remaining = 2;

  d3.csv("file1.csv", function(csv) {
    rows1 = csv;
    if (!--remaining) doSomething();
  });

  d3.csv("file2.csv", function(csv) {
    rows2 = csv;
    if (!--remaining) doSomething();
  });

  function doSomething() {
    … do something with rows1 and rows2 here …
  }

Or using queue.js [1]:

  queue()
      .defer(csv, "file1.csv")
      .defer(csv, "file2.csv")
      .await(function(error, results) { console.log(results); });

  function csv(path, callback) {
    d3.csv(path, function(csv) {
      csv ? callback(null, csv) : callback("error", null);
    });
  }

In the next major release, I'd like to change d3.xhr and friends to
use the Node-standard callback(error, result), which would let you
eliminate the adapter:

  queue()
      .defer(d3.csv, "file1.csv")
      .defer(d3.csv, "file2.csv")
      .await(function(error, results) { console.log(results); });

Mike

[1] https://github.com/mbostock/queue