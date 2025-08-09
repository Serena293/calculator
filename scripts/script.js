const operatorArray = Array.from(document.querySelectorAll(".operator"));
const numberArray = Array.from(document.querySelectorAll(".number:not(.dot)"));
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");

const dotBtn = document.querySelector(".dot");

const display = document.querySelector(".screen");
const deleteBtn = document.querySelector(".delete");

let currentInput = "0";
let firstNumber = null;
let secondNumber = null;
let operatorSelected = null;
let resetScreen = false;
let btnDisable = false;


function clear() {
  display.textContent = "0";
  currentInput = "0";
  firstNumber = null;
  secondNumber = null;
  operatorSelected = null;
  resetScreen = false;
  dotBtn.disabled = false;
}

function displayUpdate(value) {
  if (display.textContent === "0" || resetScreen) {
    display.textContent = value;
    resetScreen = false;
  } else {
    display.textContent += value;
  }
  currentInput = display.textContent;

  operatorArray.forEach(operator => operator.classList.remove('selected'))
   
  console.log(`CurrentInput: ${currentInput}`);
}

numberArray.forEach((number) => {
  number.addEventListener("click", () => {
    displayUpdate(number.textContent);

    console.log(`Selected number ${number.textContent}`);
  });
});

operatorArray.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (operatorSelected !== null && !resetScreen) {
      secondNumber = parseFloat(display.textContent);
      console.log(
        `Second number is stored in a variable. let secondNumber = ${secondNumber}. Oparete function is called.`
      );
      operate();
    }
    firstNumber = parseFloat(display.textContent);
    console.log(
      `selected number is saved in a variable. let firstNumber = ${firstNumber}`
    );

     operator.classList.add('selected')
    operatorSelected = operator.textContent;
    console.log(`Operator Selected: ${operatorSelected}`);
    resetScreen = true;
  });
});

function operate() {
  if (typeof firstNumber !== "number" || isNaN(firstNumber)) {
    display.textContent = "Error";
    operatorSelected = null;
    return;
  }

  secondNumber = parseFloat(display.textContent);
  let result;

  switch (operatorSelected) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        result = "can't divide by zero";
      } else {
        result = firstNumber / secondNumber;
      }
      break;
    default:
      return;
  }

  if (result === "can't divide by zero") {
    display.textContent = result;
    currentInput = result;
    firstNumber = NaN;
  } else {
    display.textContent = parseFloat(result.toFixed(4));
    currentInput = result.toString();
    firstNumber = result;
  }

  operatorSelected = null;
  resetScreen = true;
}



equalBtn.addEventListener("click", () => {
 if (display.textContent === "Error") return; 
  if (operatorSelected && firstNumber !== null) {
    operate();
  }
});

clearBtn.addEventListener("click", clear);

dotBtn.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    if (display.textContent === "" || display.textContent === "0") {
      display.textContent = "0.";
    } else {
      displayUpdate(dotBtn.textContent);
    }
  }
});

function deleteDigit() {
    if (display.textContent.length === 1 || display.textContent === "0") {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }

  currentInput = display.textContent;

  if (!display.textContent.includes(".")) {
    dotBtn.disabled = false;
  }

} 
deleteBtn.addEventListener("click", deleteDigit);

// keyboard

document.addEventListener("keydown", (event) => {
  console.log("pressed on keyboard: " + event.key);

  if (/^[0-9]$/.test(event.key)) {
    displayUpdate(event.key);
    return;
  }

  if (["+", "-", "/", "*"].includes(event.key)) {
    event.preventDefault();
    if (operatorSelected !== null && !resetScreen) {
      secondNumber = parseFloat(display.textContent);
      operate();
    }
    firstNumber = parseFloat(display.textContent);
    operatorSelected = event.key;
    resetScreen = true;
    
    return;
  }

  if (event.key === "=" || event.key === "Enter") {
    event.preventDefault();
    if (operatorSelected && firstNumber !== null) {
      operate();
    }
    return;
  }

  if (event.key === ".") {
    event.preventDefault();
    if (!display.textContent.includes(".")) {
      if (display.textContent === "0" || resetScreen) {
        display.textContent = "0.";
      } else {
        displayUpdate(".");
      }
      dotBtn.disabled = true;
    }
    return;
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    deleteDigit();
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    clear();
  }
});