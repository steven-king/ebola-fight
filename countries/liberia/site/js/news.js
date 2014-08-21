var html2 = ""  // global string to hold html data

function loadNewsArticles(){
     //$.scrollUp('#scrollUp');
    var apiurl2 = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=ebola&begin_date=20140810&end_date=20141231&api-key=5dcbbb5694ebd23ab4e40f29f85493c4:9:69168380"


     $.getJSON(apiurl2,function(data){
                var times = data.response.docs;
                // console.log(data.response.docs);
                 $.each(times,function(i,data){


                   html2 += '<h4><a class="nyt-links" href="' + data.web_url + '">' + data.headline.main + '</a></p>';

                   if (data.byline) {
                    html2 += '<p>' + data.byline.original + '</p>';

                    }

                   html2 += '<p>Published: ' + data.pub_date + '</p>';
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

  var apiurl3 = "http://content.guardianapis.com/search?q=ebola&api-key=qnhewepyj6xfty2guy2y4vf4";

$.ajax({
    type: "GET",
    url: "http://content.guardianapis.com/search?q=ebola+liberia&date-id=date%2Flast20days&api-key=qnhewepyj6xfty2guy2y4vf4",
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

            //   console.log(data.response.results.webTitle);
                 html3 += '<br><h4><a class="nyt-links" href="' + data.response.results[index].webUrl + '">' + data.response.results[index].webTitle + '</a></p>';
                html3 += '<p>Published: ' + results.webPublicationDate + '</p>';
                html3 += '<hr>';

             });

                // console.log(html3);

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

                          google += '<h4><a class="nyt-links" href="' + value.unescapedUrl + '">' + value.titleNoFormatting + '</a></p>';

                          google += '<p class="news-outlet">' + value.publisher + '</p>';
                          google += '<p>Published: ' + value.publishedDate + '</p>';
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
                console.log(response);

                // Having cross domain issues
                // Additional instructions provided on CDC site: https://tools.cdc.gov/syndication/api.aspx
                // & also looking into using yql. Not 100% sure of what's here, but thought that it
                // might be worth checking out.


          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + "; " + errorThrown);
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
                // console.log(json);
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
                // console.log(html);
                //after loop code
                $("#flickr-results").append(html);
            });

    }
