
//  P A G E     L O A D E D //
$('document').ready(function(){ 
    // Focus on first input 
    $('#name').focus(); 
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

// Variables for activities
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
// Hide paypal and bitcoin by default
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
    // Stop repeating messages
    $('p.nameAlert').remove();
    $('p.emailAlert').remove();
    $('p.tshirtAlert').remove();
    $('p.activityAlert').remove();
    $('p.ccAlert').remove();
    $('p.zipCodeAlert').remove();
    $('p.cvvAlert').remove();
	
    // Local variable for this function //
    var name = $('#name');
    var email = $('#mail');
    var cc = $('#cc-num');
    var zip = $('#zip');
    var cvv = $('#cvv');
	
    // Assuming everything is correct from the beginning of the function
    isValid = true;
	
    // Check name input
    if (name.val() === "") {
        name.attr('placeholder', 'Please write your name');
        $('.basic').append('<p class="nameAlert">Please write your name</p>');
        name.css('borderColor', 'red');
        isValid = false;
    } 

    name.on('change keyup', function(){
        if(name.val().length) {
            name.css('borderColor', '#5e97b0');
            $('.nameAlert').remove();
        }
    })

// Check email input
    if (email.val() === "") {
        email.attr('placeholder', 'Please write valid email address');
        email.css('borderColor', 'red');
        isValid = false;
    };

    var mailFormat = /^[^@]+@[^@.]+\.[a-z]+$/i;
    if( !mailFormat.test($(email).val()) ) {
            email.css('borderColor', 'red');   
            $('.basic').append('<p class="emailAlert">Please write valid email address</p>');
            isValid = false;
        } else {
            $('.emailAlert').remove();
        }

    email.on('change keyup', function(){
        if (email.val().length ) {
            email.css('borderColor', '#5e97b0');
            $('.email_checker').remove();
        } else {
            email.css('borderColor', 'red');
            isValid = false;
        }
});

    // Check t-shirt info selection
    if ( $('#design option:first').is(':selected') ) {
        $('.shirt').append('<p class="tshirtAlert">Please select a design</p>');
        isValid = false;
    }

    $('#design').on('change', function() {
        if( !$('#design option:first').is(':selected') ) {
            $('.tshirtAlert').remove();
        } else {
            $('.shirt').append('<p class="tshirtAlert">Please select design</p>');
            isValid = false;
        }
    });

    // Check activiites checkbox
    if( $('.activities input:checked').length === 0) {
        $('.activities').append('<p class="activityAlert">At least one must be selected</p>');
        isValid = false;
        } else {
            $('.activityAlert').remove();
        }

    // Check credit card user input
    if( $('option[value="credit card"]').is(':selected') ) {
        var cCChecker = /^(\d{13,16})$/;
        if( !cCChecker.test(cc.val())) {
            $('#credit-card').append('<p class="ccAlert">Please enter 13-16 digits of your credit card</p>');
            cc.css('borderColor', 'red');

            //Check while user is typing
            cc.on('change keyup', function(){
                //Check credit card length
                if(cc.val().length ) {
                    cc.css('borderColor', '#5e97b0')
                    $('.ccAlert').remove();
                } else {
                    cc.css('borderColor', 'red')
                }
            });
            isValid = false;
        }

        // Check zip code user input
        var zipCodeChecker = /^(\d{5})$/;
        if( !zipCodeChecker.test( $('#zip').val()) ) {
            zip.css('borderColor', 'red');
            $('#credit-card').append('<p class="zipCodeAlert"> Enter 5 digits Zip Code</p>');

            //Check while user is typing
            zip.on('change keyup', function(){
                //Check zip code length
                if( zip.val().length ) {
                    zip.css('borderColor', '#5e97b0');
                    $('.zipCodeAlert').remove();
                } else {
                    zip.css('borderColor', 'red')
                }
            });
            isValid = false;
        }

        //Check cvv user input
        var cvvChecker = /^(\d{3})$/;
        if( !cvvChecker.test( $('#cvv').val()) ) {
            cvv.css('borderColor', 'red');
            $('#credit-card').append('<p class="cvvAlert">Enter 3 digits of your security code</p>');
            //Check while user is typing
            cvv.on('change keyup', function() {
                //Check cvv length
                if( cvv.val().length ) {
                    cvv.css('borderColor', '#5e97b0')
                    $('.cvvAlert').remove();
                } else {
                    cvv.css('borderColor', 'red')
                }
            });
            isValid = false;
    }
}
	
    //Stop process if form is invalid
    if( !isValid ) {
        e.preventDefault();
    }
    // if everything is correct, this alert message should appear
    if (isValid) {
        alert("Thank you for your purchase. I hope to see you soon!");
    }
});










