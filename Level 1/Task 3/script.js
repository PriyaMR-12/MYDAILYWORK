
const display = document.getElementById('display');
let currentInput = '0';  
let firstValue = null;   
let operator = null;     // Store the operator (+, -, *, /)
let waitingForSecondValue = false;  // To track if we are waiting for the second value

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        const buttonText = this.textContent;

        if (!action) {
            // If the button is a number or decimal point
            handleNumber(buttonText);
        } else if (action === 'clear') {
            resetCalculator();
        } else if (action === 'delete') {
            deleteLastInput();
        } else if (action === 'operator') {
            handleOperator(buttonText);
        } else if (action === 'equal') {
            handleEqual();
        }

        updateDisplay();
    });
});

function handleNumber(number) {
    if (waitingForSecondValue) {
        currentInput = number;
        waitingForSecondValue = false;
    } else {
        // Prevent adding multiple decimal points
        if (number === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondValue) {
        // Change the operator if one is already selected
        operator = nextOperator;
        return;
    }

    if (firstValue === null && !isNaN(inputValue)) {
        firstValue = inputValue;
    } else if (operator) {
        const result = calculate(firstValue, operator, inputValue);
        currentInput = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function handleEqual() {
    const inputValue = parseFloat(currentInput);

    if (operator && !waitingForSecondValue) {
        const result = calculate(firstValue, operator, inputValue);
        currentInput = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
        operator = null;
        waitingForSecondValue = false;
    }
}

function calculate(first, operator, second) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

function resetCalculator() {
    currentInput = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function deleteLastInput() {
    currentInput = currentInput.slice(0, -1) || '0';
}

function updateDisplay() {
    display.textContent = currentInput;
}
