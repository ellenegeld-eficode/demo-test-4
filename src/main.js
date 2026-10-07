import {
  createState,
  inputDigit,
  inputDecimal,
  inputPi,
  chooseOperator,
  evaluate,
  clear,
} from "./calculator.js";

const display = document.getElementById("display");
let state = createState();

function render() {
  display.textContent = state.display;
}

document.querySelector(".keys").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, value } = button.dataset;
  switch (action) {
    case "digit":
      state = inputDigit(state, value);
      break;
    case "decimal":
      state = inputDecimal(state);
      break;
    case "pi":
      state = inputPi(state);
      break;
    case "operator":
      state = chooseOperator(state, value);
      break;
    case "equals":
      state = evaluate(state);
      break;
    case "clear":
      state = clear();
      break;
  }
  render();
});

render();
