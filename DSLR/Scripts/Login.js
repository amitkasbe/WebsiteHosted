$(document).ready(function () {
    //localStorage.removeItem('jwt_token');
   // localStorage.clear();
    $("#SaveChangePassword").attr("disabled", true);
    // Function to fetch image URL and show popup

    // Show popup when the page loads
    //window.onload = showPopup(); //site maintanance popup
    $("#login_panel").show();
    $("#otpbase_panel").hide();
   


  
    //swal("Good job!", "You clicked the button!", "success");

    //$("#popupModal").modal('show');

    $('input[type=radio][name=conformno]').change(function () {

        if (this.value == 'Regular Login') {
            $("#login_panel").show();
            $("#otpbase_panel").hide();
        }
        else if (this.value == 'OTPBase Login') {
            $("#login_panel").hide();
            $("#otpbase_panel").show();
        }
    });

    $("#SaveChangePassword").click(function () {
        changePassword();
    })
});
// Function to show the popup
function showPopup(imageUrl) {
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');
    popupImage.src = imageUrl;
    popup.classList.remove('hidden');

}
  

//shankar
// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}
let txtnewpassword
let responseObject
/* change password*/
$(function () {

   

    // Event handler for the blur event of the "old password" input
    $('#oldPassword').blur(function () {
        var password = $('#oldPassword').val();
        var validate = validateNewPassword(password)
        if (validate == true) {
            var password = $('#oldPassword').val();
            $('#oldPassword').val(checkEncryptMD5Login(password))
        }
       
        
        // checkOldPassword();  // Call the function to check the old password

    });

    // Event handler for the blur event of the "new password" input
    $('#newPassword').blur(function () {
       

        var password = $('#newPassword').val();
        var validate = validateNewPassword(password)
        if (validate == true) {
            txtnewpassword = $('#newPassword').val();
            //var password = $('#newPassword').val();
            $('#newPassword').val(checkEncryptMD5Login(txtnewpassword))
            checkOldPassword()
        }
      
    });

    // Event handler for the blur event of the "confirm password" input
    $('#confirmPassword').blur(function () {
        var password = $('#confirmPassword').val();
        var validate = validateNewPassword(password)
        if (validate == true) {
            var password = $('#confirmPassword').val();
            $('#confirmPassword').val(checkEncryptMD5Login(password))
            checkPasswordMatch();
        }
      
    });
});
function checkOldPassword() {
   
    var oldPassword = $("#oldPassword").val();
    var newPassword = $("#newPassword").val();

    // Check if the new password is the same as the old password
    if (newPassword === oldPassword) {
        $(".msg_ch").html("<span style='color:red;'>New password cannot be the same as the old password</span>");
        $("#newPassword").val("");
        return false;
    }
    else {
        $(".msg_ch").html("");  // Clear message if old and new passwords are different
        return true;
    }
}
function checkPasswordMatch() {
   
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();

    // If the passwords do not match, show an error message
    if (newPassword !== confirmPassword) {
        $(".msg_ch").html("<span style='color:red;'>Passwords do not match</span>");
        return false; // Stop further processing if passwords don't match
    } else {
        $("#SaveChangePassword").attr("disabled", false);
        return true;
    }
}
function validateNewPassword(password) {
 
    // Password validation criteria
    if (password.length >= 6 && password.length <= 15) {
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            if (password.match(/\d+/)) {
                if (password.match(/.[!,@@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
                    $(".msg_ch").html("");  // Clear any error message if validation passes
                 
                   
                    return true;
                } else {
                    $(".msg_ch").html("<span style='color:red;'>Password must contain at least one special character</span>");
                    return false;
                }
            } else {
                $(".msg_ch").html("<span style='color:red;'>Password must contain at least one digit</span>");
                return false;
            }
        } else {
            $(".msg_ch").html("<span style='color:red;'>Password must contain at least one lowercase and one uppercase letter</span>");
            return false;
        }
    } else {
        $(".msg_ch").html("<span style='color:red;'>Password must be between 6 and 15 characters</span>");
        return false;
    }
}

// This function encrypts the user password (assuming encryption algorithm exists)
function  checkEncryptMD5Login(passval) {
    // var Pass = $("#newPassword").val();
    var MD5Hash = SHA1(hex_md5(passval));  // Apply encryption logic here
    //$("#newPassword").val(MD5Hash);  // Replace plain password with the encrypted one
    return MD5Hash
    $(".msg_ch").html("");  // Clear any error message after successful encryption
}
function changePassword() {
  
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    var loginId = $('#txtlogid').val();
    var OldpassWrd = $('#oldPassword').val();
    var newpassWrd = $('#newPassword').val();
    var ConfirmpassWrd = $('#confirmPassword').val();
    var captch = $('#CaptchaImageText_change').val();
    $.ajax({
        url: hosturl + "/Login/ChangeUserPassword/",
        type: "POST",
        //headers: {
        //    'Authorization': 'Bearer ' + token // Make sure token is properly defined
        //},
        data: { loginId: loginId, password: OldpassWrd, NewPassword: newpassWrd, captch: captch, NewPwdPlainT: txtnewpassword },
        dataType: "json",
        success: function (result) {
            if (result == "Password Changed Successfully") {
               
                $('#oldPassword').val("")
                $('#newPassword').val("")
                $('#confirmPassword').val("")
                $(".msg_ch").html("<span style='color:green;'>" + result + "</span>");
                setTimeout(function () {
                    $('#passwordModal').modal('hide');
                }, 10000);
            }
            $(".msg_ch").html("<span style='color:red;'>" + result + "</span>");
            
        }
    });

}
// refresh captcha
function refreshCaptcha() {

    $("#myimg").attr('src', $("#myimg").attr('src') + '?' + Math.random());
    $("#CaptchaText").val("");
}



$(document).on('keypress', function (e) {
    if (e.which == 13) {

        funsub();
    }
});



$(function () {

    $("#btnsendOTP").click(function () {
        sendOTP();
    });
});

function sendOTP() {
  
    var mobilenumber = $('#txtmobile').val();
    $(".loader").show();
    $(".msggreen").html("");
    $(".msgred").html("");
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    $.ajax({

        url: hosturl + "/Login/sendOTP/",

        type: "POST",
        data: { mobilenumber: mobilenumber },
        dataType: "json",
        success: function (response) {
            debugger;
            if (response.flag && response.status_code == 200) {
                $(".emsg").html("");
                $(".msggreen").html("");
                $(".msg1").html("");
                $(".msggreen").html(response.message);
                return false;
            } else {
                $(".emsg").html("");
                $(".msgred").html("");
                $(".msg1").html("");
                $(".msgred").html(response.message);
                return false;
            }
            //if (r == "M") {

            //    $(".emsg").html("");
            //    $(".msggreen").html("");
            //    $(".msg1").html("");
            //    $(".msgred").html("Incorrect Mobile Number.");

            //}
            //else if (r == "O") {

            //    $(".emsg").html("");
            //    $(".msgred").html("");
            //    $(".msg1").html("");
            //    $(".msggreen").html("OTP sent on your mobile.");

            //}
        },

        error: function(xhr, status, error) {
        if (xhr.status === 400) {  // Check if status code is 400 (Bad Request)
            var errorMessage = xhr.statusText || "An error occurred";  // Get error message from response
            alert(errorMessage);  // Show alert with error message
        } else {
            alert('An unexpected error occurred.');
        }
    }
    });
    $(".loader").hide();
}


$(function () {

    //$("#btnVerifyOTP").click(function () {
    //    verifyOTP();
    //});
});

//function verifyOTP() {
//    
//    var enteredotp = $('#txtOTP').val();
//    $(".loader").show();
//   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";

//    $.ajax({

//        url: hosturl + "/Login/verifyOTP/",

//        type: "POST",
//        data: { userenteredotp: enteredotp }, //return param
//        dataType: "json",
        

//        success: function (response) {
//            
//            // Handle success response
//            if (response.success) {
//                            //$('#responseMessage').text("OTP verified successfully! Token: " + response.token);
//                localStorage.setItem('jwt_token', response.Data.token);
//                            window.location.href = hosturl + '/Satbara/LiveSatBara';
//                             } else if (response.success == "R") {
//                                     $(".emsg").html("");
//                                     $(".msgred").html("");
//                                     $(".msggreen").html("");
//                                     $(".msg1").html("Try again.");
//                             } else {
//                                     $(".emsg").html("");
//                                     $(".msgred").html("");
//                                     $(".msggreen").html("");
//                                     $('#.msg1').text("Error: " + response.message);
//                                }
//                            },
//                            error: function(xhr, status, error) {
//                                // Handle error response
//                                $('.msg1').text("An error occurred. Please try again.");
//                           }
//       // success: function (result) {
//            //var r = result[0];


//            //if (r == "T") {

//            //    window.location.href = hosturl + '/Satbara/LiveSatBara/';

//            //}
//            //else if (r == "F") {

//            //    $(".emsg").html("");
//            //    $(".msgred").html("");
//            //    $(".msggreen").html("");
//            //    $(".msg1").html("Incorrect OTP.");

//            //}
//            //else if (r == "R") {

//            //    $(".emsg").html("");
//            //    $(".msgred").html("");
//            //    $(".msggreen").html("");
//            //    $(".msg1").html("Try again.");
//            //}
//     //   }

//    })
//    $(".loader").hide();
//}
function verifyOTP() {
    
    var enteredotp = $('#txtOTP').val();  // Get OTP entered by the user
    $(".loader").show();  // Show loading spinner

   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";

    $.ajax({
        url: hosturl + "/Login/verifyOTP/",  // Endpoint for OTP verification
        type: "POST",
        data: { userenteredotp: enteredotp },  // Sending the entered OTP as data
        dataType: "json",  // Expecting a JSON response

        success: function (response) {
          

            var Result = response.Data
            // Check if the OTP verification was successful
            if (Result.success== false) {
                // Save the JWT token in localStorage
               // localStorage.setItem('jwt_token', Result.token);

                // Redirect to the next page after successful login
                window.location.href = hosturl + '/Satbara/LiveSatBara';
            } else if (Result.success === "R") {
                $(".emsg").html("");
                $(".msgred").html("");
                $(".msggreen").html("");
                $(".msg1").html("Try again.");
            } else {
                $(".emsg").html("");
                $(".msgred").html("");
                $(".msggreen").html("");
                $(".msg1").text("Error: " + Result.message);
            }
        },

        error: function (xhr, status, error) {
            // Handle error response
            $('.msg1').text("An error occurred. Please try again.");
        }

    });

    $(".loader").hide();  // Hide the loading spinner once the request is complete
}



$(function () {

    $("#btnSubmit2").click(function () {
        if (!funsub()) {
            event.preventDefault();  // Prevent form submission if validation fails
        }
    });
});
function funsub() {
  
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    var loginId = $('#txtlogid').val().trim();
    var passWrd = $('#txtpasslogin').val().trim();
    var captch = $('#CaptchaText').val().trim();

    if (!loginId) {
        $(".emsg").html("Error:");
        $(".msg").html("Enter login ID");
        refreshCaptcha();
        return false;
    } else if (!passWrd) {
        $(".emsg").html("Error:");
        $(".msg").html("Enter password");
        refreshCaptcha();
        return false;
    } else if (!captch) {
        $(".emsg").html("Error:");
        $(".msg").html("Enter captcha");
        refreshCaptcha();
        return false;
    } else {
        return true;
    }
}
//function funsub() {
//  
//   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
//    var loginId = $('#txtlogid').val().trim();
//    var passWrd = $('#txtpasslogin').val().trim();
//    var captch = $('#CaptchaText').val().trim();

//    if (!loginId) {
//        $(".emsg").html("Error:");
//        $(".msg").html("Enter login ID");
//        refreshCaptcha();
//        return false;
//    }else if (!passWrd) {
//        $(".emsg").html("Error:");
//        $(".msg").html("Enter password");
//        refreshCaptcha();
//        return false;
//    }else if (!captch) {
//        $(".emsg").html("Error:");
//        $(".msg").html("Enter captcha");
//        refreshCaptcha();
//        return false;
//    }else{
//        return true;
//    }
//}
    //$.ajax({
    //    url: hosturl + "/Login/verifyUser/",
    //    type: "POST",
    //    data: { loginId: loginId, password: passWrd, captch: captch },
    //    dataType: "json",
    //    xhrFields: {
    //        withCredentials: true
    //    },
    //    success: function (response) {
    //      
    //        console.log(response);
    //        if (response.flag && response.status_code === 200) {
    //            if (response.response.IsLoginAllowed) {
    //                if (response.response.Message != null) {
    //                    swal({
    //                        title: "",
    //                        text: response.response.Message,
    //                        icon: "",
    //                        buttons: ["Cancel", "OK"],
    //                        dangerMode: false,
    //                        closeOnClickOutside: false,
    //                    }).then((willProceed) => {
    //                        if (willProceed) {
    //                            proceedAfterConfirmation();
    //                        } else {
    //                            refreshCaptcha();
    //                        }
    //                    });
    //                } else {
    //                    proceedAfterConfirmation();
    //                }
                       
    //            } 
                
    //        } else if (!response.flag && response.response.IsLoginAllowed === false) {
    //            $("#txtpasslogin, #txtlogid").val("");
    //            $(".emsg").html("");
    //            $(".msg").html(response.message);
    //            swal("", response.message, "");
    //            $('#passwordModal').modal({
    //                backdrop: 'static',
    //                keyboard: false
    //            });
    //        } else  {
    //            $(".msg").html(response.message)
    //            swal("", response.message, "");
    //            refreshCaptcha();
    //        }
    //      function proceedAfterConfirmation() {
    //            var hosturl1 ="";//window.location.protocol + "//" + window.location.hostname + "//"
    //          //  localStorage.setItem('jwt_token', response.response.token);
    //             window.location.href = hosturl1 + response.response.RedirectTo;
               
    //        }
    //    },
    //    error: function (xhr, status, error) {
    //        console.error("AJAX Error:", error);
    //        $(".msg").html("Login failed. Please try again.");
    //        swal("", "Login failed. Please try again.", "warning");
    //        refreshCaptcha();
    //    }
    //});


//function funsub() {
//  
//   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
//    var loginId = $('#txtlogid').val();
//    var passWrd = $('#txtpasslogin').val();
//    var captch = $('#CaptchaText').val();

//    if (loginId == "") {
//        $(".emsg").html("Error:");
//        $(".msg").html("Enter loginID");
//        refreshCaptcha();
//        return false;
//    }
//    else if (passWrd == "") {
//        $(".emsg").html("Error:");
//        $(".msg").html("Enter password");
//        refreshCaptcha();
//        return false;
//    }
//    else if (captch == "") {
//        $(".emsg").html("Error:");
//        $(".msg").html("Enter captcha");
//        refreshCaptcha();
//        return false;
//    }
//    else {
       
//        //  EncryptMD5Login();
//        var passWrd = $('#txtpasslogin').val();
//        $.ajax({
//            url: hosturl + "/Login/verifyUser/",
//            type: "POST", //[httppost]
//            data: { loginId: loginId, password: passWrd, captch: captch }, //return param
//            dataType: "json", // data trnsfer in readable format
//            success: function (result) {    //controller return value
//                responseObject = result;
//                if (result.Message == "c") {
//                    $("#txtpasslogin").val("");
//                    $(".emsg").html("");
//                    $(".msg").html("Incorrect captcha");
//                    refreshCaptcha();
//                    return false;
//                }

//                if (result.IsLoginAllowed == true) {
//                    if (result.Message != null) {
//                        confirm(result.Message);
//                    }
//                    localStorage.setItem('jwt_token', result.token);
//                    window.location.href = hosturl + '/Satbara/LiveSatBara';

//                } if (result.IsLoginAllowed == false) {
//                    if (result.Message == "I") {
//                        $(".msg").html("Incorrect user Id / Password ")
//                    } else {
//                        $("#txtpasslogin").val("");
//                        $("#txtlogid").val("");
//                        $(".emsg").html("");
//                        $(".msg").html(result.Message);
//                        //$("#passwordModal").attr("class", "modal fade in");
//                        //$("#passwordModal").attr("style", "display: block;");
//                        $('#passwordModal').modal({
//                            backdrop: 'static',  // Prevent closing when clicking outside
//                            keyboard: false      // Prevent closing with the 'Esc' key
//                        });
                          
//                    }
//                    refreshCaptcha();
//                    return false;

//                }
//                else {
//                    console.log(result.Message)
//                }
//                //var r = result[0];
//                //if (r == "t") {
//                //    window.location.href = hosturl + '/Satbara/LiveSatBara/';
//                //}
//                //else if (r == "c") {
//                //    $("#txtpasslogin").val("");
//                //    $(".emsg").html("");
//                //    $(".msg").html("Incorrect captcha");
//                //    refreshCaptcha();
//                //}

//                //else if (r == "n") {
//                //    $("#txtpasslogin").val("");
//                //    $(".emsg").html("");
//                //    $(".msg").html("Loginid not exist.");
//                //    refreshCaptcha();
//                //}
//                //else {
//                //    $("#txtpasslogin").val("");
//                //    $("#txtlogid").val("");
//                //    $(".emsg").html("");
//                //    $(".msg").html("Incorrect user Id/Password ");
//                //    refreshCaptcha();
//                //    return false;
//                // }
//            }

//        })
//    }
//}
$(".close").click(function () {
    $("#passwordModal").attr("class", "modal fade");
    $("#passwordModal").attr("style", "display: none; padding-left: 17px;");
});
//forgetPassword

$(function () {

    $("#btnCancel").click(function () {
        window.location.reload(true);
    })
})
$(function () {
    $('#txtpasslogin').blur(function () {
        
        EncryptMD5Login();
    })
})
       
//function EncryptMD5Login() {

//    var salt = $("#hdnsalt").val();
//    var Pass = $("#txtpasslogin").val();
//    if (Pass!=""){
//        var MD5Hash = SHA1(hex_md5(Pass));

//        MD5Hash = hex_md5(salt + MD5Hash);
//        $("#txtpasslogin").val(MD5Hash);
//        $(".msg").html("");
//    }

//}

function EncryptMD5Login() {
   
   // var hosturl =window.location.protocol + "//" + window.location.hostname + "//" + "DSLR_audit";
    var Pass = $("#txtpasslogin").val();
    if (Pass != "") {
        // Make an AJAX GET request to the server to get the encrypted password
        $.ajax({
            type: "POST",
            url: hosturl + "/Login/getencriptpassword",  // Modify the URL as per your routing
            data: { userinput: Pass },
            success: function (response) {
               
                if (response.success) {
                    // Replace the password field with the encrypted password returned from the server
                    $("#txtpasslogin").val(response.encryptedPassword);
                    $(".msg").html(""); // Clear any messages
                } else {
                    // Show error message returned from the server
                    $(".msg").html(response.message);
                }

            },
            error: function () {
                $(".msg").html("Error in encryption process.");
            },
            complete: function () {
                // Enable the submit button after the request is complete
                $("#btnSubmit2").attr("disabled", false);
            }
        });
    }
}
