<?php

$dataUrls = array();
$outputFileName = array();
//config of urls to gather data
array_push($dataUrls, "http://django-ebola.herokuapp.com/location/national/?format=weekly_json");
//array_push($dataUrls, "http://django-ebola.herokuapp.com/location/national/?format=daily_json");
//array_push($dataUrls, "http://django-ebola.herokuapp.com/location/national/?format=weekly_json");
array_push($outputFileName, "main_weekly.json");
//array_push($outputFileName, "main_daily.json");
//array_push($outputFileName, "regional.json");






function curl_download($Url, $fileName){
 
    // is cURL installed yet?
    if (!function_exists('curl_init')){
        die('Sorry cURL is not installed!');
    }
 
    // OK cool - then let's create a new cURL resource handle
    $ch = curl_init();
 
    // Now set some options (most are optional)
 
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, $Url);
 
    // Set a referer
    curl_setopt($ch, CURLOPT_REFERER, "http://django-ebola.herokuapp.com/location/national/?format=weekly_json");
 
    // User agent
    curl_setopt($ch, CURLOPT_USERAGENT, "MozillaXYZ/1.0");
 
    // Include header in result? (0 = yes, 1 = no)
    curl_setopt($ch, CURLOPT_HEADER, 0);
 
    // Should cURL return or print out the data? (true = return, false = print)
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
    // Timeout in seconds
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
 
    // Download the given URL, and return output
    $output = curl_exec($ch);
 
    // Close the cURL resource, and free system resources
    curl_close($ch);
 
    //write to file
    file_put_contents($fileName, $output);
 
    //return $output;
}


for ($i=0; $i<=0; $i++) {
  curl_download($dataUrls[i], $outputFileName[i]);

} 


?>