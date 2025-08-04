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
        whateverNumber = display.textContent
    }
}
console.log(whateverNumber)
numberArray.forEach(numbers => {
  numbers.addEventListener('click', () => displayUpdate(numbers));
});

operatorArray.forEach(operators => {
  operators.addEventListener('click', () => {
    // let a = operators.textContent;
    // console.log(a);
  });
});