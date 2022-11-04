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
    
    if (input == ".") { //Checks if a decimal has already been added
        if (onSecondNumber === false && no1.includes(".") == true) {return}
        if (onSecondNumber === true && no2.includes(".") == true) {return}
    }
    
    if (onSecondNumber === false || operatorEntered === false) {
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
    if (operatorEntered === true) { //operates if another operator is entered without hitting the equals button again
        secondaryDisplay.textContent = operate() + input
        primaryDisplay.textContent = operate()
        no1 = operate()
        no2 = ""
        //operatorEntered = false
    }
    else {
        secondaryDisplay.textContent = no1 + input
        onSecondNumber = true 
        operatorEntered = true
    }

    operator = input
}

const equalsButton = document.querySelector("#equalsButton")
equalsButton.addEventListener("click", () => equalsButtonClicked())
function equalsButtonClicked() {
    secondaryDisplay.textContent = secondaryDisplay.textContent + no2
    primaryDisplay.textContent = operate()
    no1 = operate().toString()  //If the user wants to do further calculations with the answer
    no2 = ""
    operator = ""
    operatorEntered = false
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
    if (onSecondNumber === true) {  //Checks which number to remove the last character from
        if (no2 == ""){
            if (operator == "") {   //Even if you're on the second number, if you haven't entered anything into it yet & haven't entered an operator it removes the last character of the first number
                no1 = no1.slice(0, -1)
                primaryDisplay.textContent = no1
            } else {
            operator = ""           //Even if you're on the second number, if you haven't entered anything into it yet, it removes the operator
            secondaryDisplay.textContent = no1
            }
        } else {
        no2 = no2.slice(0, -1)      //Removes the last character from the second number
        primaryDisplay.textContent = no2
        }
    }
    else {
        no1 = no1.slice(0, -1)      //Removes the last character from the first number
        primaryDisplay.textContent = no1
    }
}

function operate() {

    //Converts the numbers from strings to integers
    no1 = +no1
    no2 = +no2

    if (operator == "") {return no1}  //If an operator hasn't been selected, it just returns the first number

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
            if (no2 == 0) {         //What happens if you try to divide by zero
                no1 = ""
                no2 = ""
                operator = ""
                onSecondNumber = false
                operatorEntered = false
                return "ERROR!"}
            if (Number.isInteger(no1/no2) == false) { //Checks if the answer is an integer or not & if it is...
                return (no1 / no2).toFixed(5).replace(/0+$/, "") //Rounds to 10 decimal places but truncates additional zeros
            } else {
                return no1 / no2
            }
    }
}

function reset() {  //Don't use because everywhere where it "resets" is slightly different
    onSecondNumber = false
    no1 = ""
    no2 = ""
}