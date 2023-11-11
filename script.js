const form = document.querySelector(".form-box");
const card_name_input = document.querySelector("#card-name");
const card_number_input = document.querySelector("#card-number");
const card_exp_mm_input = document.querySelector("#card-exp-mm");
const card_exp_yy_input = document.querySelector("#card-exp-yy");
const card_cvc_input = document.querySelector("#card-cvc");

const inputs = [
  { input: card_name_input, regex: null, type: "card_name" },
  { input: card_number_input, regex: /^[0-9\s]+$/, type: "card_number" },
  { input: card_exp_mm_input, regex: /^[0-9]+$/, type: "card_exp" },
  { input: card_exp_yy_input, regex: /^[0-9]+$/, type: "card_exp" },
  { input: card_cvc_input, regex: /^[0-9]+$/, type: "card_cvc" },
];

function validateInput(input, regex, type) {
  let error_msg = "";
  let span_error = input.nextElementSibling;
  while (span_error.tagName !== "SPAN")
    span_error = span_error.nextElementSibling;

  if (!input.value.length) {
    input.classList.add("error");
    error_msg = "Can't be blank";
    span_error.innerText = error_msg;
    return false;
  }

  if (regex && !regex?.test(input.value)) {
    input.classList.add("error");
    error_msg = "Wrong format, numbers only";
    span_error.innerText = error_msg;
    return false;
  }

  if (input.value.length < 19 && type === "card_number") {
    input.classList.add("error");
    error_msg = "At least 19 digits";
    span_error.innerText = error_msg;
    return false;
  }

  if (input.value.length < 2 && type === "card_exp") {
    input.classList.add("error");
    error_msg = "At least 2 digits";
    span_error.innerText = error_msg;
    return false;
  }

  if (input.value.length < 3 && type === "card_cvc") {
    input.classList.add("error");
    error_msg = "At least 3 digits";
    span_error.innerText = error_msg;
    return false;
  }

  input.classList.remove("error");
  return true;
}

function checkValidate() {
  let arrayValidate = [];
  inputs.forEach(({ input, regex, type }) => {
    arrayValidate.push(validateInput(input, regex, type) === true);
  });
  const isValid = arrayValidate.every((item) => item === true);
  return isValid;
}

function handleChange() {}

function handleSubmit(e) {
  e.preventDefault();
  const isValid = checkValidate();
  console.log(isValid);
}

form.addEventListener("submit", handleSubmit);
