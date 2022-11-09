const bill = document.getElementById("bill");
const person = document.getElementById("person");
const error = document.querySelector(".error");

//reset
const reset = document.querySelector(".reset");

// tip

const tip5 = document.querySelector(".tip-5");
const tip10 = document.querySelector(".tip-10");
const tip15 = document.querySelector(".tip-15");
const tip25 = document.querySelector(".tip-25");
const ti50 = document.querySelector(".tip-50");

// custom tip
const custom = document.querySelector(".custom-tip");
let customTip;

// tips
const tipPercentages = document.querySelectorAll(".tip-percentage");
const tips = [0.05, 0.1, 0.15, 0.25, 0.5];
let tipValue = [];
let tipA;
// amounts

const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");

function tipCal() {
  for (let i = 0; tipPercentages.length > i; i++) {
    if (tipPercentages[i].classList.contains("active")) {
      tipValue.pop();
      tipValue.push(tips[i]);
    }

    tipA = Number((bill.value * tipValue[0]).toFixed(2));
    tipAmount.textContent = `$${tipA.toFixed(2)}`;
    total.textContent = `$${(
      (Number(bill.value) + tipA) /
      person.value
    ).toFixed(2)}`;
  }
}

function customTipCal() {
  customTip = `${custom.value / 100}`;
  tipA = Number((bill.value * customTip).toFixed(2));
  tipAmount.textContent = `$${tipA.toFixed(2)}`;
  total.textContent = `$${((Number(bill.value) + tipA) / person.value).toFixed(
    2
  )}`;
}

bill.addEventListener("input", function () {
  if (bill.value === "") {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
    error.classList.add("hide");
  } else if (bill.value > 0) {
    if (person.value === "") {
      total.textContent = `$0.00`;
      error.classList.remove("hide");
    } else if (person.value > 0) {
      error.classList.add("hide");
      tipPercentages.forEach((tipPercentage) => {
        if (tipPercentage.classList.contains("active")) {
          tipCal();
        } else if (!tipPercentage.classList.contains("active")) {
          if (custom.value > 0) {
            customTipCal();
          } else {
            total.textContent = `$${(Number(bill.value) / person.value).toFixed(
              2
            )}`;
          }
        }
      });
    }
  }
});

person.addEventListener("input", function () {
  if (bill.value === "") {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
    error.classList.add("hide");
  } else if (bill.value > 0) {
    if (person.value === "") {
      error.classList.remove("hide");
    } else if (person.value > 0) {
      error.classList.add("hide");
      tipPercentages.forEach((tipPercentage) => {
        if (tipPercentage.classList.contains("active")) {
          tipCal();
        } else if (!tipPercentage.classList.contains("active")) {
          if (custom.value > 0) {
            customTipCal();
          } else {
            total.textContent = `$${(Number(bill.value) / person.value).toFixed(
              2
            )}`;
          }
        }
      });
    }
  }
});

custom.addEventListener("input", function () {
  if (custom.value === "") {
    total.textContent = `$0.00`;
  } else if (bill.value === "") {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
    error.classList.add("hide");
  } else if (custom.value > 0) {
    error.classList.add("hide");
    customTipCal();
    total.textContent = `$0.00`;
    if (person.value === "") {
      error.classList.remove("hide");
      total.textContent = `$0.00`;
    } else if (person.value > 0) {
      error.classList.add("hide");
    }
  }
});

custom.addEventListener("click", function () {
  tipPercentages.forEach((tipPercentage) => {
    tipPercentage.classList.remove("active");
  });
  if (custom.value === "") {
    total.textContent = `$0.00`;
  } else if (bill.value === "") {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
    error.classList.add("hide");
  } else if (custom.value > 0) {
    error.classList.add("hide");
    customTipCal();
    total.textContent = `$0.00`;
    if (person.value === "") {
      error.classList.remove("hide");
      total.textContent = `$0.00`;
    } else if (person.value > 0) {
      error.classList.add("hide");
    }
  }
});

for (let i = 0; tipPercentages.length > i; i++) {
  tipPercentages[i].addEventListener("click", function () {
    tipPercentages.forEach((tipPercentage) => {
      tipPercentage.classList.remove("active");
      tipPercentages[i].classList.add("active");

      if (tipPercentage.classList.contains("active")) {
        tipCal();
      }
    });

    if (person.value === "") {
      error.classList.remove("hide");
      total.textContent = `$0.00`;
    } else if (person.value > 0) {
      tipCal();
      error.classList.add("hide");
      custom.value = ``;
    }
  });
}

reset.addEventListener("click", function () {
  tipPercentages.forEach((tipPercentage) => {
    tipPercentage.classList.remove("active");
  });
  reset.classList.toggle("active");
  tipAmount.textContent = `$0.00`;
  total.textContent = `$0.00`;
  custom.value = ``;
  bill.value = ``;
  person.value = ``;
});
