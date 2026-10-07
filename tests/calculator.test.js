import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createState,
  compute,
  inputDigit,
  inputDecimal,
  inputPi,
  chooseOperator,
  evaluate,
  clear,
  MAX_DIGITS,
} from "../src/calculator.js";

// Feeds a sequence of keys (e.g. ["7", "+", "8", "="]) through the calculator.
function press(keys, state = createState()) {
  for (const key of keys) {
    if (/^[0-9]$/.test(key)) state = inputDigit(state, key);
    else if (key === ".") state = inputDecimal(state);
    else if (key === "pi") state = inputPi(state);
    else if (key === "=") state = evaluate(state);
    else if (key === "C") state = clear();
    else state = chooseOperator(state, key);
  }
  return state;
}

test("compute handles each operator", () => {
  assert.equal(compute(7, "+", 8), 15);
  assert.equal(compute(7, "-", 8), -1);
  assert.equal(compute(7, "*", 8), 56);
  assert.equal(compute(8, "/", 4), 2);
  assert.equal(compute(10, "%", 3), 1);
});

test("compute returns null for invalid operations", () => {
  assert.equal(compute(5, "/", 0), null);
  assert.equal(compute(5, "%", 0), null);
  assert.equal(compute(5, "^", 2), null);
});

test("addition, subtraction, multiplication, division", () => {
  assert.equal(press(["7", "+", "8", "="]).display, "15");
  assert.equal(press(["9", "-", "4", "="]).display, "5");
  assert.equal(press(["6", "*", "7", "="]).display, "42");
  assert.equal(press(["8", "/", "4", "="]).display, "2");
});

test("modulo", () => {
  assert.equal(press(["1", "0", "%", "3", "="]).display, "1");
  assert.equal(press(["5", ".", "5", "%", "2", "="]).display, "1.5");
  assert.equal(press(["0", "-", "7", "=", "%", "3", "="]).display, "-1");
  assert.equal(press(["2", "0", "%", "6", "+", "1", "="]).display, "3");
});

test("modulo by zero shows Error", () => {
  const state = press(["5", "%", "0", "="]);
  assert.equal(state.display, "Error");
  assert.equal(state.error, true);
});

test("decimals", () => {
  assert.equal(press(["1", ".", "5", "*", "2", "="]).display, "3");
  assert.equal(press([".", "5"]).display, "0.5");
  assert.equal(press(["1", ".", "2", ".", "3"]).display, "1.23");
});

test("floating point results are rounded", () => {
  assert.equal(press(["0", ".", "1", "+", "0", ".", "2", "="]).display, "0.3");
});

test("operators chain left to right", () => {
  assert.equal(press(["2", "+", "3", "*", "4", "="]).display, "20");
  assert.equal(press(["2", "+", "3", "+"]).display, "5");
});

test("changing operator before second operand replaces it", () => {
  assert.equal(press(["5", "+", "-", "3", "="]).display, "2");
});

test("typing after a result starts a new number", () => {
  assert.equal(press(["2", "+", "3", "=", "7"]).display, "7");
});

test("repeated equals does nothing", () => {
  assert.equal(press(["2", "+", "3", "=", "="]).display, "5");
});

test("leading zeros are collapsed", () => {
  assert.equal(press(["0", "0", "5"]).display, "5");
});

test("input length is capped", () => {
  const state = press(Array(MAX_DIGITS + 5).fill("1"));
  assert.equal(state.display.length, MAX_DIGITS);
});

test("pi enters the constant", () => {
  assert.equal(press(["pi"]).display, "3.14159265359");
});

test("pi can be used as an operand", () => {
  assert.equal(press(["2", "*", "pi", "="]).display, "6.28318530718");
  assert.equal(press(["pi", "*", "2", "="]).display, "6.28318530718");
});

test("operator after pi keeps pi as the second operand", () => {
  assert.equal(press(["5", "+", "pi", "*", "2", "="]).display, "16.2831853072");
});

test("digit after pi starts a new number", () => {
  assert.equal(press(["pi", "4"]).display, "4");
});

test("pi is ignored in the error state", () => {
  assert.equal(press(["5", "/", "0", "=", "pi"]).display, "Error");
});

test("clear resets state", () => {
  assert.deepEqual(press(["5", "+", "3", "C"]), createState());
});

test("divide by zero shows Error and ignores input until clear", () => {
  let state = press(["5", "/", "0", "="]);
  assert.equal(state.display, "Error");
  state = press(["7", "+", ".", "="], state);
  assert.equal(state.display, "Error");
  state = press(["C", "7", "+", "1", "="], state);
  assert.equal(state.display, "8");
});

test("divide by zero in a chained operation shows Error", () => {
  assert.equal(press(["5", "/", "0", "+"]).display, "Error");
});

test("non-digit input to inputDigit is ignored", () => {
  const state = createState();
  assert.equal(inputDigit(state, "a"), state);
  assert.equal(inputDigit(state, "12"), state);
});
