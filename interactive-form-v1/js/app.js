
//  P A G E     L O A D E D //
$('document').ready(function(){ 
    // Focus on first input 
    $('#name').focus(); 
    $('fieldset').append('<input type="text" id="other-title" name="other_title" placeholder="Your Job Role">');
    // Hidden elements till it's selected
    $('#other-title').hide(); 
    $('#colors-js-puns').hide();
}) 
 
//     J O B      R O L E      //
// Event handler to show input if option is selected
$('#title').change(function(){
    if ($('#title option:selected').val() === "other") {  
        $('#other-title').show();
        $('#other-title').focus();
    } else {
        $('#other-title').hide();
    }
});

//  T   -   S H I R T   //
// Event handler to show T shirt color based on selected T shirt design
$('#design option:first').prop("disabled", true);

$('#design').change(function(){
    if ($('#design option:selected').val() === "js puns") {
        $('#colors-js-puns').show();
        $('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
    } else if ($('#design option:selected').val() === "heart js") {
        $('#colors-js-puns').show();
        $('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
    } else {
        $('#colors-js-puns').hide();
    }
});

// R E G I S T E R   4   A C T I V I T I E S   //

// variables for activities
var jsFrameworks = $("input[name='js-frameworks']");
var express = $("input[name='express']");
var jsLibraries = $("input[name='js-libs']");
var node = $("input[name='node']");

// Add total cost to the last of the activities class
var totalCost = 0;
$('.activities').append('<div id="total"></div>');

// Function to update the total cost to the page
var updateCost = function (cost) {
    totalCost += cost;
    document.getElementById("total").innerHTML = "Total: $" + totalCost;
};  

// Event handler to update the total cost of selected items and disable conflicting activities
$("input[name='all']").change(function () {
    if ($(this).prop("checked")) {
        updateCost(200);
    } else {
        updateCost(-200);
    }
});

jsFrameworks.change(function () {
    if ($(this).prop("checked")) {
        express.prop("disabled", true);
        express.parent().css("color", "gray");
        updateCost(100);
    } else {
        express.prop("disabled", false);
        express.parent().css("color", "black")
        updateCost(-100);
    }
});

jsLibraries.change(function () {
    if ($(this).prop("checked")) {
        node.prop("disabled", true);
        node.parent().css("color", "gray");
        updateCost(100);
    } else {
        node.prop("disabled", false);
        node.parent().css("color", "black");
        updateCost(-100);
    }
});

express.change(function () {
    if ($(this).prop("checked")) {
        jsFrameworks.prop("disabled", true);
        jsFrameworks.parent().css("color", "gray");
        updateCost(100);
    } else {
        jsFrameworks.prop("disabled", false);
        jsFrameworks.parent().css("color", "black");
        updateCost(-100);
    }
});

node.change(function () {
    if ($(this).prop("checked")) {
        jsLibraries.prop("disabled", true);
        jsLibraries.parent().css("color", "gray");
        updateCost(100);
    } else {
        jsLibraries.prop("disabled", false);
        jsLibraries.parent().css("color", "black");
        updateCost(-100);
    }
});

$("input[name='build-tools']").change(function () {
    if ($(this).prop("checked")) {
        updateCost(100);
    } else {
        updateCost(-100);
    }
});

$("input[name='npm']").change(function () {
    if ($(this).prop("checked")) {
        updateCost(100);
    } else {
        updateCost(-100);
    }
});

// P A Y M E N T    I N F O //

// Set credit card as default
$('#payment').val('credit card');
//hide paypal and bitcoin by default
$('#paypal, #bitcoin').hide();
// Disable sethod method from the options
$('option[value="select_method"]').prop("disabled", true);

$('#payment').change(function(){
	if ($('#payment option:selected').val() === "paypal") {
        $('#credit-card, #bitcoin').hide();
		$('#paypal').show();
	} else if ($('#payment option:selected').val() === "bitcoin") {
        $('#credit-card, #paypal').hide();
		$('#bitcoin').show();
	} else {
		$('#credit-card').show();
        $('#paypal, #bitcoin').hide();
	}
});

// F O R M  V A L I D A T I O N //
$('button:submit').on('click', function(e){
    var isValid = true;

// Check is name or email is empty //
    var nameCheck = $('#name');
    var emailCheck = $('#mail');
    var nameAlertPlaceholder = nameCheck.attr('placeholder', 'Please write your name');
    var emailAlertPlaceholder = emailCheck.attr('placeholder', 'Please write your email');
    // If name or email is empty, border will turn red //
    if ( nameCheck.val().length == 0 ){
        nameCheck.css('borderColor', 'red');
        isValid = false;
    } 
    if ( emailCheck.val().length == 0  ) {
        emailCheck.css('borderColor', 'red');
        isValid = false;
    }
    // Turn color back to normal when you are typing in the name or email input 
    nameCheck.on('keyup', function(){
        if (nameCheck.val().length != 0) {
            nameCheck.css('borderColor', '#5e97b0');
        } 
    });
    emailCheck.on('keyup', function(){
        if (emailCheck.val().length != 0) {
            emailCheck.css('borderColor', '#5e97b0');
        }    
    });

// Check email input
    var mailFormat = /^[^@]+@[^@.]+\.[a-z]+$/i;
    var userEmail = $('#mail').val();
    var mailChecker = mailFormat.test(userEmail);
    
    if( !mailChecker ) {
            $('#mail').append('<p class="email_checker">Please write valid email address</p>');
        } else {
            $('#mail').remove('<p class="email_checker">Please write valid email address</p>')
        }


    // Check t-shirt info selection
    if( $('#design option:first').is(':selected') ) {
        $('.shirt').append('<p class="tshirt_checker">Please select a design</p>');
        isValid = false;
    }
    $('#design').on('change', function() {
        if( !$('#design option:first').is(':selected') ) {
            $('.tshirt_checker').remove();
        } else {
            $('.shirt').append('<p class="tshirt_checker">Please select design</p>');
            isValid = false;
        }
    });

    // Check activiites checkbox
    if( !$('.activities input:checked').length ) {
        if( !$('.activity_error').length ) {
            $('.activities').append('<p class="activity_error">At least one must be selected</p>')
        }

        $('.activities input').on('change', function(){
            $('.activity_error').remove();
        });
        isValid = false;
    }

    // Check credit card user input
    if( $('option[value="credit card"]').is(':selected') ) {
        var cCChecker = /^(\d{13,16})$/;
        if( !cCChecker.test( $('#cc-num').val()) ) {
            $('#cc-num').css('borderColor', 'red');

            //Check while user is typing
            $('#cc-num').on('change keyup', function(){
                //Check credit card length
                if( $('#cc-num').val().length ) {
                    $('#cc-num').css('borderColor', '#5e97b0')
                } else {
                    $('#cc-num').css('borderColor', 'red')
                }
                if( !cCChecker.test( $('#cc-num').val()) ){
                    if( !$('.creditcard_checker').length ) {
                        $('#cc-num').append('<p class="creditcard_checker">Between 13 and 16 digits</p>');
                    }
                } else {
                    $('.creditcard_checker').remove();
                }
            });
            isValid = false;
        }

        // Check zip code user input
        var zipCodeChecker = /^(\d{5})$/;
        if( !zipCodeChecker.test( $('#zip').val()) ) {
            $('#zip').css('borderColor', 'red');

            //Check while user is typing
            $('#zip').on('change keyup', function(){
                //Check zip code length
                if( $('#zip').val().length ) {
                    $('#zip').css('borderColor', '#5e97b0');
                } else {
                    $('#zip').css('borderColor', 'red')
                }
                if( !zipCodeChecker.test( $('#zip').val()) ) {
                    if( !$('.zipcode_checker').length ) {
                        $('#zip').append('<p class="zipcode_checker">Max 5 digits</p>');
                    } 
                } else {
                    $('.zipcode_checker').remove();
                }
            });
            isValid = false;
        }

        //Check cvv user input
        var cvvChecker = /^(\d{3})$/;
        if( !cvvChecker.test( $('#cvv').val()) ) {
            $('#cvv').css('borderColor', 'red');

            //Check while user is typing
            $('#cvv').on('change keyup', function(){
                //Check cvv length
                if( $('#cvv').val().length ) {
                    $('#cvv').css('borderColor', '#5e97b0')
                } else {
                    $('#cvv').css('borderColor', 'red')
                }
                if( !cvvChecker.test( $('#cvv').val()) ) {
                    $('#cvv').append('<p class="cvv_checker">Max 3 digits</p>');
                } else {
                    $('.cvv_checker').remove();
                }
            });
            isValid = false;
        }
    }
    
    //Stop process if form is invalid
    if( !isValid ) {
        e.preventDefault();
    }
});





