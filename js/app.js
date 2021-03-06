// NAME REGEX
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const nameField = document.getElementById('name');
// EMAIL ADDRESS
const emailRegex = /^\w+[.]?[@][A-Za-z]+[.][A-Za-z]{3}$/;
const mailField = document.getElementById('mail');
// CREDIT CARD NUMBER
const ccNumRegex = /^(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{1,4})$/;
const ccField = document.getElementById('cc-num');
// ZIP CODE 
const ccZipRegex = /^\d{5}$/;
const zipField = document.getElementById('zip');
// CVV
const ccCvvRegex = /^\d{3}$/;
const cvvField = document.getElementById('cvv');
/* <---------------------------------------------
			      	BASIC INFO
----------------------------------------------- */
const paymentSection = document.getElementById('payment-section');
const activityOptions = document.getElementById("activity-options");
const other = document.getElementById("other-role-input");
const userTitle = document.getElementById('title');
const $other = $("#other-role");
const $otherInput = $('#other-role input');
const paymentOptoions = document.getElementById('payment');
$other.hide();

nameField.addEventListener("keyup", () => {
  if (!nameField.value.match(nameRegex)) {
    errorFormatting(nameField);
  } else {
    successFormatting(nameField);
    $(".nameError").slideUp();
  }
});
mailField.addEventListener('keyup', function() {
	if (!mailField.value.match(emailRegex)) {
		errorFormatting(mailField);
	} else {
		successFormatting(mailField);
		$('.mailError').slideUp();
	}
});

userTitle.addEventListener('change', () => {
	if ( userTitle.value == 'other') {
		$other.slideDown();
		$otherInput.focus();
	} else {
		$other.slideUp();
	}
});
other.addEventListener('keyup', () => {
	if (!other.value == '') {
		successFormatting(other);
		$('.roleError').slideUp();
	} else {
		$('.roleError').slideDown();
		errorFormatting(other);
	}
})

/* <---------------------------------------------
			   		END BASIC INFO
----------------------------------------------- */





/* <---------------------------------------------
			   		T-SHIRT INFO
----------------------------------------------- */
const $colorOptions = $('.color-options');
$colorOptions.hide();

const design = document.getElementById('design');
design.addEventListener('click', (e) => {
});
design.addEventListener('change', (e) => {
	if (e.target.value == 'select') {
		$colorOptions.hide();
	} else
	if (e.target.value == 'js puns') {
		showPunShirts()
	} else 
	if (e.target.value == 'heart js') {
		showLoveShirts();
	}
});
const punShirts = `
	<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
 	<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
   <option value="gold">Gold (JS Puns shirt only)</option>
`;
const loveShirts = `
	<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
	<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
   <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>
`;
function showPunShirts() {
	$colorOptions.slideDown();
	const options = document.getElementById('color');
	options.innerHTML = punShirts;
}
function showLoveShirts() {
	$colorOptions.slideDown();
	const options = document.getElementById('color');
	options.innerHTML = loveShirts;
}
/* <---------------------------------------------
			   		END T-SHIRT INFO
----------------------------------------------- */



/* <---------------------------------------------
			   		ACTIVITY SECTION
----------------------------------------------- */
const activitiesSection = document.querySelector(".activities");
const activityInputs = document.querySelectorAll('.activities input');
const activityLabels = document.querySelectorAll('.activities label');
const priceClass = document.querySelectorAll('.price');
let price = 0;


activityInputs.forEach((input, index) => {
	input.addEventListener('click', (e) => {
		activityCross();
		activityCheck(e, index, priceClass[index].textContent);
		priceClass.forEach(price => {
		});
	});
});
function activityCheck(e, p, cost) {
	if (e.target.checked == true ) {
		priceClass[p].classList.add('active-price');
		addPrice(cost);
		priceCheck();
	} else
	if (e.target.checked == false ) {
		priceClass[p].classList.remove('active-price');
		subtractPrice(cost);
		priceCheck();
	}
}
function activityCross() {
	if ( activityInputs[1].checked == true) {
		activityLabels[3].classList.add('no-option');
	} else 
	if ( activityInputs[1].checked == false) {
		activityLabels[3].classList.remove('no-option');
	}
	if ( activityInputs[3].checked == true) {
		activityLabels[1].classList.add('no-option');
	} else
	if ( activityInputs[3].checked == false) {
		activityLabels[1].classList.remove('no-option');
	}

	if ( activityInputs[2].checked == true) {
		activityLabels[4].classList.add('no-option');
	} else
	if ( activityInputs[2].checked == false) {
		activityLabels[4].classList.remove('no-option');
	}
	if ( activityInputs[4].checked == true) {
		activityLabels[2].classList.add('no-option');
	} else
	if ( activityInputs[4].checked == false) {
		activityLabels[2].classList.remove('no-option');
	}

}



function priceCheck() {
	if (price <= 0) {
		$(".activityError").slideDown();
		$('.total-price').removeClass('total-price-active');
	} else {
		$(".activityError").slideUp();
	}
}

function addPrice(amount) {
	let parse = parseInt(amount)
	price += parse;
	$('.total-price').text("Total price: $ " + price);
	$('.total-price').addClass('total-price-active');
}
function subtractPrice(amount) {
	let parse = parseInt(amount)
	price -= parse;
	$('.total-price').text("Total price: $ " + price);
	$('.total-price').addClass('total-price-active');
}


/* <---------------------------------------------
			   	END ACTIVITY SECTION
----------------------------------------------- */





/* <---------------------------------------------
			   		PAYMENT INFO
----------------------------------------------- */

// CC functionality
ccField.addEventListener('focus', () => {
	if ( !ccField.value.match(ccNumRegex)) {
	$('.ccError').slideDown();
	} else {
		$('.ccError').slideUp();
	}
});
ccField.addEventListener('keyup', () => {
	
	if (ccField.value.length == 8 ) {
		$(".ccError").slideDown();
		$('.ccError').text('Almost there!')
	} else 
	if (ccField.value.length == 13 ) {
		$('.ccError').slideUp();
		successFormatting(ccField);
	} else 
	if (ccField.value.length == 16 ) {
		reformatCC();
		zipField.focus();
		successFormatting(ccField);
	} 
});

// ZIP functionality
zipField.addEventListener('focus', () => {
	$('.ccError').slideDown();
	$('.ccError').text('Invalid Zip Code')
});
zipField.addEventListener('keyup', () => {
	if ( zipField.value.match(ccZipRegex)) {
		successFormatting(zipField);
		cvvField.focus();
	} else {
		$('.ccError').slideDown();
		$('.ccError').text('Invalid Zip Code');
		errorFormatting(zipField);
	}
});

// CVV functionality 
cvvField.addEventListener('focus', () => {
	$('.ccError').slideDown();
	$('.ccError').text('Invalid CVV');
});
cvvField.addEventListener('keyup', () => {
	if ( cvvField.value.match(ccCvvRegex)) {
		$('.ccError').slideUp();
		successFormatting(cvvField);
	} else {
		$('.ccError').slideDown();
		$('.ccError').text('Invalid CVV');
		errorFormatting(cvvField);
	}
});

// display only selected payment method
const $cc = $('.credit-card');
const $paypal = $('.paypal');
const $bitcoin = $('.bitcoin');

$([ $paypal, $bitcoin ]).each(function() {
	$(this).hide();
})
paymentOptoions.addEventListener('change', (e) => {
	if (e.target.value == 'credit card') {
		contentDisplay($cc, $paypal, $bitcoin);
	} else
	if (e.target.value == 'paypal') {
		contentDisplay($paypal, $cc, $bitcoin);
	} else 
	if (e.target.value == 'bitcoin') {
		contentDisplay($bitcoin, $cc, $paypal);
	}
});

function contentDisplay($a, $na1, $na2) {
	$a.slideDown();
	$([ $na1, $na2 ]).each(function() {
		$(this).slideUp();
	});
}
/* <---------------------------------------------
			   		END PAYMENT INFO
----------------------------------------------- */











/* <---------------------------------------------
			      REGEX FUNCTIONALITY
----------------------------------------------- */

function checkCC(value) {
	const regex = /^(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{4})$/g;
 	return value.toString().replace(regex, "$1 - $2 - $3 - $4");
}
function reformatCC() {
	if (ccField.value.length == "16") {
    ccField.value = checkCC(ccField.value);
  } else {
    ccField.classList.add('success');
  }
}
function errorFormatting(element) {
	element.classList.add('error');
	element.classList.remove('success');
}
function successFormatting(element) {
	element.classList.add('success');
	element.classList.remove('error');
}



appendMessage(nameField.parentNode, "Invalid Name", "nameError");
appendMessage(mailField.parentNode, "Invalid Email", "mailError");
appendMessage(other.parentNode, "If you have selected 'Other' please fill in your title.", "roleError");
appendMessage(activityOptions.parentNode, "Please choose at least one activity.", "activityError");
appendMessage(ccField.parentNode.parentNode.parentNode.parentNode, "Invalid CC Number", "ccError")

appendPrice(activitiesSection, "Total price: $ " + price, "total-price")


function appendPrice(element, errorMessage, className) {
	let newElement = document.createElement('P');
	let message = document.createTextNode(errorMessage);
	newElement.appendChild(message);
	newElement.classList.add(className);
	
	let placement = element;
	placement.insertBefore(newElement, placement.childNodes[17])
}
function appendMessage(element, errorMessage, className) {
	let newElement = document.createElement('P');
	let message = document.createTextNode(errorMessage);
	newElement.appendChild(message);
	newElement.classList.add(className);
	
	let placement = element;
	placement.insertBefore(newElement, placement.childNodes[3])
}


// hide all error messages
$([ $('.nameError'), $('.mailError'), $('.roleError'), $('.activityError'), $('.ccError') ]).each(function() {
	$(this).hide();
})

// FORM SUBMITION
const submit = document.querySelector('button');
submit.addEventListener('click', function(e) {

	// <--------- BASIC INFO SRCTION ---------->
	/* -------------------------------------- */
	// If name value doesn't match name regex
	if ( !nameField.value.match(nameRegex)) {
		e.preventDefault();
		errorFormatting(nameField);
		$('.nameError').slideDown();
	} else {
		successFormatting(nameField);
		$('.nameError').slideUp();
	}
	/* -------------------------------------- */
	// If name value doesn't match name regex
	if (mailField.value === '') {
		$('.mailError').slideDown();
		$('.mailError').text('Email field is empty.')
	} else
	if (!mailField.value.match(emailRegex)) {
		e.preventDefault();
		errorFormatting(mailField);
		$('.mailError').slideDown();
		$('.mailError').text('Invalid Email')
	} else {
		successFormatting(mailField);
		$('.mailError').slideUp();
	}
	// If 'Other' is visible
	if ($otherInput.is(':visible') && $otherInput.val() == '') {
		e.preventDefault();
		$('.roleError').slideDown();
		errorFormatting(other);
	} 
	// <--------- CREDIT CARD SECTION --------->

		if (price == 0) {
			$('.activityError').slideDown();
		} else {
			$('.activityError').slideUp();
		}
	/* -------------------------------------- */

	// <--------- CREDIT CARD SECTION --------->

	/* -------------------------------------- */
	// If cc num value doesn't match cc regex
	if (!ccField.value.match(ccNumRegex) && $cc.is(':visible')) {
		e.preventDefault();
		errorFormatting(ccField);
		ccField.value = '';
		ccField.setAttribute("placeholder", "invalid");
	} else
	if (ccField.value.match(ccNumRegex) && $cc.is(":visible")) {
    reformatCC();
    successFormatting(ccField);
  }
	/* -------------------------------------- */
	// If zip value doesn't match zip regex
	if (!zipField.value.match(ccZipRegex) && $cc.is(':visible')) {
		e.preventDefault();
		errorFormatting(zipField);
		zipField.setAttribute("placeholder", "invalid");
	} else 
	if (zipField.value.match(ccZipRegex) && $cc.is(':visible')) {
		successFormatting(zipField);
	}
	/* -------------------------------------- */
	// If cvv value doesn't match cvv regex
	if (!cvvField.value.match(ccCvvRegex) && $cc.is(':visible')) {
		e.preventDefault();
		errorFormatting(cvvField);
		cvvField.setAttribute('placeholder', 'invalid');
	} else 
	if ( cvvField.value.match(ccCvvRegex) && $cc.is(':visible')) {
		successFormatting(cvvField);
	}
});
/* <---------------------------------------------
			   END REGEX FUNCTIONALITY
----------------------------------------------- */


