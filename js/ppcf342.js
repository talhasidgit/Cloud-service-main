if ( "localhost" == location.hostname )
    var domain = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/appinventiv/";
else
    domain = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/";
var $ = $.noConflict();


function isValidEmail( e ) {
    return !!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( e )
}

function validateEmail( e ) {
    return !!/^((([a-zA-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-zA-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-zA-Z]|[0-9])([a-zA-Z]|[0-9]|\-){0,61}([a-zA-Z]|[0-9])\.))*([a-zA-Z]|[0-9])([a-zA-Z]|[0-9]|\-){0,61}([a-zA-Z]|[0-9])\.)[\w]{2,10}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,10})\])))$/.test( e )
}

function validateName( e ) {
    if ( e.keyCode > 64 && e.keyCode < 91 || 8 == e.keyCode || 9 == e.keyCode || 32 == e.keyCode )
        return !0;
    e.preventDefault()
}

function checkphonenumber( e ) {
    -1 !== $.inArray( e.keyCode, [ 16, 17, 46, 8, 9, 27, 13, 187, 189 ] ) || 65 == e.keyCode && !0 === e.ctrlKey || 86 == e.keyCode && !0 === e.ctrlKey || 67 == e.keyCode && !0 === e.ctrlKey || 88 == e.keyCode && !0 === e.ctrlKey || e.keyCode >= 35 && e.keyCode <= 39 || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault()
    
}

//setCookie( cookieName, cookieValue, 1 );
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

$( document ).ready( function () {
    localStorage.setItem("user_aggrement", "No");
    localStorage.setItem("user_trends", "No");
    $('#user_trends').click(function() { 
        if ($('#user_trends').hasClass('active')) {
            localStorage.setItem("user_trends", "Yes");
        } else {
            localStorage.setItem("user_trends", "No");
        }
    })

    
    $('#user_aggrement').click(function() { 
        if ($('#user_aggrement').hasClass('active')) {
            //$(this).prop('checked',false);
            localStorage.setItem("user_aggrement", "Yes");
        } else {
            localStorage.setItem("user_aggrement", "No");
        }
    });

    $('#agree_box').click(function() {
        if ($('#agree_box').hasClass('active')) {
            //$(this).prop('checked',false);
            $('#wpcf_acceptance').val('1');
        } else {
            $('#wpcf_acceptance').val('0');
        }
    });


});

$( document ).ready( function () {
    $( "#header_email_btn" ).click( function () {
        var e = !1;
        isValidEmail( $( "#header_email" ).val() ) && (e = !0), e ? ($( "#headEnquiry" ).fadeIn(), $( ".homeoverlay" ).fadeIn()) : $( "#banner_email_div" ).addClass( "shake error" )
    } ), $( "#resq-inp-submit" ).click( function () {
        var e = $( "#appinventivISD" ).val(),
                a = $( "#appinventivContact" ).val(),
                o = {
                    user_email: $( "#header_email" ).val(),
                    user_name: $( "#appinventivName" ).val(),
                    user_mobile: e + "-" + a,
                    user_msg: $( "#appinventivMessage" ).val()
                };
        $.ajax( {
            url: domain + "ppc_contact.php",
            method: "POST",
            data: o,
            beforeSend: function ( e ) {
                $( "#header_loader" ).css( "display", "block" ), $( "#headEnquiry" ).fadeOut(), $( ".homeoverlay" ).fadeOut()
            },
            success: function ( e ) {
                $( "#header_email" ).val( "" ), $( "#appinventivISD" ).val( "" ), $( "#appinventivName" ).val( "" ), $( "#appinventivContact" ).val( "" ), $( "#appinventivMessage" ).val( "" );
                var a = localStorage.getItem("source");
                a = "undefined" == a ? "" : "?source=" + a, window.location.href = domain + "thank-you"
            }
        } )
    } ), $( ".homeoverlay" ).click( function () {
        $( "#resq-inp-submit" ).click()
    } ), $( "#page_contact_button" ).click( function () {
        var e = $( "#page_name" ).val(),
                a = $( "#page_email" ).val(),
                o = $( "#page_mobile" ).val(),
                n = !0;
        if ( e.length <= 1 ? ($( "#page_name" ).parent().addClass( "shake error" ), n = !1) : $( "#page_name" ).parent().removeClass( "shake error" ), isValidEmail( a ) ? $( "#page_email" ).parent().removeClass( "shake error" ) : ($( "#page_email" ).parent().addClass( "shake error" ), n = !1), n ) {
            var r = {
                user_name: e,
                user_email: a,
                user_phone: o
            };
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                data: r,
                beforeSend: function ( e ) {
                    $( "#page_contact_loader" ).css( "display", "block" )
                },
                success: function ( e ) {
                    $( "#page_name" ).val( "" ), $( "#page_email" ).val( "" ), $( "#page_mobile" ).val( "" );
                    var a = localStorage.getItem("source");
                    "undefined" == (a = "?source=" + a) && (a = ""), window.location.href = domain + "thank-you"
                }
            } )
        }
    } ), $( "#slot_btn" ).click( function () {
        var e = $( "#slot_name" ).val(),
                a = $( "#slot_email" ).val(),
                o = $( "#slot_skype" ).val(),
                n = !0;
        if ( e.length <= 1 ? ($( "#slot_name" ).parent().addClass( "shake error" ), n = !1) : $( "#slot_name" ).parent().removeClass( "shake error" ), isValidEmail( a ) ? $( "#slot_email" ).parent().removeClass( "shake error" ) : ($( "#slot_email" ).parent().addClass( "shake error" ), n = !1), n ) {
            var r = {
                user_name: e,
                user_email: a,
                user_phone: o
            };
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                data: r,
                beforeSend: function ( e ) {
                    $( "#slot_loader" ).css( "display", "block" )
                },
                success: function ( e ) {
                    $( "#slot_name" ).val( "" ), $( "#slot_email" ).val( "" ), $( "#slot_skype" ).val( "" );
                    var a = localStorage.getItem("source");
                    "undefined" == (a = "?source=" + a) && (a = ""), window.location.href = domain + "thank-you"
                }
            } )
        }
    } ), $( "#footer_form" ).click( function () {
        domain = location.protocol + "//" + location.host + "/";
        var e = $( "#yrname" ).val(),
                a = $( "#yrmail" ).val(),
                o = $( "#phnumber" ).val(),
                n = $( "#typeinp" ).val(),
                r = !0;
        if ( e.length <= 1 )
            return $( "#yrname" ).focus(), void(r = !1);
        if ( !isValidEmail( a ) )
            return $( "#yrmail" ).focus(), void(r = !1);
        if ( r ) {
            var t = {
                user_name: e,
                user_email: a,
                user_phone: o,
                user_message: n
            };
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                data: t,
                beforeSend: function ( e ) {
                    $( "#footer_loader" ).css( "display", "block" )
                },
                success: function ( e ) {
                    $( "#yrname" ).val( "" ), $( "#yrmail" ).val( "" ), $( "#phnumber" ).val( "" ), $( "#typeinp" ).val( "" );
                    var a = localStorage.getItem("source");
                    "undefined" == (a = "?source=" + a) && (a = ""), window.location.href = domain + "thank-you"
                }
            } )
        }
    } ), $( "#footer_form_btn1" ).click( function () {
        //alert("first");
        var e = $( "#footer_name" ).val();
        var a = $( "#footer_mail" ).val();
        var o = $( "#footer_phonenumber" ).val();
        var n = $( "#footer_message" ).val();
        var w = $( "#_wpnonce" ).val();
        //r = !0;
        r = 0;
        // if ( e.length <= 1 )
        //     return $( "#footer_name" ).focus(), $( "#footer_name_div" ).addClass( "error" ), void(r = !1);
        // if ( !isValidEmail( a ) )
        //     return $( "#footer_mail" ).focus(), $( "#footer_mail_div" ).addClass( "error" ), void(r = !1);
        // if ( r ) {
        //alert("second");
        var t = {
            user_name: e,
            user_email: a,
            user_phone: o,
            user_message: n,
            _wpnonce:w,
            visitor_track:v,
        };
        setCookie( "_wn_", w, 1 );
        //alert("hi");
        //return false;
        $.ajax( {
            url: domain + "contactsubmit8.php",
            type: "POST",
            data: t,
            // beforeSend: function ( e ) {
            //    // $( "#footer_loader" ).css( "display", "block" )
            // },
            success: function ( data, textStatus, jqXHR ) {
                //alert("success");return false;
                $( "#footer_name" ).val( "" );
                $( "#footer_mail" ).val( "" );
                $( "#footer_phonenumber" ).val( "" );
                $( "#footer_message" ).val( "" );
                var a = "success-message";//$( "#source" ).val();
                "undefined" == (a = "?source=" + a) && (a = ""),
                        window.location.href = domain + "thank-you"
            },
            error: function ( request, status, error ) {
                //console( request );
                console.log( status );
                console.log( error );
                return false;
            }
        } )
        //}
    } ), $( "#footer_form_btn" ).click( function () {
        domain = location.protocol + "//" + location.host + "/";
        var o = $( "#footer_name" ).val(),
                n = $( "#footer_mail" ).val(),
                r = $( "#contact_skype" ).val(),
                t = $( "#footer_phonenumber" ).val(),
                // l = $( "#contact_budget" ).val(),
                i = $( "#footer_message" ).val(),
                // s = $( "#new_file_name" ).val(),
                // c = $( "#file_name" ).val(),
                c = $( "#cta_footer_track" ).val(),
                //d = $( "#agreementa" ).val(),
                d = localStorage.getItem("user_aggrement"),
                m = parseInt( $( "#capt" ).val() ),
                w = $( "#_wpnonce" ).val(),
                v = localStorage.getItem("VisitorTrack"),
                u = !0;
                setCookie( "_wn_", w, 1 );
        if ( console.table( u ), 
        //o.length < 1 ? (e( "#footer_name" ), u = !1) : a( "#footer_name" ), 
        isValidEmail( n ) ? a( "#footer_mail" ) : (e( "#footer_mail" ), u = !1), i.length < 1 ? (e( "#footer_message" ), u = !1) : a( "#footer_message" ), isNaN( m ) || 0 == m ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : m != parseInt( $( "#firstNumber" ).val() ) + parseInt( $( "#secondNumber" ).val() ) ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : $( "#captcha-section" ).removeClass( "error" ), console.table( u ), u ) {
            var v = {
                user_name: o,
                user_email: n,
                user_phone: t,
                user_skype: r,
                // user_budget: l,
                // user_file_name: c,
                // user_new_file_name: s,
                user_agreementa: d,
                user_message: i,
                cta_track:c,
                _wpnonce:w,
                visitor_track:v,
            };
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                async: !0,
                data: v,
                beforeSend: function () {
                    $( "#header_loader" ).css( "display", "block" )
                },
                success: function () {
                    $( "#footer_name" ).val( "" );
                    $( "#footer_mail" ).val( "" );
                    $( "#footer_phonenumber" ).val( "" );
                    $( "#footer_message" ).val( "" );
                    
                    if(c != '' && c != undefined) {
                        var z = "?ctaID="+c;
                    } else { var z = ''; }
                    var e = "",
                            a = localStorage.getItem("source");
                    "undefined" != a && (e = "?source=" + a), window.location.href = domain + "thank-you" + z
                }
            } )
        }
    } ), $( "#footer_form_btn2" ).click( function () {
        domain = location.protocol + "//" + location.host + "/";
        var e = $( "#footer_name1" ).val(),
                a = $( "#footer_mail1" ).val(),
                o = $( "#footer_phonenumber1" ).val(),
                n = $( "#footer_message1" ).val(),
                m = $( "#captcha" ).val(),
                c = $( "#cta_track" ).val(),
                t = parseInt( $( "#firstNumber" ).val() ) + parseInt( $( "#secondNumber" ).val() ),
                w = $( "#_wpnonce" ).val(),
                v = localStorage.getItem("VisitorTrack"),
                r = !0;
                setCookie( "_wn_", w, 1 );
                
                
                if ( e.length <= 1 )
                    return $( "#footer_name1" ).focus(), $( "#footer_name_div" ).addClass( "error" ), void(r = !1);
                if ( !isValidEmail( a ) )
                return $( "#footer_mail1" ).focus(), $( "#footer_mail_div").addClass( "error" ), void(r = !1);
                if (t != m)
                    return $( "#captcha" ).focus(), $( "#footer_capt_div").addClass( "error" ), void(r = !1);
            
                if ( r ) {

                var t = {
                    user_name: e,
                    user_email: a,
                    user_phone: o,
                    user_message: n,
                    _wpnonce:w,
                    cta_track:c,
                    visitor_track:v,
                };
            //console.log("last call");
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                data: t,
                beforeSend: function ( e ) {
                    //console.log( "loader" ); //return false;
                    // $( "#header_loader" ).css( "display", "block" );
                    $( '.formloader-anim' ).css( 'display', 'block' );

                },
                success: function ( e ) {
                    $( "#footer_name1" ).val( "" );
                    $( "#footer_mail1" ).val( "" );
                    $( "#footer_phonenumber1" ).val( "" );
                    $( "#footer_message1" ).val( "" );
                    //  console.log("success"); //return false;
                    $( "#footer_name" ).val( "" ), $( "#footer_mail" ).val( "" ), $( "#footer_phonenumber" ).val( "" ), $( "#footer_message" ).val( "" );
                    
                    if(c != '' && c != undefined) {
                        var z = "?ctaID="+c;
                    } else { var z = ''; }

                    var a = localStorage.getItem("source");
                    "undefined" == (a = "?source=" + a) && (a = ""), window.location.href = domain + "thank-you" + z
                },
                error: function ( request, status, error ) {
                    //console( request );
                    console.log( status );
                    console.log( error );
                    return false;
                }
            } )
        }
    } ),

    $( "#footer_form_btn3" ).click( function () {
        
        domain = location.protocol + "//" + location.host + "/";
            var e = $( "#footer_name3" ).val(),
            a = $( "#footer_mail3" ).val(),
            o = $( "#footer_phonenumber3" ).val(),
            n = $( "#footer_message3" ).val(),
            w = $( "#_wpnonce" ).val(),
            c = $( "#cta_tech_track" ).val(),
            v = localStorage.getItem("VisitorTrack"),
            //m = $( "#captcha" ).val(),
            //t = parseInt( $( "#firstNumber" ).val() ) + parseInt( $( "#secondNumber" ).val() ),
            r = !0;
            setCookie( "_wn_", w, 1 );
            
            
            if ( n.length <= 1 )
                return $( "#footer_message3" ).focus(), $( "#form-success" ).show(), $( "#form-success" ).text("Please enter the Message"), void(r = !1);
            
            if ( !isValidEmail( a ) )
                return $( "#footer_mail3" ).focus(), $( "#footer_mail_div").addClass( "error" ), $( "#form-success" ).show(), $( "#form-success" ).text("Please enter a valid email"), void(r = !1);

            /* if ( o.length <= 1 )
                return $( "#footer_phonenumber3" ).focus(), $( "#footer_phone_div" ).addClass( "error" ), $( "#form-success" ).show(), $( "#form-success" ).text("Please enter the phone"), void(r = !1); */
            /* if (t != m)
                return $( "#captcha" ).focus(), $( "#footer_capt_div").addClass( "error" ), void(r = !1); */
        
            if ( r ) {

            var t = {
                user_name: e,
                user_email: a,
                user_phone: o,
                _wpnonce:w,
                user_message: n,
                cta_track:c,
                visitor_track:v,
            };
            setCookie( "_wn_", w, 1 );
            //console.log("last call");
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                data: t,
                beforeSend: function ( e ) {
                    //console.log( "loader" ); //return false;
                    // $( "#header_loader" ).css( "display", "block" );
                    $( '.formloader-anim' ).css( 'display', 'block' );
                    
                },
                success: function ( e ) {
                    $( "#footer_name3" ).val( "" );
                    $( "#footer_mail3" ).val( "" );
                    $( "#footer_phonenumber3" ).val( "" );
                    $( "#footer_message3" ).val( "" );
                    //  console.log("success"); //return false;
                    $( "#footer_name3" ).val( "" ), $( "#footer_mail3" ).val( "" ), $( "#footer_phonenumber3" ).val( "" ), $( "#footer_message3" ).val( "" );
                    if(c != '' && c != undefined) {
                        var z = "?ctaID="+c;
                    } else { var z = ''; }

                    var a = localStorage.getItem("source");
                    "undefined" == (a = "?source=" + a) && (a = ""), window.location.href = domain + "thank-you" + z
                },
                error: function ( request, status, error ) {
                    /* console( request );
                    console.log( status );
                    console.log( error ); */
                    return false;
                }
            } )
        }
    } ),
    

        $( "#contact_us_btn" ).click( function () {
        domain = location.protocol + "//" + location.host + "/";
        var o = $( "#contact_fname" ).val(),
                n = $( "#contact_email" ).val(),
                r = $( "#contact_skype" ).val(),
                t = $( "#contact_phonemuber" ).val(),
                l = $( "#contact_budget" ).val(),
                i = $( "#contact_message" ).val(),
                s = $( "#new_file_name" ).val(),
                c = $( "#file_name" ).val(),
                d = localStorage.getItem("user_aggrement"),
                f = localStorage.getItem("user_trends"),
                v = localStorage.getItem("VisitorTrack"),
                m = parseInt( $( "#capt" ).val() ),
                x = $( "#cta_track_contact" ).val(),
                w = $( "#_wpnonce" ).val(),
                u = !0;
                setCookie( "_wn_", w, 1 );
        if ( console.table( u ), 
        //o.length < 1 ? (e( "#contact_fname" ), u = !1) : a( "#contact_fname" ), 
        isValidEmail( n ) ? a( "#contact_email" ) : (e( "#contact_email" ), u = !1), i.length < 1 ? (e( "#contact_message" ), u = !1) : a( "#contact_message" ), 
        isNaN( m ) || 0 == m ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : m != parseInt( $( "#firstNumber" ).val() ) + parseInt( $( "#secondNumber" ).val() ) ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : $( "#captcha-section" ).removeClass( "error" ), console.table( u ), u ) {
            var v = {
                user_name: o,
                user_email: n,
                user_phone: t,
                user_skype: r,
                user_budget: l,
                user_file_name: c,
                user_new_file_name: s,
                user_agreementa: d,
                user_trends: f,
                user_message: i,
                cta_track:x,
                _wpnonce:w,
                visitor_track:v,
            };
            $.ajax( {
                url: domain + "contactsubmit2.php",
                //url: "http://localhost/appinventiv/live/contactsubmit2.php",
                type: "POST",
                async: !0,
                data: v,
                beforeSend: function () {
                    $( ".formloader-anim" ).css( "display", "block" )
                },
                success: function (response) {
                    $( "#contact_message" ).val( "" );
                    $( "#contact_fname" ).val( "" );
                    $( "#contact_email" ).val( "" );
                    $( "#contact_skype" ).val( "" );
                    $( "#contact_phonemuber" ).val( "" );
                    //console.log(response);
                    if(x == '' && x == undefined) {
                        var z = '';
                    } else { var z = "?ctaID="+x;  }
                    
                    var e = "",
                            a = localStorage.getItem("source");
                    "undefined" != a && (e = "?source=" + a), window.location.href = domain + "thank-you" + z
                },
                error: function ( request, status, error ) {
                    console.log( request );
                    console.log( status );
                    console.log( error );
                    return false;
                }
            } )
        }
    } ), 


    $( "#dt_form_button" ).click( function () {
        
        domain = location.protocol + "//" + location.host + "/";
        var o = $( "#contact_fname" ).val(),
                n = $( "#contact_email" ).val(),
                t = $( "#contact_phonemuber" ).val(),
                l = $( "#contact_skype" ).val(),
                d = $( "#agreementa" ).val(),
                i = $( "#contact_message" ).val(),
                v = localStorage.getItem("VisitorTrack"),
                s = 'hellomail';
                u = !0;                
        
        if ( o.length <= 1 ) {
            $("#contact_fname").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_fname" ).focus(), void(u = !1);
        }

        if ( !isValidEmail( n ) )
        { 
            $("#contact_email").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_email" ).focus(), void(u = !1);
        }        
              
        if ( i.length <= 1 )
            { 
                $("#contact_message").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
                return $( "#contact_message" ).focus(), void(u = !1);
            }
        
        if ( u ) {
            var v = {
                user_name: o,
                user_email: n,
                user_skype : l,
                user_phone: t,
                user_agreementa: d,
                user_message: i,
                mailsource : s
            };
            
            $.ajax( {
                url: domain + "contactsubmit3.php",
                type: "POST",
                async: !0,
                data: v,
                beforeSend: function () {
                    $( "#header_loader" ).css( "display", "block" )
                },
                success: function (response) {
                    $( "#contact_message" ).val( "" );
                    $( "#contact_fname" ).val( "" );
                    $( "#contact_email" ).val( "" );
                    $( "#country_code" ).val( "" );
                    $( "#contact_phonenumber" ).val( "" );
                    var e = "",
                            a = localStorage.getItem("source");
                    "undefined" != a && (e = "?source=" + a), window.location.href = domain + "dt-thank-you"
                },
                fail : function( err ) {
                    console.log('failed' + err);
                }
            } )
        }
    } ), 


    $( "#estimate_form_btn" ).click( function () {
        domain = location.protocol + "//" + location.host + "/";
        var o = $( "#contact_fname" ).val(),
                n = $( "#contact_email" ).val(),
                t = $( "#contact_phonenumber" ).val(),
                l = $( "#country_code" ).val(),
                i = $( "#contact_message" ).val(),
                d= $("input[name='project_device']:checked").val(),
                s = $("input[name='project_scope']:checked").val(),
                u = !0;
                
        /* if ( console.table( u ), o.length < 1 ? (e( "#contact_fname" ), u = !1) : a( "#contact_fname" ), isValidEmail( n ) ? a( "#contact_email" ) : (e( "#contact_email" ), u = !1), i.length < 1 ? (e( "#contact_message" ), u = !1) : a( "#contact_message" ), isNaN( m ) || 0 == m ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : m != parseInt( $( "#firstNumber" ).val() ) + parseInt( $( "#secondNumber" ).val() ) ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : $( "#captcha-section" ).removeClass( "error" ), console.table( u ), u ) { */
        if ( !isValidEmail( n ) )
        { 
            $("#contact_email").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_email" ).focus(), void(u = !1);
        }

        if ( o.length <= 1 ) {
            $("#contact_fname").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_fname" ).focus(), void(u = !1);
            
        }
            
        if ( t.length <= 1 ) {
            $("#contact_phonenumber").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_phonenumber" ).focus(), void(u = !1);
        }
            
        if ( i.length <= 1 )
            { 
                $("#contact_message").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
                return $( "#contact_message" ).focus(), void(u = !1);
            }
        
        if ( u ) {
            var v = {
                user_name: o,
                user_email: n,
                user_country : l,
                user_phone: t,
                user_message: i,
                project_device: d,
                project_scope: s
            };
            console.log(domain);
            $.ajax( {
                url: domain + "contactsubmit3.php",
                type: "POST",
                async: !0,
                data: v,
                beforeSend: function () {
                    $( "#header_loader" ).css( "display", "block" )
                },
                success: function () {
                    $( "#contact_message" ).val( "" );
                    $( "#contact_fname" ).val( "" );
                    $( "#contact_email" ).val( "" );
                    $( "#country_code" ).val( "" );
                    $( "#contact_phonenumber" ).val( "" );
                    var e = "",
                            a = localStorage.getItem("source");
                    "undefined" != a && (e = "?source=" + a), window.location.href = domain + "thank-you"
                }
            } )
        }
    });

    $( "#mobile_dev_submit" ).click( function (e) {
        e.preventDefault();
        domain = location.protocol + "//" + location.host + "/";
        var o = $( "#contact_fname" ).val(),
                n = $( "#contact_email" ).val(),
                t = $( "#contact_phonenumber" ).val(),
                l = $( "#country_code" ).val(),
                i = $( "#contact_message" ).val(),
                w = $( "#_wpnonce" ).val(),
                c = $("#cta_track_landing").val(),
                v = localStorage.getItem("VisitorTrack"),
                u = !0;
                setCookie( "_wn_", w, 1 );
        /* if ( console.table( u ), o.length < 1 ? (e( "#contact_fname" ), u = !1) : a( "#contact_fname" ), isValidEmail( n ) ? a( "#contact_email" ) : (e( "#contact_email" ), u = !1), i.length < 1 ? (e( "#contact_message" ), u = !1) : a( "#contact_message" ), isNaN( m ) || 0 == m ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : m != parseInt( $( "#firstNumber" ).val() ) + parseInt( $( "#secondNumber" ).val() ) ? ($( "#captcha-section" ).addClass( "error" ), u = !1) : $( "#captcha-section" ).removeClass( "error" ), console.table( u ), u ) { */
        

        if ( o.length <= 1 ) {
            $("#contact_fname").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_fname" ).focus(), void(u = !1);
            
        }

        if ( !isValidEmail( n ) )
        { 
            $("#contact_email").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_email" ).focus(), void(u = !1);
        }
            
        if ( t.length <= 1  || t.length > 13 ) {
            $("#contact_phonenumber").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
            return $( "#contact_phonenumber" ).focus(), void(u = !1);
        }
            
        if ( i.length <= 1 )
            { 
                $("#contact_message").css({"border": "2px solid #d73333", "box-shadow": "1px 2px 4px rgba(218, 48, 48, 0.11)", "background": "rgba(255, 5, 5, .04)"});
                return $( "#contact_message" ).focus(), void(u = !1);
            }
        
        if ( u ) {
            var v = {
                user_name: o,
                user_email: n,
                user_country : l,
                user_phone: t,
                user_message: i,
                cta_track:c,
                _wpnonce:w,
                visitor_track:v,
            };
            $.ajax( {
                url: domain + "contactsubmit2.php",
                type: "POST",
                async: !0,
                data: v,
                beforeSend: function () {
                    $( "#header_loader" ).css( "display", "block" )
                },
                success: function () {
                    $( "#contact_message" ).val( "" );
                    $( "#contact_fname" ).val( "" );
                    $( "#contact_email" ).val( "" );
                    $( "#country_code" ).val( "" );
                    $( "#contact_phonenumber" ).val( "" );
                    if(c == '' && c == undefined) {
                        var z = '';
                    } else { var z = "?ctaID="+c;  }

                    var e = "",
                            a = localStorage.getItem("source");
                    "undefined" != a && (e = "?source=" + a), window.location.href = domain + "thank-you" + z
                }
            } )
        }
    }),
    $( "#submit_case_study_form" ).click( function (e) {
        e.preventDefault();
        console.log('case study submit');
        domain = location.protocol + "//" + location.host + "/";
        var e = $( "#case_email" ).val(),
            a = $( "#pageid" ).val(),
            b = $( "#formid" ).val(),
            o = $( "#pagetitle" ).val(),
            w = $( "#wpcf_nonce" ).val(),
            v = localStorage.getItem("VisitorTrack"),
            r = !0;
            setCookie( "_wn_", w, 1 );
            
            if ( e.length <= 1 )
                return $( "#case_email" ).focus(), $( "#case_email" ).css( "border", '1px solid red' ), void(r = !1);
        
            if ( r ) {

            var t = {
                email: e,
                pageid: a,
                formid: b,
                pagetitle: o,
                nonce:w,
                visitor_track:v,
                action : 'submit_case_study'
            };

            console.log(t);
            
            $.ajax( {
                url: ajaxurl,
                type: "POST",
                data: t,
                beforeSend: function ( e ) {
                    //console.log( "loader" ); //return false;
                    // $( "#header_loader" ).css( "display", "block" );
                    $( '.formloader-anim' ).css( 'display', 'block' );
                    $('#formloader-anim').hide();
                },
                success: function ( e ) {
                    console.log(e);
                    var rs = JSON.parse(e);
                    if(rs.status == 200) {
                        $('#case_study_form')[0].reset();
                        $('#cform_msg').css('color', 'green');
                        $('#cform_msg').text(rs.message);                        
                    } else {
                        $('#cform_msg').css('color', 'red');
                        $('#cform_msg').text(rs.message);
                    }
                    $('#case_form_loader').hide();
                    
                },
                error: function ( request, status, error ) {
                    //console( request );
                    console.log( status );
                    console.log( error );
                    return false;
                }
            } )
        }
    } ),

    $( "#ebook_wpcfform_submit" ).click( function (e) {
        e.preventDefault();
        
        //domain = location.protocol + "//" + location.host + "/";
        var e = $( "#emailaddress" ).val(),
            u = $( "#user_name" ).val(),
            c = $( "#CompanyName" ).val(),
            a = $( "#pageid" ).val(),
            b = $( "#formid" ).val(),
            o = $( "#pagetitle" ).val(),
            l = $( "#pagereferer" ).val(),
            w = $( "#wpcf_nonce" ).val(),
            k = $('#wpcf_acceptance').val();
            //v = localStorage.getItem("VisitorTrack"),
            r = !0;
            setCookie( "_wn_", w, 1 );
            
            if ( u.length <= 1 )
                return $( "#user_name" ).focus(), $( "#user_name" ).css( "border", '1px solid red' ), void(r = !1);
            if ( e.length <= 1 ||  !isValidEmail( e ) )
                return $( "#emailaddress" ).focus(), $( "#emailaddress" ).css( "border", '1px solid red' ), void(r = !1);
        
            if ( r ) {

            var t = {
                email: e,
                companyname: c,
                username: u,
                pageid: a,
                formid: b,
                pagetitle: o,
                pagereferer:l,
                nonce:w,
                //visitor_track:v,
                wpcf_acceptance:k,
                action : 'ebook_wpcf7forms_action'
            };

            console.log(t);
            
            $.ajax( {
                url: ajaxurl,
                type: "POST",
                data: t,
                beforeSend: function ( e ) {
                    //console.log( "loader" ); //return false;
                    // $( "#header_loader" ).css( "display", "block" );
                    $( '#case_form_loader' ).css( 'display', 'block' );
                },
                success: function ( e ) {
                    console.log(e);
                    var rs = JSON.parse(e);
                    if(rs.status == 200) {
                        $('#ebook_download_form')[0].reset();
                        $('#ebookform_msg').css('color', 'green');
                        $('#ebookform_msg').text(rs.message);                        
                    } else {
                        $('#ebookform_msg').css('color', 'red');
                        $('#ebookform_msg').text(rs.message);
                    }
                    $('#case_form_loader').hide();
                    
                },
                error: function ( request, status, error ) {
                    //console( request );
                    console.log( status );
                    console.log( error );
                    return false;
                }
            } )
        }
    } )
    ;


    var e = function ( e ) {
        $( e ).parent().addClass( "error" )
    },
            a = function ( e ) {
                $( e ).parent().removeClass( "error" ), $( e ).parent().addClass( "active" )
            }
} );

