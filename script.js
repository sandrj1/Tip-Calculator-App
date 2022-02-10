class Calculator {
    constructor(bill, tip, people) {
        this.bill = bill;
        this.tip = tip;
        this.people = people;
    }
    getBill(bill) {
        this.bill = bill;
    }
    getTip (tip) {
        this.tip = tip;
    }
    getPeople(people) {
        this.people = people;
    }
    get tipAmount() {
        let totalTip = this.bill / 100 * this.tip
        let singleTip = totalTip / this.people;
        return singleTip.toFixed(2);
    }
    get total() {
        let singleTip = (this.bill / 100 * this.tip) / this.people;
        let partialBill = this.bill / this.people;
        let totalBill = partialBill + singleTip;
        return totalBill.toFixed(2);
    }
}

const inputBill = document.querySelector(".input--bill");
const radio = Array.from(document.getElementsByClassName("radio")); 
const inputCustom = document.querySelector(".input--custom");
const inputPeople = document.querySelector(".input--people");
const tipAmount = document.querySelector(".result__box--tip").lastChild;
const total = document.querySelector(".result__box--total").lastChild;
const reset = document.querySelector(".reset__button").firstChild;
const errorBill = document.querySelector(".article__title");
const errorCustom = document.querySelector(".section__title");
const errorPeople = document.getElementsByClassName("article__title")[1];

let calculator = new Calculator(142.55, 15, 5);

const result = function () {
    if (calculator.bill > 0 && calculator.tip > 0 && calculator.people > 0) {
        tipAmount.innerHTML = calculator.tipAmount;
        total.innerHTML = calculator.total;
        console.log("total", calculator.total);
        console.log("tip amount", calculator.tipAmount);
    }
}

const removeErrorBill = function () {
    errorBill.lastChild.style.display = "none";
    inputBill.parentNode.classList.remove("error");
}

const removeErrorCustom = function () {
    errorCustom.lastChild.style.display = "none";
    inputCustom.classList.remove("error");
    inputCustom.parentNode.classList.remove("error");
}

const removeErrorPeople = function () {
    errorPeople.lastChild.style.display = "none";
    inputPeople.parentNode.classList.remove("error");
}

const activeReset = function () {
    reset.classList.remove("inactive");
}

// Default values
window.onload = function () {
    radio.forEach(item => {
        if (item.value == 15) {
            item.checked = true;
            item.parentNode.classList.add("checked");
            item.parentNode.style.outlineOffset = "-1px";
        }
    })
    inputBill.value = calculator.bill;
    inputPeople.value = calculator.people;
    result();
}

// Set bill
inputBill.addEventListener("keyup", (e) => {
    calculator.getBill(e.target.value);
    console.log("bill", calculator.bill);
    if (calculator.bill == 0) {
        errorBill.lastChild.style.display = "block";
        inputBill.parentNode.classList.add("error");
    } else {
        removeErrorBill();
        result();
        activeReset();
    }
})

// Set tip
radio.forEach(item => {
    item.addEventListener("click", (e) => {
        if (e.target.checked && e.target.value === "custom") {
            item.parentNode.style.display = "none";
            inputCustom.parentNode.style.display = "inline-block";
            radio.forEach(item => {
                if (item.parentNode.classList.contains("checked")) {
                    item.parentNode.classList.remove("checked");
                }
            })
            inputCustom.focus();
            if (document.activeElement === inputCustom){
                console.log("event", document.activeElement);
                inputCustom.classList.add("active");
            }
            inputCustom.addEventListener("keyup", (e) => {
                calculator.getTip(e.target.value);
                console.log("tip-costum", calculator.tip);
                if (calculator.tip == 0) {
                    errorCustom.lastChild.style.display = "block";
                    inputCustom.classList.add("error");
                    inputCustom.parentNode.classList.add("error");
                } else {
                    removeErrorCustom();
                    result();
                    activeReset();
                }
            })
        } else if (e.target.checked) {
            calculator.getTip(e.target.value);
            console.log("tip", calculator.tip);
            radio.forEach(item => {
                if (item.parentNode.classList.contains("checked")) {
                    item.parentNode.classList.remove("checked");
                }
            })
            item.parentNode.classList.add("checked");
            removeErrorCustom();
            result();
            activeReset();
        }
    })
})

// Remove focus on inputCostum
window.addEventListener("click", (e) => {
    if (e.target.value !== "custom" && e.target.placeholder !== "Custom") {
        inputCustom.classList.remove("active");
    } else if (e.target.placeholder === "Custom") {
        inputCustom.classList.add("active");
    }
})

// Set custom tip on click
inputCustom.addEventListener("click", (e) => {
    radio.forEach(item => {
        item.parentNode.classList.remove("checked");
    })
    radio[radio.length - 1].checked = true;
    calculator.getTip(e.target.value);
    result();
})

// Set people
inputPeople.addEventListener("keyup", (e) => {
    calculator.getPeople(e.target.value);
    console.log("people", calculator.people);
    result();
    if (calculator.people == 0) {
        errorPeople.lastChild.style.display = "block";
        inputPeople.parentNode.classList.add("error");
    } else {
        removeErrorPeople();
        result();
        activeReset();
    }
})

reset.addEventListener("click", () => {
        calculator.getBill(null);
        calculator.getTip(null);
        calculator.getPeople(null);
        radio.forEach(item => {
            item.checked = false;
            item.parentNode.classList.remove("checked");
        })
        inputBill.value = null;
        inputCustom.value = null;
        inputPeople.value = null;
        tipAmount.innerHTML = "0.00";
        total.innerHTML = "0.00";
        removeErrorBill();
        removeErrorCustom();
    removeErrorPeople();
    reset.classList.add("inactive");
})