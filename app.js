const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");
const history = document.querySelector(".history");

let a = "";
let b = "";
let operator = "";
let displayValue = "";
let recentValue = "";

const isFloat = (num) => num.includes(".");

const updateUI = () => {
  displayValue
    ? (display.textContent = displayValue)
    : (display.textContent = 0);
  history.textContent = recentValue;
};

const evaluate = (e) => {
  const isOperator = e.target.classList.contains("operator");
  const value = e.target.textContent;

  if (value === "AC") {
    clear();
    return;
  }

  if (a && b && operator && value === "=") {
    recentValue = `${a}${operator}${b}=`;
    a = operate(a, operator, b);
    displayValue = a;
    b = "";
    updateUI();
    return;
  }

  if (!a && isOperator) return;

  if (!isOperator) {
    if (!operator) {
      if (value === "." && isFloat(a)) return;
      if (a === "0" && value === "0") {
        a = "0";
        return;
      }
      if (!a && value === ".") {
        a = "0";
      }
      a += value;
    } else {
      if (value === "." && isFloat(b)) return;
      if (b === "0" && value === "0") {
        b = "0";
        return;
      }
      if (!b && value === ".") {
        b = "0";
      }
      b += value;
    }
  } else if (isOperator) {
    if (!operator) {
      operator = value;
    } else if (!b && operator) {
      operator = value;
    } else if (a && b && operator) {
      recentValue = `${a}${operator}${b}=`;
      a = operate(a, operator, b);
      displayValue = a;
      b = "";
      operator = value;
      updateUI();
    }
  }
  displayValue = `${a}${operator}${b}`;
  updateUI();
  // console.log({ a, operator, b }, value);
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

const operate = (a, operator, b) => {
  let result;
  switch (operator) {
    case "+":
      result = add(+a, +b);
      return Math.round(result * 100) / 100;
    case "-":
      result = subtract(+a, +b);
      return Math.round(result * 100) / 100;

    case "×":
      result = multiply(+a, +b);
      return Math.round(result * 100) / 100;

    case "÷":
      if (b === "0") return "ERR";
      result = divide(+a, +b);
      return Math.round(result * 100) / 100;
  }
};

const clear = () => {
  a = "";
  b = "";
  operator = "";
  displayValue = "";
  recentValue = "";
  updateUI();
};

display.textContent = 0;

[...buttons.children].forEach((button) => {
  button.addEventListener("click", evaluate);
});
