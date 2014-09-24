var html2 = ""  // global string to hold html data

function loadNewsArticles(){
     //$.scrollUp('#scrollUp');
    var apiurl2 = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=ebola&begin_date=20140810&end_date=20141231&api-key=5dcbbb5694ebd23ab4e40f29f85493c4:9:69168380"


     $.getJSON(apiurl2,function(data){
                var times = data.response.docs;
              
                 $.each(times,function(i,data){


                   html2 += '<h4><a class="nyt-links" href="' + data.web_url + '">' + data.headline.main + '</a></h4>';

                   if (data.byline) {
                    html2 += data.byline.original  + " | ";

                    }

                   html2 += 'Published: ' + data.pub_date + '<br/>';
                   html2 += '<p>' + data.snippet +'</p>';
                   html2 += '<hr>'
                    });


                //after loop code
                $("#nytimes-results").append(html2);
            });


    loadOpenLibrary();
}


  //load Guardian news data

  function loadOpenLibrary() {

  var apiurl3 = "http://content.guardianapis.com/search?api-key=ruj4qjh6sjw6n8spkjrpwtpx&q=ebola+liberia&from-date=2014-09-15";

$.ajax({
    type: "GET",
    url: "http://content.guardianapis.com/search?api-key=ruj4qjh6sjw6n8spkjrpwtpx&q=ebola+liberia&from-date=2014-09-15",
    dataType: "jsonp",
    crossDomain: true,
    success: loadGuardian
  });

}
 var html3 ="";



function loadGuardian(data) {

      var results = data.response.results;

       var guardianDate = data.response.results.webPublicationDate;

             $.each(results, function(index,results){

                 html3 += '<br><h4><a class="nyt-links" href="' + data.response.results[index].webUrl + '">' + data.response.results[index].webTitle + '</a></h4>';
                html3 += '<h5>Published: ' + results.webPublicationDate + '</h5>';
                html3 += '<hr>';

             });

            

           $("#guardian-results").append(html3);

        loadGoogleNews();
}

function loadGoogleNews(){
    var google = "";
    var params = 'v=1.0&q=ebola%20liberia';
    $.ajax({
              data: params,
              url: 'https://ajax.googleapis.com/ajax/services/search/news?',
              type: 'get',
              dataType: 'jsonp',
              crossDomain: true,
              success:  function (response, textStatus, jqXHR) {
                var articles = response.responseData.results;
                  for(var key in articles){
                      if (articles.hasOwnProperty(key)){
                          var value=articles[key];
                          var image = value.image;

                          google += '<h4><a class="nyt-links" href="' + value.unescapedUrl + '">' + value.titleNoFormatting + '</a></h4>';

                          google += '<h5 class="news-outlet">Source: ' + value.publisher + " | ";
                          google += 'Published: ' + value.publishedDate + '</h5>';
                          if (image) {
                             google += '<img class="google-image" src="'+image.url+'"/>';
                           }
                          google += '<p>' + value.content +'</p>';
                          google += '<hr>'

                      }
                  }
            $("#google-results").append(google);

          },
          error: function(jqXHR, textStatus, errorThrown) {
              $("#error").text(textStatus + "; " + errorThrown);
          }
      });

      loadCDC();
}

function loadCDC(){
    // var params = 'rid=cs_3879&topicid=27726&fromdate=2014-06-01';
    var site = "http://t.cdc.gov/feed.aspx?topicid=27726&fromdate=2014-06-01";
    // var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=json&callback=?';
    $.ajax({
              data: 'q='+encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=?',
              url: 'http://query.yahooapis.com/v1/public/yql?',
              type: 'get',
              dataType: 'xml',
              crossDomain: true,
              success:  function (response, textStatus, jqXHR) {
              

                // Having cross domain issues
                // Additional instructions provided on CDC site: https://tools.cdc.gov/syndication/api.aspx
                // & also looking into using yql. Not 100% sure of what's here, but thought that it
                // might be worth checking out.


          },
          error: function(jqXHR, textStatus, errorThrown) {
              
          }
      });

      loadFlckr();
}

var html = ""  // string to hold data before writing to page
    //use any of the flickr api endpoints
    var apiurl = "http://api.flickr.com/services/feeds/photos_public.gne?tags=ebola,ebolavirus&per_page=50&sort=relevance&text=ebola%20outbreak&license=any&tagmode=any&content_type=1&format=json&jsoncallback=?"

   //load Flickr images

   function loadFlckr(){

            $.getJSON(apiurl,function(json){
               
                //code for outside loop

             //   $("#results2").append("<h2>" + json.title + "</h2>");
                 $.each(json.items,function(i,data){
                    //inside loop code
                    //html += '<p>Title:"' + data.title +'"</p>';
                    html += "<div id='" + 'flickr' + "'>";
                    //html += '<p>From:"'+ data.author_id+'"</p>';
                    html += "<a href='" + data.link + "'>";
                    html += "<img src='" + data.media.m + "'></a></div>";
                    });

                //after loop code
                $("#flickr-results").append(html);
            });

    }
