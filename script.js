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
        let totalTip = this.bill / 100 * this.tip;
        return (totalTip / this.people).toFixed(2);
    }

    get total() {
        return (this.bill / this.people).toFixed(2);
    }
}

const inputBill = document.querySelector(".input--bill");
const radio = Array.from(document.getElementsByClassName("radio")); 
const inputCustom = document.querySelector(".input--custom");
const inputPeople = document.querySelector(".input--people");
const tipAmount = document.querySelector(".result__box--tip").lastChild;
const total = document.querySelector(".result__box--total").lastChild;
const reset = document.querySelector(".result__box--total").parentNode.nextElementSibling;
const errorBill = document.querySelector(".article__title");
const errorCustom = document.querySelector(".section__title");
const errorPeople = document.getElementsByClassName("article__title")[1];
let calculator = new Calculator(null, null, null);

const result = function () {
    if (calculator.bill > 0 && calculator.tip > 0 && calculator.people > 0) {
        tipAmount.innerHTML = calculator.tipAmount;
        total.innerHTML = calculator.total;
        console.log("total", calculator.total);
        console.log("tip amount", calculator.tipAmount);
    }
}

inputBill.addEventListener("keyup", (e) => {
    calculator.getBill(e.target.value);
    console.log("bill", calculator.bill);
    if (calculator.bill == 0) {
        errorBill.lastChild.style.display = "block";
        inputBill.parentNode.classList.add("error");
    } else {
        errorBill.lastChild.style.display = "none";
        inputBill.parentNode.classList.remove("error");
        result();
    }
    
})

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
                    errorCustom.lastChild.style.display = "none";
                    inputCustom.classList.remove("error");
                    inputCustom.parentNode.classList.remove("error");
                    result();
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
        }
        result();
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

inputCustom.addEventListener("click", (e) => {
    radio.forEach(item => {
        item.parentNode.classList.remove("checked");
    })
    radio[radio.length - 1].checked = true;
    calculator.getTip(e.target.value);
    result();
})

inputPeople.addEventListener("keyup", (e) => {
    calculator.getPeople(e.target.value);
    console.log("people", calculator.people);
    result();
    if (calculator.people == 0) {
        errorPeople.lastChild.style.display = "block";
        inputPeople.parentNode.classList.add("error");
    } else {
        errorPeople.lastChild.style.display = "none";
        inputPeople.parentNode.classList.remove("error");
        result();
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
    inputBill.value = "";
    inputCustom.value = "";
    inputPeople.value = "";
    tipAmount.innerHTML = "0.00";
    total.innerHTML = "0.00";
})
