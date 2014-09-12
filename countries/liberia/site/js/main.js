// load top level data for homepage
var dataObj = new Array;
var deaths = new Array;
var cases = new Array;
var contacts = new Array;
var HCWDeaths = new Array;
var HCWCases = new Array;
var labs = new Array;
var treatments = new Array;

// make number human readable

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

//extract data      
function parseData(data){
   
    dataObj = $.parseJSON(data);
    var theLastItem = dataObj.length - 1;
    
       
   //console.log()
    //death box top left
    $("#total-deaths").text(numberWithCommas(dataObj[0]["total_deaths_all"]));
    $("#death-difference").html(numberWithCommas(dataObj[0]["new_weekly_deaths"]) + " deaths this week");
    
   
    
    //case box top left
    $("#total-cases").text(numberWithCommas(dataObj[0]["cases_cum"]));
    $("#case-difference").html(numberWithCommas(dataObj[0]["new_weekly_cases"]) + " cases this week");
    
    
    //hcw deaths box top left
    $("#hcw-deaths").text(numberWithCommas(dataObj[0]["hcw_deaths_cum"]));
    $("#hcw-death-details").text(numberWithCommas(dataObj[0]["new_weekly_deaths_hcw"]) + " deaths this week");  

    
    $("#hcw-cases").text(numberWithCommas(dataObj[0]["hcw_cases_cum"]));
    $("#hcw-cases-details").text(numberWithCommas(dataObj[0]["new_weekly_cases_hcw"]) + " cases this week");  

   
    
  
    

}



