# Calculator

A basic web calculator written in plain HTML, CSS and JavaScript (ES modules, no build step).

## Features

- Addition, subtraction, multiplication, division and modulo (`%`)
- Decimal numbers
- Pi (`π`) constant
- Clear (`C`)
- Error display for division or modulo by zero (press `C` to recover)
- Operations are evaluated left to right (`2 + 3 × 4 = 20`)

## Run

ES modules require HTTP, so serve the folder instead of opening `index.html` directly:

```sh
npm start
```

Then open <http://localhost:8000>.

## Test

Requires Node.js 18 or newer.

```sh
npm test
```
