document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  console.log("received deviceready");
  document.getElementById("deviceready").classList.add("ready");
  document.getElementById("hellobutton").addEventListener("click", printhello);
  document.getElementById("button1").addEventListener("click", signin);
  document.getElementById("btnget").addEventListener("click", getData);
}

document.getElementById("button1").addEventListener("click", signin);
document.getElementById("btnget").addEventListener("click", getData);

var token;

function printhello() {
  console.log("in printhello");
  document.getElementById("hellop").innerHTML = "Hello World!";
}

function signin() {
  console.log("in function signin");
  document.getElementById("text1").innerHTML = "Signing in";

  //Ajax
  $.ajax({
    url: "https://apisandbox.openbankproject.com/my/logins/direct",
    type: "POST",
    dataType:"json",
    crossDomain: true,
    cache: false,
    contentType:"application/json; charset=utf-8",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization",
    'DirectLogin username="197802tosinalo",password="Computer1234$", consumer_key="ndlpn2l4h4e4pcw5vpyiqmkxwsbtbk0r3dvsrfng"');

    },
    success: function( data, textStatus, jQxhr ){
      console.log("in success");
      document.getElementById("text1").innerHTML = 
    "Successful login. Token: " + data.token;
      token = data.token;
    },
    error: function( jqXhr, textStatus, errorThrown ){
      console.log("in error");
      document.getElementById("text1").innerHTML = "error";
    }
  })  
}

//get req
function getData() {
  console.log("in function getData");
  // document.getElementById("infobox").innerHTML = "Data Received";

  $.ajax({
    url: "https://apisandbox.openbankproject.com/obp/v4.0.0/banks/gh.29.uk",
    type: "GET",
    dataType:"json",
    crossDomain: true,
    cache: false,
    contentType:"application/json; charset=utf-8",
    
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
    },
    success: function( data, textStatus, jQxhr ){
      console.log("in query success");
      console.log(data);
      document.getElementById("infobox").innerHTML = "Query successful";
    },
    error: function( jqXhr, textStatus, errorThrown ){
      console.log("in query error");
      document.getElementById("text2").innerHTML = "Query failed";
    }
  });
}

// for all anchor tags
// Define a click binding for all anchors in the page
$( "a" ).on( "click", function( event ) {

	// Prevent the usual navigation behavior
	event.preventDefault();

	// Alter the url according to the anchor's href attribute, and
	// store the data-foo attribute information with the url
	$.mobile.navigate( $(this).attr( "href" ), {
		foo: $(this).attr("data-foo")
	});

	// Hypothetical content alteration based on the url. E.g, make
	// an Ajax request for JSON data and render a template into the page.
	// alterContent( $(this).attr("href") );
  
});