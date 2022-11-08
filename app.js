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
let Tip;

// amounts

const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");

function tipCal(tip) {
  tipAmount.textContent = `$${(bill.value * tip).toFixed(2)}`;
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
      total.textContent = `$${(bill.value / person.value).toFixed(2)}`;
      error.classList.add("hide");
      for (let i = 0; tipPercentages.length > i; i++) {
        if (tipPercentages[i].classList.contains("active")) {
          tipValue.pop();
          tipValue.push(tips[i]);
        }
      }
      tipPercentages.forEach((tipPercentage) => {
        if (tipPercentage.classList.contains("active")) {
          tipCal(tipValue[0]);
        } else if (custom.value > 0) {
          customTip = `${custom.value / 100}`;
          tipCal(customTip);
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
      total.textContent = `$0.00`;
    } else if (person.value > 0) {
      total.textContent = `$${(bill.value / person.value).toFixed(2)}`;
      error.classList.add("hide");
      for (let i = 0; tipPercentages.length > i; i++) {
        if (tipPercentages[i].classList.contains("active")) {
          tipValue.pop();
          tipValue.push(tips[i]);
        }
      }
      tipPercentages.forEach((tipPercentage) => {
        if (tipPercentage.classList.contains("active")) {
          tipCal(tipValue[0]);
        } else if (custom.value > 0) {
          customTip = `${custom.value / 100}`;
          tipCal(customTip);
        }
      });
    }
  }
});

custom.addEventListener("input", function () {
  if (bill.value === "") {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
    error.classList.add("hide");
  } else if (bill.value > 0) {
    if (person.value === "") {
      error.classList.remove("hide");
      tipAmount.textContent = `$0.00`;
      total.textContent = `$0.00`;
    } else if (person.value > 0) {
      total.textContent = `$${(bill.value / person.value).toFixed(2)}`;
      error.classList.add("hide");
      customTip = `${custom.value / 100}`;
      tipCal(customTip);
    }
  }
});

custom.addEventListener("click", function () {
  tipPercentages.forEach((tipPercentage) => {
    tipPercentage.classList.remove("active");
  });
  if (custom.value === "") {
    tipAmount.textContent = `$0.00`;
  } else if (bill.value === "") {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
    error.classList.add("hide");
  } else if (bill.value > 0) {
    if (person.value === "") {
      error.classList.remove("hide");
    } else if (person.value > 0) {
      total.textContent = `${(bill.value / person.value).toFixed(2)}`;
      error.classList.add("hide");
      customTip = `${custom.value / 100}`;
      tipCal(customTip);
    }
  }
});

for (let i = 0; tipPercentages.length > i; i++) {
  tipPercentages[i].addEventListener("click", function () {
    tipCal(tips[i]);
    custom.value = ``;
    tipPercentages.forEach((tipPercentage) => {
      tipPercentage.classList.remove("active");
    });

    tipPercentages[i].classList.add("active");
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
