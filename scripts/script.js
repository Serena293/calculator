const operatorArray = Array.from(document.querySelectorAll(".operator"));
const numberArray = Array.from(document.querySelectorAll(".number:not(.dot)"));
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");

const dotBtn = document.querySelector(".dot")

const display = document.querySelector(".screen");
const deleteBtn = document.querySelector(".delete");

let currentInput = "0";
let firstNumber = null;
let secondNumber = null;
let operatorSelected = null;
let resetScreen = false;
let btnDisable =  false;

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
  console.log(`CurrentInput: ${currentInput}`)
}

numberArray.forEach(number => {
  number.addEventListener("click", () => {
    displayUpdate(number.textContent);
    console.log(`Selected number ${number.textContent}`)
  });
});2

operatorArray.forEach(operator => {
  operator.addEventListener("click", () => {
    if (operatorSelected !== null && !resetScreen) {
      secondNumber = parseFloat(display.textContent);
      console.log(`Second number is stored in a variable. let secondNumber = ${secondNumber}. Oparete function is called.`)
      operate();
    }
    firstNumber = parseFloat(display.textContent);
    console.log(`selected number is saved in a variable. let firstNumber = ${firstNumber}`)
    operatorSelected = operator.textContent;
    console.log(`Operator Selected: ${operatorSelected}`)
    resetScreen = true;
  });
});

function operate() {
  console.log(`operate() is called`)
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
        result = "Error";
        break;
      }
      result = firstNumber / secondNumber;
      break;
    default:
      return;
  }

  display.textContent = result;
  currentInput = result.toString();
  firstNumber = result;
  operatorSelected = null;
  resetScreen = true;
}

equalBtn.addEventListener("click", () => {
  if (operatorSelected && firstNumber !== null) {
    operate();
  }
});

clearBtn.addEventListener("click", clear);
dotBtn.addEventListener("click", ()=>{ 
  if (!display.textContent.includes('.')) {
    if (display.textContent === '' || display.textContent === '0') {
      display.textContent = '0.';
    } else {
      displayUpdate(dotBtn.textContent);
    }
  }})


  deleteBtn.addEventListener('click', ()=>{
      if (display.textContent.length === 1 || display.textContent === "0") {
    display.textContent = "0";
  } 
  else {
    display.textContent = display.textContent.slice(0, -1);
  }
  

  currentInput = display.textContent;
 
  if (!display.textContent.includes('.')) {
    dotBtn.disabled = false;
  }
  })