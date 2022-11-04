const primaryDisplay = document.querySelector("#primaryDisplay")
const secondaryDisplay = document.querySelector("#secondaryDisplay")
let no1 = ""
let no2 = ""
let operator = ""
let onSecondNumber = false
let operatorEntered = false


const numPad = Array.from(document.querySelectorAll(".numPad"))
numPad.forEach(button => {
    button.addEventListener("click", () => numberClicked(button.textContent))
}); 
function numberClicked(input) {
    
    if (input == ".") {
        if (onSecondNumber === false && no1.includes(".") == true) {return}
        if (onSecondNumber === true && no2.includes(".") == true) {return}
    }
    
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
    if (operatorEntered === true) {
        secondaryDisplay.textContent = operate() + operator
        primaryDisplay.textContent = operate()
        no1 = operate()
        no2 = ""
        operatorEntered = false
    }
    else {
        secondaryDisplay.textContent = no1 + input
        onSecondNumber = true 
        operatorEntered = true
    }
}

const equalsButton = document.querySelector("#equalsButton")
equalsButton.addEventListener("click", () => equalsButtonClicked())
function equalsButtonClicked() {
    secondaryDisplay.textContent = secondaryDisplay.textContent + no2
    primaryDisplay.textContent = operate()
    no1 = operate().toString()
    no2 = ""
    operator = ""
    //reset()
}

const clearButton = document.querySelector("#clearButton")
clearButton.addEventListener("click", () => clearDisplay())
function clearDisplay() {
    no1 = ""
    no2 = ""
    operator = ""
    onSecondNumber = false
    operatorEntered = false
    primaryDisplay.textContent = "0"
    secondaryDisplay.textContent = ""
}

const backButton = document.querySelector("#backButton")
backButton.addEventListener("click", () => removeLastCharacter())

function removeLastCharacter() {
    if (onSecondNumber === true) {
        if (no2 == ""){
            if (operator == "") {
                no1 = no1.slice(0, -1)
                console.log(no1)
                primaryDisplay.textContent = no1
            } else {
            operator = ""
            secondaryDisplay.textContent = ""
            }
        } else {
        no2 = no2.slice(0, -1)
        primaryDisplay.textContent = no2
        }
    }
    else {
        no1 = no1.slice(0, -1)
        primaryDisplay.textContent = no1
    }
}

function operate() {

    no1 = +no1
    no2 = +no2

    if (operator == "") {return no1}

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
            if (no2 == 0) {
                no1 = ""
                no2 = ""
                onSecondNumber = false
                return "ERROR!"}
            return no1 / no2
    }
}

function reset() {
    onSecondNumber = false
    no1 = ""
    no2 = ""
}