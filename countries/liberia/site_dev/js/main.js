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
      url:"data/export_main_weekly.json",
      dataType:"text",
      success: parseData
    });
  }//end load(xml)

      
function parseData(data){
   
    dataObj = $.parseJSON(data);
    var theLastItem = dataObj.length - 1;
    
       
   
    //death box top left
    $("#total-deaths").text(numberWithCommas(dataObj[theLastItem]["1. Total deaths in confirmed, probable and suspected cases"]));
    
    
    
 
    var theDifference = 228;
    var percentChange = 9;
    $("#death-difference").html(theDifference + " deaths this week");
    
   
    
    //case box top left
    $("#total-cases").text(numberWithCommas(dataObj[theLastItem]["1. Total cases"]));
    var theDifference = 376;
    var percentChange = 55;

    $("#case-difference").html(theDifference + " cases this week");
    
  
    
    //hcw deaths box top left
    $("#hcw-deaths").text(numberWithCommas(dataObj[theLastItem]["HealthCare worker total deaths"]));
    var theDifference = 4;
    var percentChange = 25;

    $("#hcw-death-details").html(theDifference + " deaths this week");
    
    
    $("#hcw-cases").text(numberWithCommas(dataObj[theLastItem]["HealthCare worker total cases"]));
    
    var theDifference = 14;
    var percentChange = 27;

    $("#hcw-cases-details").html(theDifference + " cases this week");
    
   
    
  
    

}



