jQuery(document).ready(function ($) {




    //date time picker
    $(function () {
        $("#dob").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: 'c-100:c+100'

        });
    });
    //refreshCaptcha();
    var flag = $("#searchflag").val();
    if (flag == "false") {
        $(".hideRow").show();
    }
    else {
        $(".hideRow").hide();
        $("#btnLogin").prop('disabled', true);
    }
    $(function () {

        $("#dob").change(function () {

            verifyAnswerDob();
        });
    });

    //verifyAnswerDob();
});

$(function () {

    $("#txtid").blur(function () {

        VrifyLoginID();
    });
});
//$(function () {

//    $("#answer").blur(function () {

//        //        $("#dob").attr("readonly", false);
//        $("#dob").val("");
//        $("#verifyuseridMsg1").html("");
//    });
//});



//$(function () {

//    $("#btnDOB").click(function () {
//       
//        verifyAnswerDob();
//    });
//});

//**********************************this function is use to answer & DOB verify******************************************************//

function verifyAnswerDob() {

    var loginId = $('#txtid').val();
    var useranswer = $('#answer').val();
    var dob = $('#dob').val();
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";

    if (loginId == "") {
        $("#verifyuseridMsg1").html("");
    }
    else {

        $.ajax({
            url: hosturl + "/LogIn/getVerifyAnswerDOB/",
            type: "POST",
            //headers: {
            //    'Authorization': 'Bearer ' + token // Make sure token is properly defined
            //},
            data: { Userid: loginId, Useranswer: useranswer, Userdob: dob },
            dataType: "json",
            success: function (count) {    //controller return value
               
                if (count == 0) {
                    $(".msg").html("Incorrect Answer or Date of Birth.");
                  
                   
                   
                    $("#btnLogin").prop('disabled', true);
                }
                else {
                    $(".msg").html("");
                  
                  
                    $("#btnLogin").prop('disabled', false);
                }
            }

        })
    }
}




//this function get entered user id and check user does not match...
function VrifyLoginID() {

    $("#txtquestion").val("");
    var data = $("#txtid").val();
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    if (data == "") {
        $("#verifyuseridMsg").html("Enter User Id");
    }
    else {

        $.ajax({

            url: hosturl + "/Login/getVerifyLoginID/",
            type: "POST",
            //headers: {
            //    'Authorization': 'Bearer ' + token // Make sure token is properly defined
            //},
            data: { Userid: data },
            dataType: "json",
            success: function (count) {    //controller return value

                if (count == "invalidUser") {
                    //                    alert("User ID is not exists");
                    $("#verifyuseridMsg").html("User ID is not exists");

                }
                else {
                    $("#txtquestion").val(count);
                    $("#verifyuseridMsg").html("");

                }
            }

        });

    }
}


//******************************************************************************************************************************************************************

function refreshCaptcha() {

    $("#myimg").attr('src', $("#myimg").attr('src') + '?' + Math.random());
    $("#CaptchaText").val("");
}

//verify user
$(function () {

    $("#btnSubmit2").click(function () {

        EncryptMD5Login();

       // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
        var loginId = $('#txtlogid').val();
        var passWrd = $('#txtpasslogin').val();
        var captch = $('#CaptchaText').val();



        if (loginId == "") {
            $(".emsg").html("Error:");
            $(".msg").html("Enter loginID");
            refreshCaptcha();
            return false;
        }
        else if (passWrd == "") {
            $(".emsg").html("Error:");
            $(".msg").html("Enter password");
            refreshCaptcha();
            return false;
        }
        else if (captch == "") {
            $(".emsg").html("Error:");
            $(".msg").html("Enter captcha");
            refreshCaptcha();
            return false;
        }
        else {

            $.ajax({

                url: hosturl + "/LogIn/verifyUser/",

                type: "POST", //[httppost]
                //headers: {
                //    'Authorization': 'Bearer ' + token // Make sure token is properly defined
                //},

                data: { loginId: loginId, password: passWrd, captch: captch }, //return param

                dataType: "json", // data trnsfer in readable format

                success: function (result) {    //controller return value

                    var r = result[0];

                    //var logenArr = ret.split(" ");
                    // var r = logenArr[0];
                    //var logEn = logenArr[1];

                    if (r == "t") {

                        window.location.href = hosturl + '/BasicSearch/BasicSearch/';

                    }
                    else if (r == "c") {

                        $(".emsg").html("");
                        $(".msg").html("Incorrect captcha");
                        refreshCaptcha();
                    }
                    else {

                        $(".emsg").html("");
                        $(".msg").html("Incorrect user Id/Password ");
                        refreshCaptcha();
                        return false;
                    }
                }

            })
        }

    });
});

//forgetPassword

$(function () {

    $("#btnCancel").click(function () {
        window.location.reload(true);
    })
})
//submit forgotpassword
$(function () {

    $("#btnSubmit").click(function () {
        
        var abcd = 121;
       // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
        var dob = $('#dob').val();
        var passWrd = $('#txtpass').val();
        var captch = $('#txtcaptcha').val();
        var quetion = $('#ddlquestion').val();
        var answer = $('#answer').val();
        var uerid = $('#txtid').val();
        var pattern = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
        //verifyAnswerDob();

        //var msg = $("#verifyuseridMsg1").html();


        if (uerid == "") {
            $(".msg").html("Enter Login ID");
            refreshCaptcha();
            $('#txtcaptcha').val("");
            return false;
        }

        else if (answer == "") {

            $(".msg").html("Enter Answer");
            refreshCaptcha();
            $('#txtcaptcha').val("");
            return false;
        }
        else if (dob == "") {

            $(".msg").html("Select your date of birth");
            refreshCaptcha();
            $('#txtcaptcha').val("");
            return false;
        }

        //else if (answer != "" && dob != "") {
           
        //    
        //   var value= verifyAnswerDob1();

        //   
        //}
       
        else if (passWrd == "") {

            $(".msg").html("Enter password");
            refreshCaptcha();
            $('#txtcaptcha').val("");
            return false;
        }
        else if (captch == "") {

            $(".msg").html("Enter captcha");
            refreshCaptcha();
            $('#txtcaptcha').val("");
            return false;
        }

        else {
            
            $.ajax({

                url: hosturl + "/LogIn/verifyForgotpass/",

                type: "POST", //[httppost]
                //headers: {
                //    'Authorization': 'Bearer ' + token // Make sure token is properly defined
                //},

                data: { Userid: uerid, Userpassword: passWrd, Userdob: dob, Usercaptcha: captch, Userquestion: quetion, Useranswer: answer }, //return param

                dataType: "json", // data trnsfer in readable format

                success: function (result) {
                    
                    //controller return value
                    if (result == "Password Changed Successfully") {

                        $(".msg").html("Password Change Sucessfully!");
                        refreshCaptcha();
                        $('#txtcaptcha').val("");
                    }
                    else {
                        $(".msg").html(result);
                        refreshCaptcha();
                        $('#txtcaptcha').val("");

                    }

                }

            })
        }

    });
});

//this event show selected date in dd/mm/yyyy format to user in label
$(function () {
    $('#dob').change(function () {

        var date = $("#dob").val();
        var arr = date.split('-');
        $("#dateLabel").html("Your Selected date is:" + arr[2] + "/" + arr[1] + "/" + arr[0]);


    })
})
//this event encrypt the password..
$(function () {

    $('#txtpass').blur(function () {
        var Pass = $("#txtpass").val();
        
        if (Pass == "") {
            $(".msg").html("Enter New Password");
        }
        else {
            EncryptMD5();
        }
    })
})

$(function () {
    $('#txtpasslogin').blur(function () {


        // EncryptMD5Login();

    })
})
//this function encrypt the login password..
function EncryptMD5Login() {

    var salt = $("#hdnsalt").val();
    var Pass = $("#txtpasslogin").val();
    var MD5Hash = SHA1(hex_md5(Pass));

    MD5Hash = hex_md5(salt + MD5Hash);
    $("#txtpasslogin").val(MD5Hash);
    $(".msg").html("");

}
//this function encrypt the user password..
function EncryptMD5() {

    
    var Pass = $("#txtpass").val();
    if (Pass.length > 5) {
        if (Pass.length < 16) {
            if ((Pass.match(/[a-z]/)) && (Pass.match(/[A-Z]/))) {
                if (Pass.match(/\d+/)) {
                    if (Pass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
                        var MD5Hash = SHA1(hex_md5(Pass));
                        //$.md5(Pass);

                        //alert(MD5Hash);
                        $("#txtpass").val(MD5Hash);
                        $(".msg").html("");
                    }
                    else {
                        $(".msg").html("Incorrect password format");
                        $('#txtpass').val("");
                    }
                }
                else {
                    $(".msg").html("Incorrect password format");
                    $('#txtpass').val("");
                }
            } else {
                $(".msg").html("Incorrect password format");
                $('#txtpass').val("");
            }
        } else {
            $(".msg").html("Incorrect password format");
            $('#txtpass').val("");
        }
    } else {
        $(".msg").html("Incorrect password format");
        $('#txtpass').val("");
    }
}


