const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const repassword = document.getElementById('re-password');

function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is Required`);
        } else if (input.id === 'email' && !isValidEmail(input.value)) {
            showError(input, `${getFieldName(input)} not valid`);
        } else if (input.id === 'username' && getLength(input, 3, 15)) {
            showError(input, `${getFieldName(input)} requires 3 to 15 characters in length`);
        } else if (input.id === 'password' && getLength(input, 6, 24)) {
            showError(input, `${getFieldName(input)} requires 6 to 24 characters in length`);
        } else if (input.id === 're-password' && (input.value != password.value)) {
            console.log(input.value + "  =/=  " +password.value);
            showError(input, `${getFieldName(input)} does not match`);
        } else {
            showSuccess(input);
        }
    });
}

function getLength(input, min, max) {
    if (input.value.length < min || input.value.length > max) {
        return true;
    } 
    return false;
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, password, repassword, email]);
});