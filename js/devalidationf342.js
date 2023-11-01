if ("localhost" == location.hostname) var domain = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/aisite/";
else domain = location.protocol + "//" + location.host + (location.port ? ":" + location.port : "") + "/";
var $ = $.noConflict();

function errortemplate(e, a, r) {
    $("#" + a).html('<div class="alert alert-danger custom-error">' + r + "</div>"), $("#" + a).slideDown(), "" != e && $("#" + e).focus(), setTimeout(function() {
        $("#" + a).hide()
    }, 15e3)
}

function errortemplatenew(e, a, r) {
    $("#" + a).addClass("error"), $("#" + e).focus()
}

function isValidURL(e) {
    return !!/^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/.test(e)
}

function isValidEmail(e) {
    return !!/^((([a-zA-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-zA-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-zA-Z]|[0-9])([a-zA-Z]|[0-9]|\-){0,61}([a-zA-Z]|[0-9])\.))*([a-zA-Z]|[0-9])([a-zA-Z]|[0-9]|\-){0,61}([a-zA-Z]|[0-9])\.)[\w]{2,10}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})\])))$/.test(e)
}

function validateEmail(e) {
    return !!/^((([a-zA-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-zA-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-zA-Z]|[0-9])([a-zA-Z]|[0-9]|\-){0,61}([a-zA-Z]|[0-9])\.))*([a-zA-Z]|[0-9])([a-zA-Z]|[0-9]|\-){0,61}([a-zA-Z]|[0-9])\.)[\w]{2,10}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})\])))$/.test(e)
}

function checkphonenumber(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 187, 189, 16, 17]) || 65 == e.keyCode && !0 === e.ctrlKey || 86 == e.keyCode && !0 === e.ctrlKey || 67 == e.keyCode && !0 === e.ctrlKey || 88 == e.keyCode && !0 === e.ctrlKey || e.keyCode >= 35 && e.keyCode <= 39 || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault()
}

function getRandomInt(e, a) {
    return Math.floor(Math.random() * (a - e + 1)) + e
}
$(document).ready(function() {
    function e(e) {
        $("#" + e).css("border-bottom", "1px solid #d50000")
    }

    function a(e) {
        $("#" + e).css("border-bottom", "1px solid #9c9c9c")
    }

    function r(e) {
        $("#" + e).css("border", "2px solid #d41d1d")
    }

    function t(e) {
        $("#" + e).css("border", "2px solid #dbdbdb")
    }
    $("#HealthFormSubmitBtn").click(function() {
        var r = $("#source").val();
        "undefined" === (r = "?source=" + r) && (r = "");
        var t = !0;
        a("health_name"), a("health_email"), a("health_no"), a("health_desc"), $.trim($("#health_name").val()) || (e("health_name"), t = !1), $.trim($("#health_email").val()) || (e("health_email"), t = !1), "" != $("#health_email").val() && (isValidEmail($("#health_email").val()) || (e("health_email"), t = !1)), "" != $("#health_no").val() && isNaN($("#health_no").val()) && (e("health_no"), t = !1), $.trim($("#health_desc").val()) || (e("health_desc"), t = !1), t && void 0 !== $("input[name=health_name]").val() && $.ajax({
            url: domain + "contactsubmit1",
            type: "POST",
            async: !0,
            data: {
                user_name: $("input[name=health_name]").val(),
                user_email: $("input[name=health_email]").val(),
                user_phone: $("input[name=health_no]").val(),
                user_skype: $("input[name=health_skype]").val(),
                user_message: $("textarea[name=health_desc]").val()
            },
            beforeSend: function() {
                $("#helthContact .contact-loading").fadeIn()
            },
            success: function(e) {
                console.log(e), "send" == e ? ($("#health_name").val(""), $("#health_email").val(""), $("#health_no").val(""), $("#health_skype").val(""), $("#health_desc").val(""), a("health_name"), a("health_email"), a("health_no"), a("health_desc"), $("#home-getestimatepop .contact-loading").fadeOut(), window.location.href = domain + "thank-you" + r) : ($("#errorWrapper .errorText").text("There is some problem try after some time."), $("#errorWrapper .errorText").fadeIn(), setInterval(function() {
                    $("#errorWrapper .errorText").fadeOut(0), $("#errorWrapper .errorText").text("")
                }, 1e4))
            }
        })
    }), $("#GetAnEstimate").click(function() {
        var e = $("#source").val();
        e = "undefined" === e ? "" : "?source=" + e, proceed = !0, t("enstimate_name"), t("enstimate_email"), t("enstimate_contact"), t("enstimate_skye"), t("enstimate_budget"), t("enstimate_desc"), $.trim($("#enstimate_name").val()) || (r("enstimate_name"), proceed = !1), $.trim($("#enstimate_email").val()) || (r("enstimate_email"), proceed = !1), "" != $("#enstimate_email").val() && (isValidEmail($("#enstimate_email").val()) || (r("enstimate_email"), proceed = !1)), "" != $("#enstimate_contact").val() && isNaN($("#enstimate_contact").val()) && (r("enstimate_contact"), proceed = !1), $.trim($("#enstimate_desc").val()) || (r("enstimate_desc"), proceed = !1), proceed && void 0 !== $("input[name=enstimate_name]").val() && $.ajax({
            url: domain + "contactsubmit2",
            type: "POST",
            async: !0,
            data: {
                user_name: $("input[name=enstimate_name]").val(),
                user_email: $("input[name=enstimate_email]").val(),
                user_phone: $("input[name=enstimate_contact]").val(),
                user_skype: $("input[name=enstimate_skye]").val(),
                user_budget: $("select[name=enstimate_budget]").val(),
                user_message: $("textarea[name=enstimate_desc]").val()
            },
            beforeSend: function() {
                $(".estimate-form .contact-loading").fadeIn()
            },
            success: function(a) {
                "send" == a ? ($("#enstimate_name").val(""), $("#enstimate_email").val(""), $("#enstimate_contact").val(""), $("#enstimate_skye").val(""), $("#enstimate_desc").val(""), t("enstimate_name"), t("enstimate_email"), t("enstimate_contact"), t("enstimate_skye"), t("enstimate_budget"), t("enstimate_desc"), window.location.href = domain + "thank-you" + e) : ($("#errorText").text("There is some problem try after some time."), $("#errorText").fadeIn(), setInterval(function() {
                    $("#errorText").fadeOut(0), $("#errorText").text("")
                }, 1e4))
            }
        })
    }), $("#popup_formsubmitbtn").click(function() {
        var e = $("#source").val();
        "undefined" === (e = "?source=" + e) && (e = "");
        var a = !0;
        return $("#error_name").removeClass("error"), $("#error_email").removeClass("error"), $("#error_phone").removeClass("error"), $("#error_skype").removeClass("error"), $("#error_message").removeClass("error"), $.trim($("#popup_name").val()) ? $.trim($("#popup_email").val()) && ("" == $("#popup_email").val() || isValidEmail($("#popup_email").val())) ? $.trim($("#popup_message").val()) ? void(a && void 0 !== $("input[name=popup_name]").val() && ($("input[name=popup_name]").val(), $.ajax({
            url: domain + "contactsubmit1",
            type: "POST",
            async: !0,
            data: {
                user_name: $("input[name=popup_name]").val(),
                user_email: $("input[name=popup_email]").val(),
                user_phone: $("input[name=popup_phone]").val(),
                user_skype: $("input[name=popup_skype]").val(),
                user_message: $("textarea[name=popup_message]").val()
            },
            beforeSend: function() {
                $("#home-getestimatepop #header_loader").fadeIn()
            },
            success: function(a) {
                console.log(a), "send" == a ? ($("#popup_name").val(""), $("#popup_email").val(""), $("#popup_phone").val(""), $("#popup_skype").val(""), $("#popup_message").val(""), $("#error_name").removeClass("error"), $("#error_email").removeClass("error"), $("#error_phone").removeClass("error"), $("#error_skype").removeClass("error"), $("#error_message").removeClass("error"), $("#home-getestimatepop  #header_loader").fadeOut(), window.location.href = domain + "thank-you" + e) : ($("#errorWrapper .errorText").text("There is some problem try after some time."), $("#errorWrapper .errorText").fadeIn(), setInterval(function() {
                    $("#errorWrapper .errorText").fadeOut(0), $("#errorWrapper .errorText").text("")
                }, 1e4))
            }
        }))) : (errortemplatenew("popup_message", "error_message", ""), a = !1, !1) : (errortemplatenew("popup_email", "error_email", ""), a = !1, !1) : (errortemplatenew("popup_name", "error_name", ""), a = !1, !1)
    }), $("#formsubmitbtn").click(function() {
        var e = $("#source").val();
        "undefined" === (e = "?source=" + e) && (e = "");
        var a = !0;
        return $("#nameErr").removeClass("error"), $("#emailErr").removeClass("error"), $("#phoneErr").removeClass("error"), $("#skypeErr").removeClass("error"), $("#messageErr").removeClass("error"), $.trim($("#name").val()) ? $.trim($("#email").val()) && ("" == $("#email").val() || isValidEmail($("#email").val())) ? $.trim($("#message").val()) ? void(a && void 0 !== $("input[name=name]").val() && ($("input[name=name]").val(), $("#normalfrm .contact-loading").show(), $.ajax({
            url: domain + "contactsubmit1",
            type: "POST",
            async: !0,
            data: {
                user_name: $("input[name=name]").val(),
                user_email: $("input[name=email]").val(),
                user_phone: $("input[name=phone]").val(),
                user_skype: $("input[name=skype]").val(),
                user_message: $("textarea[name=message]").val()
            },
            beforeSend: function() {
                $("#normalfrm .contact-loading").show()
            },
            success: function(a) {
                "send" == a ? ($("#name").val(""), $("#email").val(""), $("#phone").val(""), $("#skype").val(""), $("#message").val(""), $("#nameErr").removeClass("error"), $("#emailErr").removeClass("error"), $("#phoneErr").removeClass("error"), $("#skypeErr").removeClass("error"), $("#messageErr").removeClass("error"), $("#normalfrm .contact-loading").fadeOut(), window.location.href = domain + "thank-you" + e) : ($("#errorText").text("There is some problem try after some time."), $("#errorText").fadeIn(), setInterval(function() {
                    $("#errorText").fadeOut(0), $("#errorText").text("")
                }, 1e4))
            }
        }))) : (errortemplatenew("message", "messageErr", ""), a = !1, !1) : (errortemplatenew("email", "emailErr", ""), a = !1, !1) : (errortemplatenew("name", "nameErr", ""), a = !1, !1)
    })
});
var random_number1 = getRandomInt(1, 5),
    random_number2 = getRandomInt(1, 5);

function refreshCaptcha() {
    random_number1 = getRandomInt(1, 5), random_number2 = getRandomInt(1, 5), $("#firstNumber").val(random_number1), $("#secondNumber").val(random_number2);
    var e = random_number1 + " + " + random_number2 + " = ";
    $(".captcha-num").text(e)
}

function callme(e) {
    var a = $(e).prop("files")[0],
        r = new FormData;
    r.append("file", a), $("#fileerror").hide(), $("#browseFlErr").removeClass("error"), $(".files-upload-lodingbar").show(), $.ajax({
        url: domain + "uploadfile",
        dataType: "text",
        cache: !1,
        contentType: !1,
        processData: !1,
        data: r,
        type: "post",
        success: function(e) {
            console.log(e), $(".files-upload-lodingbar").hide();
            var a = JSON.parse(e);
            if (console.log(a), a.new_file_name && 200 == a.code && ($("#new_file_name").val(a.new_file_name), $("#file_name").val(a.name), $(".atcfname").text(a.name).addClass("activeff"), $("#display_file_name").val(a.name), $("#browseFlErr").removeClass("error")), "" != a.error && 400 == a.code) return $("#browseFlErr").addClass("error"), !1
        }
    })
}
refreshCaptcha(), $("#formsubmitbtncontactpage").click(function() {
    var e = $("#source").val();
    "undefined" === (e = "?source=" + e) && (e = "");
    var a = !0;
    return $("#mainnameErr").removeClass("error"), $("#mainemailErr").removeClass("error"), $("#mainphoneErr").removeClass("error"), $("#mainskypeErr").removeClass("error"), $("#mainmessageErr").removeClass("error"), $("#budgetErr").removeClass("error"), $("#appatflErr").removeClass("error"), $.trim($("#mainname").val()) ? $.trim($("#mainemail").val()) && ("" == $("#mainemail").val() || isValidEmail($("#mainemail").val())) ? $.trim($("#mainmessage").val()) ? $.trim($("#capt").val()) ? 0 == parseInt($("#capt").val()) ? (errortemplatenew("capt", "capt", ""), a = !1, !1) : $.trim($("#capt").val()) > 0 && parseInt($("#firstNumber").val()) + parseInt($("#secondNumber").val()) != parseInt($.trim($("#capt").val())) ? (errortemplatenew("capt", "capt", ""), a = !1, !1) : (console.log(a), void(a && void 0 !== $("input[name=name]").val() && ($("input[name=name]").val(), $.ajax({
        url: domain + "contactsubmit2",
        type: "POST",
        async: !0,
        data: {
            user_name: $("input[name=name]").val(),
            user_email: $("input[name=email]").val(),
            user_phone: $("input[name=phone]").val(),
            user_skype: $("input[name=skype]").val(),
            user_budget: $("select[name=budget]").val(),
            user_file_name: $("input[name=file_name]").val(),
            user_new_file_name: $("input[name=new_file_name]").val(),
            user_agreementa: $("input[name=agreementa]").val(),
            user_message: $("textarea[name=message]").val()
        },
        beforeSend: function() {
            $("#maincontactform .contact-loading").fadeIn()
        },
        success: function(a) {
            "send" == a ? ($("#mainname").val(""), $("#mainemail").val(""), $("#mainphone").val(""), $("#mainskype").val(""), $("#mainmessage").val(""), $("#budget").val(""), $("#file_name").val(""), $("#new_file_name").val(""), $("#mainnameErr").removeClass("error"), $("#mainemailErr").removeClass("error"), $("#mainphoneErr").removeClass("error"), $("#mainskypeErr").removeClass("error"), $("#mainmessageErr").removeClass("error"), $("#countryErr").removeClass("error"), $("#budgetErr").removeClass("error"), $("#appatflErr").removeClass("error"), $("#maincontactform .contact-loading").fadeOut(), window.location.href = domain + "thank-you" + e) : ($("#errorText").text("There is some problem try after some time."), $("#errorText").fadeIn(), setInterval(function() {
                $("#errorText").fadeOut(0), $("#errorText").text("")
            }, 1e4))
        }
    })))) : (errortemplatenew("capt", "capt", ""), a = !1, !1) : (errortemplatenew("mainmessage", "mainmessageErr", ""), a = !1, !1) : (errortemplatenew("mainemail", "mainemailErr", ""), a = !1, !1) : (errortemplatenew("mainname", "mainnameErr", ""), a = !1, !1)
}), $("#formsubmitbtncontactpageamp").click(function() {
    console.log("sdf");
    var e = !0;
    return $("#mainnameErr").removeClass("error"), $("#mainemailErr").removeClass("error"), $("#mainphoneErr").removeClass("error"), $("#mainskypeErr").removeClass("error"), $("#mainmessageErr").removeClass("error"), $("#countryErr").removeClass("error"), $("#budgetErr").removeClass("error"), $.trim($("#mainname").val()) ? $.trim($("#mainemail").val()) && ("" == $("#mainemail").val() || isValidEmail($("#mainemail").val())) ? $.trim($("#mainmessage").val()) ? $.trim($("#capt").val()) ? 0 == parseInt($("#capt").val()) ? (errortemplatenew("capt", "capt", ""), e = !1, !1) : $.trim($("#capt").val()) > 0 && parseInt($("#firstNumber").val()) + parseInt($("#secondNumber").val()) != parseInt($.trim($("#capt").val())) ? (errortemplatenew("capt", "capt", ""), e = !1, !1) : (alert(e), void(e && void 0 !== $("input[name=name]").val() && ($("input[name=name]").val(), $.ajax({
        url: domain + "contactsubmit2",
        type: "POST",
        async: !0,
        data: {
            user_name: $("input[name=name]").val(),
            user_email: $("input[name=email]").val(),
            user_phone: $("input[name=phone]").val(),
            user_skype: $("input[name=skype]").val(),
            user_country: $("input[name=Country]").val(),
            user_budget: $("input[name=budget]").val(),
            user_file_name: $("input[name=file_name]").val(),
            user_new_file_name: $("input[name=new_file_name]").val(),
            user_agreementa: $("input[name=agreementa]").val(),
            user_message: $("textarea[name=message]").val()
        },
        beforeSend: function() {
            $(".contact-loading").fadeIn()
        },
        success: function(e) {
            "send" == e ? ($("#mainname").val(""), $("#mainemail").val(""), $("#mainphone").val(""), $("#mainskype").val(""), $("#mainmessage").val(""), $("#budget").val(""), $("#country").val(""), $("#file_name").val(""), $("#new_file_name").val(""), $("#mainnameErr").removeClass("error"), $("#mainemailErr").removeClass("error"), $("#mainphoneErr").removeClass("error"), $("#mainskypeErr").removeClass("error"), $("#mainmessageErr").removeClass("error"), $("#countryErr").removeClass("error"), $("#budgetErr").removeClass("error"), $("#appatflErr").removeClass("error"), $(".contact-loading").fadeOut(), window.location.href = domain + "amp/thank-you") : ($("#errorText").text("There is some problem try after some time."), $("#errorText").fadeIn(), setInterval(function() {
                $("#errorText").fadeOut(0), $("#errorText").text("")
            }, 1e4))
        }
    })))) : (errortemplatenew("capt", "capt", ""), e = !1, !1) : (errortemplatenew("mainmessage", "mainmessageErr", ""), e = !1, !1) : (errortemplatenew("mainemail", "mainemailErr", ""), e = !1, !1) : (errortemplatenew("mainname", "mainnameErr", ""), e = !1, !1)
}), $("#mainformsubmitbtn").click(function() {
    var e = !0;
    if ($("#error_name").removeClass("error"), $("#error_email").removeClass("error"), $("#error_message").removeClass("error"), $("#error_captchaResult").removeClass("error"), !$.trim($("#name").val())) return $("#error_name").addClass("error"), $("#name").focus(), e = !1, !1;
    if ("" === $("#email").val() || !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($.trim($("#email").val()))) return $("#error_email").addClass("error"), $("#email").focus(), e = !1, !1;
    if (!$.trim($("#message").val())) return $("#error_message").addClass("error"), $("#message").focus(), e = !1, !1;
    if (!1 === e) return $(".errorWrapper").fadeOut(4e3), !1;
    var a = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".txt", ".doc", ".docx", ".xls", ".xlsx", ".pdf"],
        r = $(".contact-form-wrapper input[type=file]").val();
    if (void 0 !== r && r.length > 0) {
        for (var t = !1, n = 0; n < a.length; n++) {
            var o = a[n];
            if (r.substr(r.length - o.length, o.length).toLowerCase() == o.toLowerCase()) {
                t = !0;
                break
            }
        }
        if (!t) return e = !1, $(this).addClass("inperror"), $(".errorWrapper").css("display", ""), $(".errorText").text("Please upload a valid file."), $(".errorWrapper").fadeOut(4e3), !1
    }
    var m = $("input[name=captchaResult]").val(),
        s = $("input[name=firstNumber]").val(),
        l = $("input[name=secondNumber]").val(),
        i = parseInt(s) + parseInt(l);
    if (parseInt(m) != parseInt(i)) return e = !1, $(this).addClass("inperror"), $("#error_captchaResult").addClass("error"), $("#captchaResult").focus(), !1;
    e && (void 0 !== $("input[name=name]").val() && $("input[name=name]").val(), $(".thanks-wrapper").fadeIn(), $(".overlay-mp").addClass("thanks-overlay").fadeIn(), $.ajax({
        url: "contactussubmit.php",
        type: "POST",
        async: !0,
        data: {
            user_name: $("input[name=name]").val(),
            user_email: $("input[name=email]").val(),
            user_phone: $("input[name=phone]").val(),
            user_skype: $("input[name=skype]").val(),
            user_budget: $("select[name=searchtype]").val(),
            user_message: $("textarea[name=message]").val(),
            file_name: $("input[name=new_file_name]").val(),
            new_file_name: $("input[name=file_name]").val(),
            is_nda: $("#agreementa:checked").val()
        },
        cache: !1,
        beforeSend: function() {
            $(".contact-loading").fadeIn()
        },
        success: function(e) {
            "send" == e ? ($(".atcfname").text("Attach File"), $("#agreementa").attr("checked", !1), $("#name").val(""), $("#email").val(""), $("#phone").val(""), $("#skype").val(""), $("#message").val("").removeClass("error"), $("#file_name").val(""), $("#searchType").val(""), $("#new_file_name").val(""), $("#display_file_name").val(""), $("#captchaResult").val(""), $("#error_name").removeClass("error"), $("#error_email").removeClass("error"), $("#error_message").removeClass("error"), $("#error_captchaResult").removeClass("error"), $("#searchtype").selectpicker("refresh"), $(".error").each(function() {
                $(this).removeClass("error")
            }), refreshCaptcha(), $(".thanks-wrapper").fadeIn(), $(".overlay-mp").addClass("thanks-overlay").fadeIn(), $(".contact-loading").fadeOut(), setInterval(function() {
                $(".thanks-wrapper").fadeOut(0), $(".overlay-mp").fadeOut(0).removeClass("thanks-overlay"), contswt = !1, $(".grab-nav").removeClass("active"), TweenLite.to(".grab-contact-form", 1, {
                    ease: Expo.easeInOut,
                    height: "0",
                    opacity: "0"
                })
            }, 1e4)) : ($(".errorText").text("There is some problem try after some time."), $(".errorWrapper").css("display", ""))
        }
    }))
});
