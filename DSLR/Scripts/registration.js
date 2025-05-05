jQuery(document).ready(function ($) {



    //date time picker
    $(function () {
        $("#dob").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: 'c-100:c+0'

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
        $("#dob").datepicker();
    });

    getquestionValues();


   
    $(function () {
        $("#ddlnationality").change(function () {


            var nationality = $("#ddlnationality option:selected").text();
            if (nationality == "Other") {

                $(".hidepincodearea").hide();
                $(".hide_city_dist_state").hide();

                $('#pincode').val('0');

                $('#district').val('-');
                $('#state').val('-');
                $("#pincode").prop('disabled', true);
                $("#city").prop('disabled', true);
                $("#district").prop('disabled', true);
                $("#state").prop('disabled', true);
              //  document.getElementById('pincode').setAttribute("value", "0");
                document.getElementById("city").value = "-";
                //document.getElementById('district').setAttribute("value", "-");
                //document.getElementById('state').setAttribute("value", "-");

            }
            else {
                $(".hidepincodearea").show();
                $(".hide_city_dist_state").show();

                $('#pincode').val('');

                $('#district').val('');
                $('#state').val('');
                document.getElementById("city").value = "";
                $("#pincode").prop('disabled', false);
                $("#city").prop('disabled', false);

                $("#district").prop('disabled', false);
                $("#state").prop('disabled', false);
            }
        });
    });

});





function getquestionValues() {

    $(".loader").show();

    //var url = $("#ajaxUrl").val();
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    $.ajax({

        url: hosturl + "/Registration/getquestionValues/",

        contentType: "Registration/json; charset=utf-8",
        type: "POST",
        dataType: "json",

        success: function (result) {

            $.each(result, function (index, value) {

                $("#ddlquestion").append($("<option></option>").val(value.qid).html(value.Userquestion));

            });
            $(".loader").hide();

        }

    })
}



// ************************** validation on Submit event *******************************

$(function () {

    $("#btnCancel").click(function () {
        window.location.reload(true);
    })
})


$(function () {
    $("#btnSubmit").click(function () {


        //$(".hideRow").show();
        var userfName = $("#firstName").val();
        var usermName = $("#middleName").val();
        var userlName = $("#lastName").val();
        var gender = $("#gender option:selected").text();
        var nationality = $("#ddlnationality option:selected").text();
        var mobileNo = $("#mobileNo").val();
        var occupation = $("#occupation option:selected").text();
        var dateofbirth = $("#dob").val();
        var emailid = $("#email").val();
        var adharNo = $("#adharNo").val();
        var flatno = $("#flatno").val();
        var floorno = $("#floorno").val();
        var bldgname = $("#BuildingNm").val();
        var location = $("#Location").val();
        var street = $("#Street").val();
        var pincode = $("#pincode").val();
        var city = $("#city option:selected").text();
        var district = $("#district").val();
        var state = $("#state").val();
        var userid = $("#userid").val();
        var password = $("#pwd").val();
        var captcha = $("#CaptchaText").val();
        var ddlquestion = $("#ddlquestion option:selected").text();
        var answer = $("#answer").val();

        var flag;
        //var captchaSession = $('#captchaSession1').val();
        //var captchaSession = '<%= Session["CaptchaImageText"] %>';

        //************************************* field validation *************************************
        var userErrorMsg = $(".errorMessage").val();
        var filter = /^[0-9-+]+$/;
        var regexp = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        //var pattern = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
        var pattern = /^([a-zA-Z]){0}([0-9]){12}([a-zA-Z]){0}?$/;
       // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";

        if (userfName == "") {
            $(".errorMessage").html("Please enter your first name");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
            ////else if (usermName == "") {
            ////    $(".errorMessage").html("Please enter your middle name");
            ////    refreshCaptcha();
            ////    //$(".mandatoryfield1").html("Correct field value and enter captcha!");
            ////    return false;
            ////}
        else if (userlName == "") {
            $(".errorMessage").html("Please enter your last name");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (gender == "---Select gender---" || gender == "---लिंग:---") {
            $(".errorMessage").html("Please select Gender");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }

        else if (nationality == "") {
            $(".errorMessage").html("Please select your nationality");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }


        else if (mobileNo == "" || mobileNo.length <= 4) {
            $(".errorMessage").html("Please enter valid mobile number");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }



        else if (occupation == "---Select Occupation---" || occupation == "---व्यवसाय निवडा---") {
            $(".errorMessage").html("Please enter your occupation");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (dateofbirth == "dd/mm/yyyy" || dateofbirth == "") {
            $(".errorMessage").html("Please enter your date of birth");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }

        else if (emailid == "" || !regexp.test(emailid)) {
            $(".errorMessage").html("Please enter valid email id");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }

            //        else if (adharNo == "" || !pattern.test(adharNo)) {
            //            $(".errorMessage").html("Please enter Adhar number");
            //            refreshCaptcha();
            //            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            //            return false;
            //        }





        else if (flatno == "") {
            $(".errorMessage").html("Please enter flat no");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (floorno == "") {
            $(".errorMessage").html("Please enter floor no");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (bldgname == "") {
            $(".errorMessage").html("Please enter Building Name");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }

        else if (location == "") {
            $(".errorMessage").html("Please enter your location");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (street == "") {
            $(".errorMessage").html("Please enter your street/Road");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (pincode == "") {
            $(".errorMessage").html("Please enter your pincode");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (city == "---City Area---") {
            $(".errorMessage").html("Please select your city/area");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (district == "") {
            $(".errorMessage").html("Please enter your district");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (state == "") {
            $(".errorMessage").html("Please enter your State");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (userid == "") {
            $(".errorMessage").html("Please enter Login Id");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (password == "") {
            $(".errorMessage").html("Please enter Password");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (ddlquestion == "Select Secret Question" || ddlquestion == "गुप्त प्रश्न निवडा") {
            $(".errorMessage").html("Please Select Questions");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (answer == "") {
            $(".errorMessage").html("Please enter your Answer");
            refreshCaptcha();
            $(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else if (captcha == "") {
            $(".mandatoryfield1").html("");
            refreshCaptcha();
            $(".errorMessage").html("Please enter captcha");
            //$(".mandatoryfield1").html("Correct field value and enter captcha!");
            return false;
        }
        else {




           // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
            $.ajax({

                url: hosturl + "/Registration/UserRegistration/",

                type: "POST", //[httppost]

                data: { UserfirstName: userfName, Usercaptcha: captcha, Usermiddlename: usermName, Userlastname: userlName, Usergender: gender, Usernationality: nationality, Usermobilenumber: mobileNo, Useroccupation: occupation, Userdob: dateofbirth, Useremailid: emailid, Useradharno: adharNo, Userflatno: flatno, Userfloorno: floorno, Userbuilding: bldgname, Userlocation: location, Userstreet: street, Userpincode: pincode, Usercity: city, Userdistrict: district, Userstate: state, Userid: userid, Userpassword: password, Userquestion: ddlquestion, Useranswer: answer }, //return param

                dataType: "json", // data trnsfer in readable format


                success: function (message) {    //controller return value


                    if (message == 'User Registration Completed Sucessfully!') {
                        window.location.reload(true);
                        flag = true;
                        window.location.href = hosturl + '/Registration/ThankYouPage/';
                    }
                    else {
                        refreshCaptcha();
                        alert(message);
                        flag = false;
                    }
                }

            });

            //// var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";

            //$.ajax({

            //    url: hosturl + "/Registration/CaptchaValidation/",

            //    type: "POST", //[httppost]

            //    data: { Usercaptcha: captcha }, //return param

            //    dataType: "json", // data trnsfer in readable format

            //    success: function (result) {    //controller return value

            //        

            //        if (result == "t") {
            //            $(".mandatoryfield1").html("Captcha Validation Success!");
            //            alert("sucess");


            //            flag= UserRegistration();
            //            //flag = true;
            //            return true;

            //        }

            //        else {

            //            alert("fails");
            //            flag = false;
            //            $(".mandatoryfield1").html("Catcha Validation Failed!");
            //            refreshCaptcha();
            //            return false;
            //        }
            //    }

            //});

            return flag;
        }


    });

});

function UserRegistration() {
    var flag;
    $(".loader").show();

    //var url = $("#ajaxUrl").val();
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    $.ajax({

        url: hosturl + "/Registration/UserRegistration/",

        type: "POST", //[httppost]

        data: { UserfirstName: userfName, Usercaptcha: captcha, Usermiddlename: usermName, Userlastname: userlName, Usergender: gender, Usernationality: nationality, Usermobilenumber: mobileNo, Useroccupation: occupation, Userdob: dateofbirth, Useremailid: emailid, Useradharno: adharNo, Userflatno: flatno, Userfloorno: floorno, Userbuilding: bldgname, Userlocation: location, Userstreet: street, Userpincode: pincode, Usercity: city, Userdistrict: district, Userstate: state, Userid: userid, Userpassword: password, Userquestion: ddlquestion, Useranswer: answer }, //return param

        dataType: "json", // data trnsfer in readable format
        contentType: 'application/json; charset=utf-8',

        success: function (message) {    //controller return value


            if (message == 'User Registration Completed Sucessfully!') {
                window.location.reload(true);
                flag = true;
                window.location.href = hosturl + '/Registration/ThankYouPage/';
            }
            else { alert = "message"; }
            flag = false;
        }

    });
    return flag;
}

//this event show selected date in dd/mm/yyyy format to user in label
$(function () {
    $('#dob').change(function () {

        var date = $("#dob").val();
        var arr = date.split('/');
        $("#dateLabel").val("Your selected date is:" + arr[2] + "/" + arr[1] + "/" + arr[0]);


    })
})


//this event verify user mobile number
$(function () {
    $('#mobileNo').blur(function () {

        verifyMobile();

    })
})
//this event verify user id
//$(function () {
//    $('#userid').blur(function () {

//        verifyUserID();

//    })
//})

//this event verify user email id
$(function () {
    $('#email').blur(function () {

        verifyEmailid();

    })
})

//this event get city district and state on selected pincode number
$(function () {
    $('#pincode').blur(function () {

        getCityStateDistrict();
    })
})


//validate Adhar number
//$(function () {
//    $('#adharNo').blur(function () {

//        isValidAdharno();
//    })
//})


//validate  that user id already exists or not
$(function () {
    $('#btnVerify').click(function () {

        verifyUserID();
    })
})


//this event encrypt the password..
$(function () {
    $('#pwd').blur(function () {

        EncryptMD5();
    })
})



//This function refresh the captcha..
//    1)On click of submit event if any of field is not valid

function refreshCaptcha() {

    $("#myimg").attr('src', $("#myimg").attr('src') + '?' + Math.random());
    $("#CaptchaText").val("");
}

//this function encrypt the user password..
function EncryptMD5() {
    
    var Pass = $("#pwd").val();
    if (Pass.length > 5)
    {
        if (Pass.length < 16)
        {
            if ((Pass.match(/[a-z]/)) && (Pass.match(/[A-Z]/)))
            {
                if (Pass.match(/\d+/))
                {
                    if (Pass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))
                    {
                        //                        var MD5Hash = $.md5(Pass);
                        var MD5Hash = SHA1(hex_md5(Pass));
                        //alert(MD5Hash);
                        $("#pwd").val(MD5Hash);
                        $(".pwdErrorMsg").html("");


                    }
                    else {

                       
                        alert("Password must have at least one special character.");
                        $("#pwd").val("");
                    }
                }
                else {

                   
                    alert("Password must have at least one digit.");
                    $("#pwd").val("");
                }
            } else {

               
                alert("Password must have at least one uppercase and one lowercase character.");
              $("#pwd").val("");
            }
        } else {

            
            alert("Password length should be between 5 to 16");
            $("#pwd").val("");
        }
    } else {

        
          alert("Password length should be between 5 to 16");
        $("#pwd").val("");
    }
}


//This function get city,district and state that match to the selected pincode..
function getCityStateDistrict() {

    var data = $('#pincode').val();
    var pattern = /^[0-9]*$/;

    if (!pattern.test(data) || data == "" || data.length != 6) {
        $("#pincodeVerificationMsg").html("Enter Valid Pincode..");
        //alert("Enter User id..");

        $("#city").html($("<option></option>").html("---Select city---"));
        $("#district").val("");
        $("#state").val("");
    }
    else {
       // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
        $.ajax({
            url: hosturl + "/Registration/getCityStateDistrictValues/",
            type: "POST",
            data: { Userpincode: data },
            dataType: "json",
            success: function (result) {    //controller return value
                var count = result.length;

                if (count > 0) {
                    //$("#district").text(result[0].Userdistrict);

                    $.each(result, function (index, value) {

                        $("#city").append($("<option></option>").html(value.Usercity));

                    });
                    $("#district").val(result[0].Userdistrict);
                    $("#state").val(result[0].Userstate);
                    $("#pincodeVerificationMsg").html("");
                }
                else {
                    $("#pincodeVerificationMsg").html("Record not found for the entered Value");
                    //alert("Record not found for the entered Value");
                }
            }
        })
    }
}


//this function verify user mobile using pattern
function verifyMobile() {

    var mobileNo = $("#mobileNo").val();
    var len = mobileNo.length;
    var filter = /^[0-9-+]+$/;
    if (filter.test(mobileNo) && len >= 4) {
        $("#mobileVerificationMsg").html("");
        //return true;
    }
    else {
        $("#mobileVerificationMsg").html("Invalid Mobile Number!");
        //return false;
    }

}
//this function verify user id using pattern
//function verifyUserid1() {

//    var user = $("#userid").val();
//    var len = user.length;
//    var filter = /^[-\w\.\$@\*\!]{1,30}$/;
//    if (filter.test(user)) {
//        $("#useridVerificationMsg").html("");

//        $("#useridVerificationMsg").html("Invalid Userid! Enter only English charactor,English Number and special charactor.").hide();

//        //return true;
//    }
//    else {
//        $("#useridVerificationMsg").html("Invalid Userid! Enter only English charactor,English Number and special charactor.");
//        $("#verifyuseridMsg").html("Verified User ID..enter password.").hide();
//        $("#verifyuseridMsg").html("User ID already exists").hide();
//        $("#userid").focus();
//        $(".hideRow").hide();
//        //return false;
//    }

//}
//this function verify user email id using pattern
function verifyEmailid() {

    var email = $("#email").val();
    var regexp = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (regexp.test(email)) {
        $("#emailVerificationMsg").html("");

    }
    else {
        $("#emailVerificationMsg").html("Invalid Email Id");
    }
}


//this function get entered user id and check user alerady exists or not... 
function verifyUserID() {

    var data = $("#userid").val();
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    if (data == "") {
        $("#verifyuseridMsg").html("Enter Login Id");

    }
    else {

        $.ajax({
            url: hosturl + "/Registration/getUserId/",
            type: "POST",
            data: { Userid: data },
            dataType: "json",
            success: function (count) {    //controller return value

                if (count > 0) {
                    $("#verifyuseridMsg").html("Login Id  already exists");
                    $("#verifyuseridMsg").html("Login Id already exists").show();
                    $(".hideRow").hide();
                }
                else {
                    $("#verifyuseridMsg").html("Verified Login Id. Enter password.");
                    $("#verifyuseridMsg").html("Verified Login Id. Enter password.").show();
                    // $("#btnLogin").prop('disabled', true);
                    $(".hideRow").show();
                }
            }

        })
    }
}

