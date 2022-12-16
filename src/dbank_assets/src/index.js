import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {

  updateCurrentBal();
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  console.log("submitted");

  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    await dbank.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    await dbank.withdraw(outputAmount);
  }

  await dbank.compound();

  if (document.getElementById("withdrawal-amount").value.length != 0 || document.getElementById("input-amount").value.length != 0) {
    updateCurrentBal();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
  }
  button.removeAttribute("disabled");
})

async function updateCurrentBal() {
  var currentBal = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentBal * 100) / 100;
}