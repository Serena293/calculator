const operatorArray = Array.from(document.querySelectorAll('.operator'));
const numberArray = Array.from(document.querySelectorAll('.number'));
let result = []

const display = document.querySelector('.screen');

let whateverNumber;
let chosenOperator;
let whateverNumber1 = null;
function displayUpdate(element) {
  if (display.textContent === '0') {
    display.textContent = element.textContent;
  } else {
    display.textContent += element.textContent;
  }
  return display.textContent
}
numberArray.forEach(number => {
  number.addEventListener('click', () => {
    whateverNumber = displayUpdate(number);
    console.log(whateverNumber)
  });
});
operatorArray.forEach(operators => {
  operators.addEventListener('click', () => {
     result.push(whateverNumber);
     console.log(result);
     chosenOperator = displayUpdate(operators);
     result.push(operators.textContent)
     console.log(operators);
  });
});
