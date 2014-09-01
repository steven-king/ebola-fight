// load top level data for homepage
var dataObj = new Array;
var deaths = new Array;
var cases = new Array;
var contacts = new Array;
var HCWDeaths = new Array;
var HCWCases = new Array;
var labs = new Array;
var treatments = new Array;


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadData(){
    $.ajax({
      type:"GET",
      url:"data/data_all.json",
      dataType:"text",
      success: parseData
    });
  }//end load(xml)

      
function parseData(data){
    console.log("parseData")
    dataObj = $.parseJSON(data);
    var theLastItem = dataObj.length - 1;
    
       
   
    //death box top left
    $("#total-deaths").text(numberWithCommas(dataObj[theLastItem]["1. Total deaths in confirmed, probable and suspected cases"]));
    
    
    
 
    var theDifference = 231;
    var percentChange = 9;
    $("#death-difference").html(theDifference + " new deaths");
    
    //$("#death-difference").html("Up " + theDifference + " this week <br/>(" + percentChange + "% weekly increase)");
    
    /*
    var thisWeek = dataObj[0]["Deaths This Week"];
    var lastWeek = dataObj[0]["Deaths Last Week"];
    if (thisWeek >= lastWeek) {
        //increase
        theDifference = thisWeek - lastWeek;
        console.log("theDifference = " + theDifference);
        $("#death-difference").html("Up " + theDifference + " this week");
    }
    if ( thisWeek <= lastWeek) {
        //decrease
        theDifference = lastWeek - thisWeek;
        $("#death-difference").html("Down " + theDifference + " this week");
    }
    if ( thisWeek == lastWeek) {
        //same
        $("#death-difference").html("no change week to week");
    }
    */
    
    //case box top left
    $("#total-cases").text(numberWithCommas(dataObj[theLastItem]["1. Total cases"]));
    var theDifference = 460;
    var percentChange = 55;

    $("#case-difference").html(theDifference + " new cases");
    
    /*
    var thisWeek = dataObj[1]["Cases This Week"];
    
    if (thisWeek >= lastWeek) {
        //increase
        theDifference = thisWeek - lastWeek;
        console.log("theDifference = " + theDifference);
        $("#case-difference").html("Up " + theDifference + " this week");
    }
    if ( thisWeek <= lastWeek) {
        //decrease
        theDifference = lastWeek - thisWeek;
        $("#case-difference").html("Less" + theDifference + " this week");
    }
    if ( thisWeek == lastWeek) {
        //same
        $("#case-difference").html("no change<br/> week to week");
    }
    */
    
    //hcw deaths box top left
    $("#hcw-deaths").text(numberWithCommas(dataObj[theLastItem]["HealthCare worker total deaths"]));
    var theDifference = 8;
    var percentChange = 25;

    $("#hcw-death-details").html(theDifference + " new deaths");
    
    /*
    var theDifference;
    var thisWeek = dataObj[3]["HealthCare Worker Deaths This Week"];
    var lastWeek = dataObj[3]["HealthCare Worker Deaths Last Week"];
    if (thisWeek >= lastWeek) {
        //increase
        theDifference = thisWeek - lastWeek;
        console.log("theDifference = " + theDifference);
        $("#hcw-death-details").html("Up " + theDifference + " this week");
    }
    if ( thisWeek <= lastWeek) {
        //decrease
        theDifference = lastWeek - thisWeek;
        $("#hcw-death-details").html("Down" + theDifference + " this week");
    }
    if ( thisWeek == lastWeek) {
        //same
        $("#hcw-death-details").html("no change <br/>week to week");
    }
    */
    //hcw deaths box top left
    $("#hcw-cases").text(numberWithCommas(dataObj[theLastItem]["HealthCare worker total cases"]));
    
    var theDifference = 20;
    var percentChange = 27;

    $("#hcw-cases-details").html(theDifference + " new cases");
    
    /*
    var theDifference;
    var thisWeek = dataObj[4]["HealthCare Worker Cases This Week"];
    var lastWeek = dataObj[4]["HealthCare Worker Cases Last Week"];
    if (thisWeek >= lastWeek) {
        //increase
        theDifference = thisWeek - lastWeek;
        console.log("theDifference = " + theDifference);
        $("#hcw-cases-details").html("Up " + theDifference + " this week");
    }
    if ( thisWeek <= lastWeek) {
        //decrease
        theDifference = lastWeek - thisWeek;
        $("#hcw-cases-details").html("Down " + theDifference + " this week");
    }
    if ( thisWeek == lastWeek) {
        //same
        $("#hcw-cases-details").html("no change<br/>week to week");
    }
    */
    
    
    
    //labs box top left
    //$("#total-deaths").text(dataObj[0]["Total Deaths"]);
    
    
    

}



