
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');


    var username;
    var password;
    // $(document).on("pagecreate", function() {
        // Function to handle click event for the "Login" button
        
        $(".login-container").click(function() {
            //get username and login
            if ($(".sign-in-name").val() != "" && $(".sign-in-password").val() != "") {
            username = $(".sign-in-name").val(); //anil.uk.29@example.com
            password = $(".sign-in-password").val(); //588848

            signIn(username,password);
            }else{
                $(".sign-in-name").val("Add correct name");
            }
            
                
        // slidePage("#banklist"); // Assuming slidePage function is defined elsewhere
        // signIn()
        });
    // });


// Function to handle page transitions
function slidePage(pageId) {
    $.mobile.changePage(pageId, { transition: "slide" });
}

//sign-in function
var token
function signIn(username,password){

$.ajax({
    url: "https://apisandbox.openbankproject.com/my/logins/direct",
    type: "POST",
    dataType:"json",
    crossDomain: true,
    cache: false,
    contentType: "application/json; charset=utf-8",

    beforeSend: function(xhr) {
        xhr.setRequestHeader(
            "Authorization",
            `DirectLogin username="${username}", password="${password}", consumer_key="b2by2s4ggkjasrqo5rfuz0vuod2gdavotk53pydx"`)
    },
    
    success: function(data, textStatus, jqXhr) {
        // Executed if the request is successful (a success HTTP message is received back from the server)
        console.log("success")
       slidePage("#banklist"); // slidePage function has been defined 

      //  console.log(data.token)
        token = data.token;

        reguestBank(token)
    },
    error: function(jqXhr, textStatus, errorThrown) {
        // Executed if the request failed (an error HTTP message is received back from the server)
        console.log("error");
        $('.login-error-container').removeClass('ui-screen-hidden');

    }
});
}
//request bank
function reguestBank(tok){
    // Replace 'YOUR_API_KEY' with your actual API key
//var apiKey = 'YOUR_API_KEY';

$.ajax({
    url: 'https://apisandbox.openbankproject.com/obp/v5.1.0/banks',
    type: 'GET',
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'DirectLogin token=' + tok);
    },
    success: function(data) {
        // Handle the successful response here
        let vo = data.banks
       // console.log('Banks loaded:', vo);

        //add banks to DOM
// Loop through each bank and create a card for it
        $.each(data.banks, function(index,bank) {
            // Create a new card element
             //console.log('good')
            var card = $('<div onClick=accThings() class="ui-content-inline ui-shadow ui-btn">').addClass('bankCard').attr('id',bank.id);
        
            // Add the bank details
            
            card.append($('<div  class="ui-shadow">')
                .append($('<a href="#bankpage">'))
                .append($('<img>').attr('src', bank.logo))
                .append($('<h2>').text(bank.full_name))); // Bank logo)
            card.append($('<p>').text('Website: ' + bank.website)); // Bank website
        
            //console.log(card)
            $('.no-of-bank-found').text(":" + index);
            // Add the card to the page
           $('.available-banks').append(card);
        });
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // Handle any errors here
        console.error('Error:', errorThrown);
    }
});
}


//display accounts in banks..............
function getBankAccounts (BANK_ID){
$.ajax({
    url: `https://apisandbox.openbankproject.com/obp/v5.1.0/banks/${BANK_ID}/accounts/public`,
    type: 'GET',
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'DirectLogin token=' + token);
    },

    
    success: function(data) {
    //  console.log("great", data.banks)
    console.log("great", data)
    $.each(data, function(index,bank) {
        // Create a new card element
         //console.log('good')
        var card = $('<div onClick=accDet() class="ui-content-inline ui-shadow ui-btn">').addClass('bankCard')
        // .attr('id',bank.id);
    
        // Add the bank details
        card.append($('<div  class="ui-shadow">')
            .append($('<img>').attr('src', bank.logo))
            .append($('<h2>').text(bank.full_name))); // Bank logo)
        card.append($('<p>').text('Website: ' + bank.website)); // Bank website
    
        //console.log(card)
        $('.no-of-bank-found').text(":" + index);
        // Add the card to the page
       $('.available-banks').append(card);
    });
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // Handle any errors here
        console.error('Error:', errorThrown);
    }
});

}

function accThings() {
    $('.bankCard').click(function(event){
    
        var cardID = $(this).attr('id');
        console.log(12)
        getBankAccounts(cardID)

        // Prevent the usual navigation behavior
	    event.preventDefault();

        // Alter the url according to the anchor's href attribute, and
	// store the data-foo attribute information with the url
        $.mobile.navigate( $(this).attr( "href" )
    //     , {
	// 	foo: $(this).attr("data-foo")
	// }
    );

    })
}
    

// Trigger jQuery Mobile's enhancement to apply styles and behavior to the dynamically added content
$('.available-banks').enhanceWithin();
// }

}

