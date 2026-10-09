let current = "";      // the number being typed
let previous = "";     // the first number
let operator = null;   // + - * /
let justCalculated = false;

const display = document.getElementById("display");

function updateDisplay() {
  // shows the full expression as you type, e.g. 12+3
  display.value = previous + (operator || "") + current || "0";
}

function appendNumber(num) {
  if (justCalculated) {
    current = "";
    justCalculated = false;
  }
  if (num === "." && current.includes(".")) return;
  current += num;
  updateDisplay();
}

function chooseOperator(op) {
  if (current === "" && previous === "") return;
  if (current !== "" && previous !== "") calculate();
  if (current !== "") {
    previous = current;
    current = "";
  }
  operator = op;
  justCalculated = false;
  updateDisplay();
}

function calculate() {
  if (previous === "" || current === "" || operator === null) return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "*") result = a * b;
  if (operator === "/") {
    if (b === 0) {
      clearAll();
      display.value = "Cannot divide by 0";
      return;
    }
    result = a / b;
  }

  current = String(parseFloat(result.toFixed(10)));
  previous = "";
  operator = null;
  justCalculated = true;
  updateDisplay();
}

function clearAll() {
  current = "";
  previous = "";
  operator = null;
  justCalculated = false;
  updateDisplay();
}

function deleteLast() {
  current = current.slice(0, -1);
  updateDisplay();
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  else if (e.key === ".") appendNumber(".");
  else if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearAll();
});