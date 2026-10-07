export const MAX_DIGITS = 12;
export const ERROR_TEXT = "Error";

export function createState() {
  return {
    display: "0",
    operand: null,
    operator: null,
    overwrite: false,
    awaitingOperand: false,
    error: false,
  };
}

function errorState() {
  return {
    display: ERROR_TEXT,
    operand: null,
    operator: null,
    overwrite: true,
    awaitingOperand: false,
    error: true,
  };
}

function format(n) {
  return String(Number(n.toPrecision(MAX_DIGITS)));
}

// Returns the result, or null when the operation is invalid.
export function compute(a, operator, b) {
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) return null;
      result = a / b;
      break;
    case "%":
      if (b === 0) return null;
      result = a % b;
      break;
    default:
      return null;
  }
  return Number.isFinite(result) ? result : null;
}

export function inputDigit(state, digit) {
  if (state.error || !/^[0-9]$/.test(digit)) return state;
  if (state.overwrite || state.display === "0") {
    return { ...state, display: digit, overwrite: false, awaitingOperand: false };
  }
  if (state.display.replace(/[-.]/g, "").length >= MAX_DIGITS) return state;
  return { ...state, display: state.display + digit };
}

export function inputDecimal(state) {
  if (state.error) return state;
  if (state.overwrite) {
    return { ...state, display: "0.", overwrite: false, awaitingOperand: false };
  }
  if (state.display.includes(".")) return state;
  return { ...state, display: state.display + "." };
}

// Enters pi as the current number; the next digit starts a new number.
export function inputPi(state) {
  if (state.error) return state;
  return { ...state, display: format(Math.PI), overwrite: true, awaitingOperand: false };
}

export function chooseOperator(state, operator) {
  if (state.error) return state;
  // Changing the operator before entering a second operand.
  if (state.operator && state.awaitingOperand) return { ...state, operator };
  if (state.operator) {
    const result = compute(state.operand, state.operator, parseFloat(state.display));
    if (result === null) return errorState();
    return {
      ...state,
      display: format(result),
      operand: result,
      operator,
      overwrite: true,
      awaitingOperand: true,
    };
  }
  return {
    ...state,
    operand: parseFloat(state.display),
    operator,
    overwrite: true,
    awaitingOperand: true,
  };
}

export function evaluate(state) {
  if (state.error || !state.operator) return state;
  const result = compute(state.operand, state.operator, parseFloat(state.display));
  if (result === null) return errorState();
  return {
    display: format(result),
    operand: null,
    operator: null,
    overwrite: true,
    awaitingOperand: false,
    error: false,
  };
}

export function clear() {
  return createState();
}
