const operatorArray = Array.from(document.querySelectorAll('.operator'));
const numberArray = Array.from(document.querySelectorAll('.number'));

const display = document.querySelector('.screen');

let whateverNumber;
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
    // let a = operators.textContent;
    // console.log(a);
  });
});