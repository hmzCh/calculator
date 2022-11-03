const primaryDisplay = document.querySelector("#primaryDisplay")
const secondaryDisplay = document.querySelector("#secondaryDisplay")
let no1 = ""
let no2 = ""
let operator = ""
let onSecondNumber = false

const numPad = Array.from(document.querySelectorAll(".numPad"))
numPad.forEach(button => {
    button.addEventListener("click", () => numberClicked(button.textContent))
}); 
function numberClicked(input) {

    if (onSecondNumber === false) {
        no1 = no1 + input
        primaryDisplay.textContent = no1
    }
    else {
        no2 = no2 + input
        primaryDisplay.textContent = no2
    }
};

const operators = Array.from(document.querySelectorAll(".operators"))
operators.forEach(button => {
    button.addEventListener("click", () => operatorClicked(button.textContent))
})
function operatorClicked(input) {
    operator = input
    if (onSecondNumber === true) {
        primaryDisplay.textContent(operate(input))
        reset()
    }
    else {
        secondaryDisplay.textContent = no1 + input
        onSecondNumber = true 
    }
}

const equalsButton = document.querySelector("#equalsButton")
equalsButton.addEventListener("click", () => equalsButtonClicked())
function equalsButtonClicked() {
    operate()
    reset()
}

const clearButton = document.querySelector("#clearButton")
clearButton.addEventListener("click", () => clearDisplay())
function clearDisplay() {
    equation = ""
    primaryDisplay.textContent = "0"
}

const backButton = document.querySelector("#backButton")
backButton.addEventListener("click", () => removeLastCharacter())

function removeLastCharacter() {
    equation = equation.slice(0, -1)
    primaryDisplay.textContent = equation
}

function operate() {
    switch (operator) {
        case "+":
            return no1 + no2
            break
        case "-":
            return no1 - no2
            break
        case "×":
            return no1 * no2
            break
        case "÷":
            return no1 / no2
    }
}

function reset() {
    onSecondNumber = false
    no1 = ""
    no2 = ""
}