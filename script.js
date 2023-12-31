const form = document.querySelector(".form-box");
const card_name_input = document.querySelector("#card-name");
const card_number_input = document.querySelector("#card-number");
const card_exp_mm_input = document.querySelector("#card-exp-mm");
const card_exp_yy_input = document.querySelector("#card-exp-yy");
const card_cvc_input = document.querySelector("#card-cvc");
const card_name_output = document.querySelector("span.card-name");
const card_number_output = document.querySelector("span.card-number");
const card_exp_mm_output = document.querySelector("span.card-exp-mm");
const card_exp_yy_output = document.querySelector("span.card-exp-yy");
const card_cvc_output = document.querySelector("span.card-cvc");
const completed = document.querySelector(".completed");
const btn_continue = completed.querySelector("button");

const inputs = [
  {
    element: card_name_input,
    regex: /^[a-zA-Z]+(?:[ ]?[a-zA-Z]+)*$/,
    type: "card_name",
    error: false,
    output: card_name_output,
  },
  {
    element: card_number_input,
    regex: /^[0-9\s]+$/,
    type: "card_number",
    error: false,
    output: card_number_output,
  },
  {
    element: card_exp_mm_input,
    regex: /^[0-9]+$/,
    type: "card_exp",
    error: false,
    output: card_exp_mm_output,
  },
  {
    element: card_exp_yy_input,
    regex: /^[0-9]+$/,
    type: "card_exp",
    error: false,
    output: card_exp_yy_output,
  },
  {
    element: card_cvc_input,
    regex: /^[0-9]+$/,
    type: "card_cvc",
    error: false,
    output: card_cvc_output,
  },
];

function onChangeValidate(input) {
  if (!input.error)
    input.element.addEventListener("change", () => {
      validateInput(input);
    });
}

function validateInput(input) {
  let error_msg = "";
  let span_error = input.element.nextElementSibling;
  while (span_error.tagName !== "SPAN")
    span_error = span_error.nextElementSibling;

  if (!input.element.value.length) {
    input.element.classList.add("error");
    error_msg = "Can't be blank";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    input.error = true;
    return false;
  }

  if (input.type === "card_name" && !input.regex?.test(input.element.value)) {
    input.element.classList.add("error");
    error_msg = "Wrong format, letters only";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    return false;
  }

  if (input.regex !== "card_name" && !input.regex?.test(input.element.value)) {
    input.element.classList.add("error");
    error_msg = "Wrong format, numbers only";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    return false;
  }

  if (input.element.value.length < 19 && input.type === "card_number") {
    input.element.classList.add("error");
    error_msg = "At least 19 digits";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    return false;
  }

  if (input.element.value.length < 2 && input.type === "card_exp") {
    input.element.classList.add("error");
    error_msg = "At least 2 digits";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    return false;
  }

  if (
    input.element.id === "card-exp-mm" &&
    (+input.element.value === 0 || +input.element.value > 12)
  ) {
    input.element.classList.add("error");
    console.log(input.element.id, input.element.id === "card-exp-mm");
    error_msg = "Invalid, 1 to 12";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    return false;
  }

  if (input.element.value.length < 3 && input.type === "card_cvc") {
    input.element.classList.add("error");
    error_msg = "At least 3 digits";
    span_error.innerText = error_msg;
    onChangeValidate(input);
    return false;
  }

  input.element.classList.remove("error");
  return true;
}

function checkValidate() {
  let arrayValidate = [];
  inputs.forEach((input) => {
    arrayValidate.push(validateInput(input) === true);
  });
  const isValid = arrayValidate.every((input) => input === true);
  return isValid;
}

function handleChange(input, output) {
  const { type } = input;
  if (type === "card_name") {
    input.element.value = input.element.value.toUpperCase();
  } else if (type === "card_number") {
    let unmaskedValue = input.element.value.replace(/\s/g, "");
    let maskedValue = unmaskedValue.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    input.element.value = maskedValue;
  }
  output.innerText = input.element.value;
}

function handleSubmit(e) {
  e.preventDefault();
  const isValid = checkValidate();
  if (isValid) {
    form.classList.remove("active");
    completed.classList.add("active");
  }
}

form.addEventListener("submit", handleSubmit);

inputs.forEach((input) => {
  const { output } = input;
  input.element.addEventListener("keyup", () => handleChange(input, output));
});

btn_continue.addEventListener("click", () => {
  location.reload();
});
