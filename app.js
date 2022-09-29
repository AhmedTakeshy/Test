const operationBtns = document.querySelectorAll('.operation');
const numberBtns = document.querySelectorAll('.number');
const allClearBtn = document.querySelector(".all-clear")
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equals");
const upperDisplay = document.querySelector(".upper");
const lowerDisplay = document.querySelector(".lower");

class Calculator {
    constructor(upperDisplay, lowerDisplay) {
        this.upperDisplay = upperDisplay;
        this.lowerDisplay = lowerDisplay;
        this.clear();
    }

    clear() {
        this.lower = "";
        this.upper = "";
        this.operation = undefined;
    }

    delete() {
        this.lower = this.lower.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.lower.includes(".")) return;
        this.lower = this.lower.toString() + number.toString();
    }

    selectOperation(operation) {
        if (this.lower === "") return
        if (this.upper !== "") {
            this.compute()
        }
        this.operation = operation;
        this.upper = this.lower;
        this.lower = ''; 
    }

    compute() {
        let result
        const upperNum = parseFloat(this.upper);
        const lowerNum = parseFloat(this.lower);
        if (isNaN(upperNum) || isNaN(lowerNum)) return;

        if (this.operation === "+") {
            result = upperNum + lowerNum;
        } else if (this.operation === "-") {
            result = upperNum - lowerNum;
        } else if (this.operation === "*") {
            result = upperNum * lowerNum;
        } else if (this.operation === "÷") {
            result = upperNum / lowerNum;
        } else return;

        this.lower = result;
        this.upper = "";
        this.operation = undefined;
    }

    displayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split(".")[0])
        const decimalDigit = stringNumber.split(".")[1];
        let integerDisplay

        if (isNaN(integerDigit)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigit.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.lowerDisplay.innerText = this.displayNumber(this.lower);
        if (this.operation != null) {
            this.upperDisplay.innerText = `${this.displayNumber(this.upper) } ${this.operation}`;
        } else {
            this.upperDisplay.innerText = "";
        }
    }
}

const calculator = new Calculator(upperDisplay, lowerDisplay);

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()   
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.selectOperation(btn.innerText)
        calculator.updateDisplay()   
    })
})

equalBtn.addEventListener("click", btn => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtn.addEventListener("click", btn => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click", btn => {
    calculator.delete();
    calculator.updateDisplay();
})