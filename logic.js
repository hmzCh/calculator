const primaryDisplay = document.querySelector("#primaryDisplay")
const secondaryDisplay = document.querySelector("#secondaryDisplay")
let equation = ""

const numPad = Array.from(document.querySelectorAll(".numPad"))
numPad.forEach(button => {
    button.addEventListener("click", () => addToDisplay(button.textContent))
}); 
function addToDisplay(input) {
    equation = equation + input
    primaryDisplay.textContent = equation;
};

const operators = Array.from(document.querySelectorAll(".operators"))
operators.forEach(button => {
    button.addEventListener("click", () => operatorClicked(button.textContent))
})

function operatorClicked(input) {
    equation = equation + input
    secondaryDisplay.textContent = equation
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

function operate(no1, no2, operator) {
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