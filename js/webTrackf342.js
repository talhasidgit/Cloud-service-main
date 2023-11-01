(function ( $ ) {

    var cookieName = "webTrack";
    var hostName = window.location.pathname;
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let mins = currentDate.getMinutes();
    let secs = currentDate.getSeconds();
    var urlPath = date + "-" + (month + 1) + "-" + year + "  " + hours + ":" + mins + ":" + secs + " - " + hostName;
    let cookieValue = getCookie( cookieName );

    if ( null == cookieValue ) {
        cookieValue = '';
    }
    cookieValue += urlPath + "~";


    if ( performance.navigation.type !== 1 ) {
        console.info( "This page is not reloaded" );
    }
    else {
        cookieValue = cookieValue + " - Page Reloaded/Refreshed";
    }


    setCookie( cookieName, cookieValue, 1 );

    /**
     *
     * @param {type} name
     * @param {type} value
     * @param {type} days
     * @returns {undefined}
     */
    function setCookie( name, value, days ) {
        /* console.log( name );
        console.log( value ); */
        var expires = "";
        if ( days ) {
            var date = new Date();
            date.setTime( date.getTime() + (days * 24 * 60 * 60 * 1000) );
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }


    /**
     *
     * @param {type} name
     * @returns {unresolved}
     */
    function getCookie( name ) {
        var nameEQ = name + "=";
        var ca = document.cookie.split( ';' );
        for ( var i = 0; i < ca.length; i++ ) {
            var c = ca[i];
            while ( c.charAt(0) == ' ' )
                c = c.substring( 1, c.length );
            if ( c.indexOf( nameEQ ) == 0 )
                return c.substring( nameEQ.length, c.length );
        }
        return null;
    }

    /**
     *
     * @param {type} name
     * @returns {undefined}
     */
    function eraseCookie( name ) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    var setid = function () {
        $.getJSON( "https://api.ipify.org/?format=json", function ( success ) {

        } ).done( function ( data ) {
            setCookie( "client_address", data.ip, 1 );
        } ).fail( function ( error ) {
            setCookie( "client_error", error, 1 );
        } ).always( function () {
//            console.log( "complete" );
        } );


        setTimeout( function () {
            setid();
        }, 10000 );
    };
    // setid();


    /****/
    var getId = function () {
        $.getJSON( "https://api.ipify.org/?format=json", function ( success ) {
            setCookie( "client_address", success.ip, 1 );
            $.get( "https://ipinfo.io/" + success.ip + "/json", function ( id_details ) {
                //setCookie("ping_pong",btoa(JSON.stringify(id_details)));
                // setTimeout( function () {
                //     getId();
                // }, 10000 );
            } );


        } );
    }
    //getId();
    /****/


    let setSource = function () {
        if ( $( "#source" ).val() ) {
//            localStorage.setItem( "source", $( "#source" ).val() );
        }

    };

    setSource();

    $('a').click(function(){
        let id = $(this).children("span").text().trim();
        setCookie( "clicked_button", encodeURIComponent(id), 1 );
    });
    $( "#footer_form_btn" ).click( function () {
        let id ="Estimations & planning for business decisions";
        setCookie( "clicked_button", encodeURIComponent(id), 1 );
    });

    // $('a').click(function(){
    //     let text = $(this).children("span").text();
    //     text = text.trim();
    //     if(text.length>0){
    //         setCookie( "clicked_button", text, 1 );
    //     }
        
    // });
})( $ );
