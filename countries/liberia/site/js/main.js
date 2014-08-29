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
      url:"data/main.json",
      dataType:"text",
      success: parseData
    });
  }//end load(xml)

      
function parseData(data){
    console.log("parseData")
    dataObj = $.parseJSON(data);
    
       
   
    //death box top left
    $("#total-deaths").text(numberWithCommas(dataObj[0]["Total Deaths"]));
    var theDifference;
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
    
    
    //case box top left
    $("#total-cases").text(numberWithCommas(dataObj[1]["Total Cases"]));
    var theDifference;
    var thisWeek = dataObj[1]["Cases This Week"];
    var lastWeek = dataObj[1]["Cases Last Week"];
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
    
    //hcw deaths box top left
    $("#hcw-deaths").text(numberWithCommas(dataObj[3]["Total HealthCare Worker Deaths"]));
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
    
    //hcw deaths box top left
    $("#hcw-cases").text(numberWithCommas(dataObj[4]["Total HealthCare Worker Cases"]));
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
    
    
    
    
    //labs box top left
    //$("#total-deaths").text(dataObj[0]["Total Deaths"]);
    
    
    
    var theDifference;
    
    var tlp = dataObj[5]["Total Labs Processed"];
    var lpThisWeek = dataObj[5]["Labs Processed This Week"];
    var lpTlastWeek = dataObj[5]["Labs Processed Last Week"];
    
    var tlc = dataObj[5]["Total Labs Collected"];
    var lcThisWeek = dataObj[5]["Labs Collected This Week"];
    var lcLastWeek = dataObj[5]["Labs Collected Last Week"];
    
    console.log(tlp);
    var labRate = (tlc - tlp) / tlc * 100 +"%" 
    
    $("#lab-rate").text(labRate);
    $("#lab-details").html("Collected: " + tlc + "  <br/>  Tested: " + tlp);
    
    
    

    
    var theDifference;
    
    var totalContacts = dataObj[2]["Total Contacts"];
    var totalCases = dataObj[1]["Total Cases"];

    
    console.log(tlp);
    var exposureRate = (totalContacts - totalCases ) / totalCases * 100  
    var newRate = Math.round(exposureRate)+"%";
    $("#exposure-rate").text(newRate);
    $("#exposure-details").html("Cases: " + totalCases + "  <br/>  Contacts: " + totalContacts);
    
    
    
    
    
    //CFR box lower  right
    $("#cfr-rate").text(dataObj[6]["FCR"] + "%");
    var theDifference;
    var thisWeek = dataObj[6]["FCR This Week"];
    var lastWeek = dataObj[6]["FCR Last Week"];
    if (thisWeek >= lastWeek) {
        //increase
        theDifference = thisWeek - lastWeek;
        console.log("theDifference = " + theDifference);
        $("#cfr-difference").html("Up " + theDifference + " this week");
    }
    if ( thisWeek <= lastWeek) {
        //decrease
        theDifference = lastWeek - thisWeek;
        $("#cfr-difference").html("Down" + theDifference + " this week");
    }
    if ( thisWeek == lastWeek) {
        //same
        $("#cfr-difference").html("no change <br/> week to week");
    }
    
    
     
    //Clinics
   
    var theAverage;
    var regions = 15;
    var clinics  = dataObj[7]["Total Clinics"]
    
    theAverage = Math.round(clinics / regions); 
    
    $("#clinics").text(dataObj[7]["Total Clinics"]);
    $("#clinics-details").html("Average of " + theAverage + "<br/> clinics per region");
    
    
    

}



