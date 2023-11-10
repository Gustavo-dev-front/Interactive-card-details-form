const form = document.querySelector(".form-box");
const card_name_input = document.querySelector("#card-name");
const card_number_input = document.querySelector("#card-number");
const card_exp_mm_input = document.querySelector("#card-exp-mm");
const card_exp_yy_input = document.querySelector("#card-exp-yy");
const card_cvc_input = document.querySelector("#card-cvc");

const inputs = [
  { input: card_name_input, regex: null },
  { input: card_number_input, regex: /^[0-9]+$/ },
  { input: card_exp_mm_input, regex: /^[0-9]+$/ },
  { input: card_exp_yy_input, regex: /^[0-9]+$/ },
  { input: card_cvc_input, regex: /^[0-9]+$/ },
];

function validateInput(input, regex) {
  let span_error = input.nextElementSibling;
  while (span_error.tagName !== "SPAN")
    span_error = span_error.nextElementSibling;

  let error_msg = "";
  if (!input.value.length) {
    input.classList.add("error");
    error_msg = "Can't be blank";
    span_error.innerText = error_msg;
  } else if (regex && !regex?.test(input.value)) {
    input.classList.add("error");
    error_msg = "Wrong format, numbers only";
    span_error.innerText = error_msg;
  } else {
    input.classList.remove("error");
  }
}

function validateForm(e) {
  e.preventDefault();
  inputs.forEach(({ input, regex }) => {
    validateInput(input, regex);
  });
}

form.addEventListener("submit", validateForm);
