<?php
    $username = "homedbuser"; 
    $password = "homedbuser";   
    $host = "localhost";
    $database="homedb";
    
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);

    $myquery = "
SELECT DISTINCT(`source`) AS name FROM `sankey1`
UNION
SELECT DISTINCT(`target`) AS name FROM `sankey1`
GROUP BY name
";
    $query = mysql_query($myquery);
    
    if ( ! $myquery ) {
        echo mysql_error();
        die;
    }
    
    $nodes = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $nodes[] = mysql_fetch_assoc($query);
    }

    $myquery = "
SELECT `source` AS source, `target`  as target, COUNT(*) as value 
FROM `sankey1`
GROUP BY source, target 
";
    $query = mysql_query($myquery);
    
    if ( ! $myquery ) {
        echo mysql_error();
        die;
    }
    
    $links = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $links[] = mysql_fetch_assoc($query);
    }


echo "{";
echo '"links": ', json_encode($links), "\n";
echo ',"nodes": ', json_encode($nodes), "\n";
echo "}";

     
    mysql_close($server);
?>
