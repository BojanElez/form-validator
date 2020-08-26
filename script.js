const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lasttname");
const email = document.getElementById("email");
const radioMale = document.getElementById("male");
const radioFemale = document.getElementById("female");
const gender = document.getElementsByName("gender");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const passwordWarning = document.getElementById("password-warning");
const fields = document.querySelectorAll(".field");

//Regex
const length = "(?=.{7,})";
const characters = "(?=.*[!@#$%^&*])";
const num = "(?=.*[0-9])";
const upper = "(?=.*[A-Z])";
const regex = new RegExp(`^${length}${characters}${num}${upper}`);

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Select gender
function checkRadioButtons(inputArr) {
  inputArr.forEach(function (input) {
    if (inputArr[0].checked == true || inputArr[1].checked == true) {
      showSuccess(input);
    } else {
      showError(input.parentElement, "Gender");
    }
  });
}

//Handle passwod
function passwordRegex(input) {
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Password is not valid");
  }
}

password.addEventListener("keyup", function () {
  const length = password.value.length;
  const regexFun = regex.test(password.value.trim());
  if (regexFun && length > 9) {
    passwordWarning.innerHTML = "strong";
    document.querySelector(".strech").style.backgroundColor = "orange";
    document.querySelector(".strech").style.width = "250px";
  } else if (regexFun) {
    passwordWarning.innerHTML = "medium";
    document.querySelector(".strech").style.backgroundColor = "green";
    document.querySelector(".strech").style.width = "150px";
  } else {
    passwordWarning.innerHTML = "weak";
    document.querySelector(".strech").style.backgroundColor = "red";
    document.querySelector(".strech").style.width = "50px";
  }
});

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//On focus remove error message

fields.forEach(function (item, idx) {
  item.addEventListener("change", function (e) {
    el = e.target.parentElement;
    el.classList.remove("error");
    el.classList.remove("success");
  });
});

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  passwordWarning.innerHTML = "";
  checkRequired([firstname, lastname, email, password, password2]);
  checkRadioButtons([radioMale, radioFemale]);
  checkLength(firstname, 2, 18);
  checkLength(lastname, 2, 18);
  checkLength(password, 6, 30);
  checkEmail(email);
  passwordRegex(password);
  checkPasswordsMatch(password, password2);
});
