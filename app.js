const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");
const history = document.querySelector(".history");

let a = "";
let b = "";
let operator = null;
let historyStr = "";

display.textContent = 0;

const generateHistory = (fin) => {
  historyStr = "";
  if (fin) {
    historyStr = a + operator + b + "=";
    history.textContent = historyStr;
    return;
  }
  if (a) historyStr += a;
  if (operator) historyStr += operator;
  if (b) historyStr += b;
  history.textContent = historyStr;
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (operator, a, b) => {
  let result;
  if (operator === "+") result = add(a, b);
  if (operator === "-") result = subtract(a, b);
  if (operator === "×") result = multiply(a, b);
  if (operator === "÷") result = divide(a, b);
  return Math.round(result * 10000) / 10000;
};

const reset = () => {
  a = "";
  b = "";
  operator = null;
  history.textContent = "";
  display.textContent = "0";
};

[...buttons.children].forEach((button) => {
  button.addEventListener("click", (e) => {
    const isOperator = e.target.classList.contains("operator") ? true : false;
    const value = e.target.textContent;
    // console.log(value);

    if (value === "AC") {
      reset();
      return;
    }

    if (a && b && value === "=") {
      console.log("calculating!");
      generateHistory("=");
      a = operate(operator, +a, +b);
      display.textContent = a;
      b = "";
      return;
    } else if (value === "=") return;

    if (a && b && isOperator) {
      a = operate(operator, +a, +b);
      display.textContent = a;
      b = "";
      operator = value;
      return;
    } else if (isOperator) {
      operator = value;
      generateHistory();
      return;
    }

    if (!isOperator) {
      if (value === "." && display.textContent.includes(".")) return;
      if (!operator) {
        a += value;
        display.textContent = a;
      } else {
        b += value;
        display.textContent = b;
      }
    }

    generateHistory();
  });
});
