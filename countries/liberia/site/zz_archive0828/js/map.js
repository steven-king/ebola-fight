var marker;
var markers = [];
var markerCount = 0;
var geocoder;
var map;
var modalHTML = "";

function testFunction(){
  $("#frame").append('<iframe class="test" src="info.php?city=Clayton&state=North%20Carolina&country=United%20States&lat=35.58138418324621&lng=-78.4149169921875"></iframe>');
}

function openModal(city, state, country, lat, lng){
  $('#modal-content').html("You Selected:<br/><strong>City=</strong>"+city+"<br/><strong>State=</strong>"+state+"<br/><strong>Country=</strong>"+country+"<br/><strong>lat=</strong>"+lat+"<br/><strong>lng=</strong>"+lng);
  //var frameSrc = "info.php?city="+city+"&state="+state+"&country="+country+"&lat="+lat+"&lng="+lng;
  //$('iframe').attr("src",frameSrc);
  $('#infoModal').modal('show');
}

function initialize() {
  console.log("init()");
  //$('#instructionsModal').modal('show');
	geocoder = new google.maps.Geocoder();

    var mapOptions = {
      center: new google.maps.LatLng(7.24, -8.97),
      zoom: 8
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"),
        mapOptions);
    
    get_crisisData(map)

    google.maps.event.addListener(map, "dblclick", function(event) {
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		codeLatLng(lat, lng);
	});
}

function get_crisisData() {
  console.log(map);
var userQuery = $("#userQuery").val();
var fromDate = $("#fromDate").val();
var toDate = $("#toDate").val();
var tagged = $("#tagged").val();


console.log(fromDate);
console.log(toDate);
qs = 'text=ebola&after=2014-08-10';
if (userQuery != ''){
    qs = userQuery;
}
else if (fromDate != '' && toDate != ''){
    qs = 'text=ebola&after='+fromDate+'&before='+toDate;
}
else if (fromDate != ''){
    qs = 'text=ebola&after='+fromDate;
}
else if (toDate != ''){
    qs = 'text=ebola&before='+toDate;
}
else{
    qs = 'text=ebola&after=2014-08-10';
}
console.log(qs);
apiKey = '&apikey=53f3b2c526102d463f4b14e1';
params = qs + apiKey;
var geocoder = new google.maps.Geocoder();

  $.ajax({
			data: params,
			url: 'http://api.crisis.net/item?',
			type: 'get',
			dataType: 'json',
			beforeSend: function () {},
			success:  function (response, textStatus, jqXHR) {

                for(var key in response){
                    coords_list = [];
                    if (response.hasOwnProperty(key)){
                        var value=response[key];
                        console.log("total responses: " + value.length);
                        console.log(value);
                        for(var key in value){
                            if (value.hasOwnProperty(key)){
                                var entry = value[key];
                                coords = entry['geo']['coords'];
                                content = entry['content'];
                                createdAt = entry['createdAd'];
                                fromURL = entry['fromURL'];
                                tags = [];
                                all_tags = entry['tags'];
                                for(var key in all_tags){
                                    if (all_tags.hasOwnProperty(key)){
                                        var tag = all_tags[key];
                                        tags.push(' '+tag['name'])
                                    }
                                }
                                affected = entry['totalAffectedPersons'];
                                published = entry['publishedAt'];
                                updated = entry['updatedAt'];
                                // Not getting this
                                // loc = entry['geo']['addressComponenets'];
                                mini_list = [content, coords, createdAt, fromURL, tags, affected, published, updated];
                                if (coords){
                                    // console.log(entry);
                                    coords_list.push(mini_list);
                                }
                            }
                        }
                    console.log("geocoded locs: " + coords_list.length);
                    }

                    
                    var infowindow = new google.maps.InfoWindow();

                    var marker, i;

                    for (i = 0; i < coords_list.length; i++) {
		      console.log("in loop of coords_list");
                      marker = new google.maps.Marker({
                        position: new google.maps.LatLng(coords_list[i][1][1], coords_list[i][1][0]),
                        map: map
                      });

                      google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
			   console.log("in set content");
                          infowindow.setContent('<b>content:</b> '+coords_list[i][0]+'\
                          <br /><b>created at:</b> '+coords_list[i][2]+'\
                          <br /><b>url:</b> <a href='+coords_list[i][3]+' target="_blank">'+coords_list[i][3]+'</a>\
                          <br /><b>tags:</b> '+coords_list[i][4]+'\
                          <br /><b>affected people:</b> '+coords_list[i][5]+'\
                          <br /><b>published at:</b> '+coords_list[i][6]+'\
                          <br /><b>updated at:</b> '+coords_list[i][7]);
                          infowindow.open(map, marker);
                        }
                      })(marker, i));
                    }
                }


		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#error").text(textStatus + "; " + errorThrown);
		}
	});
}


function placeMarker(latlng, city, stateShort, stateLong, country){
	markers.push(new google.maps.Marker({
		position: latlng,
		map:map,
		title: 'Marker' + markerCount
	}));
  address = "";
  if (city){
    address += city + ", ";
  }
  if (stateShort){
    address += stateShort + " ";
  }
  if (country){
    address += country;
  }

  lat = latlng.lat();
  lng = latlng.lng();
	var content ="Ebola Health Reports near:<h3>" + address + "</h3>";
	
	content +="Latitude: " + latlng.lat().toFixed(2) + "<br/>Longitude: " + latlng.lng().toFixed(2) + "<br/>";
	//content +="<button class='btn btn-primary btn-sm' onclick='openModal(\"" + city + "\", \"" + stateLong + "\", \"" + country + "\", \"" + latlng.lat() + "\", \"" + latlng.lng() + "\")'>See more Info</button>";
	
	content += "<p><br/><strong>Deaths:</strong>" + "0<br/>";
	content += "<strong>Cases:</strong>" + "0<br/></p>";
  
  
  // content+="<button class='btn btn-primary btn-sm' onclick='openModal()'>See more Info</button>";
  content+="<br/><button class='btn btn-danger btn-sm' onclick='deleteMarker(" + markerCount + ")'>Remove Marker</button>";

	var infowindow = new google.maps.InfoWindow({
		content: content
    });

    infowindow.open(map, markers[markerCount]);

    google.maps.event.addListener(markers[markerCount], 'click', function(){
      infowindow.open(map, this);
    });

    markerCount++;
}

function deleteMarker(count){
	markers[count].setMap(null);
}

function openInfo(city, state, country, lat, lng){
  window.open("info.php?city=" + city + "&state=" + state + "&country=" + country + "&lat=" + lat + "&lng=" + lng);
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          arrAddress = results[0].address_components;
          console.log(arrAddress);
          var city, stateShort, stateLong, country;
            $.each(arrAddress, function (i, address_component) {
                console.log('address_component:'+i);
                if (address_component.types[0] == "locality"){
                    city = address_component.long_name;
                }

                if (address_component.types[0] == "country"){
                    country = address_component.long_name;
                }

                if (address_component.types[0] == "administrative_area_level_1"){
                    stateShort = address_component.short_name;
                    stateLong = address_component.long_name;
                }
            });
          placeMarker(latlng, city, stateShort, stateLong, country);
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);