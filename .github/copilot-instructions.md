# Copilot Instructions

## Styling Guidelines

Use a blue and green theme for all UI styling (HTML/CSS).

### Color palette

Define colors as CSS custom properties in `:root` and reference them with `var(--name)` instead of hard-coding hex values.

| Role               | Variable            | Value     |
| ------------------ | ------------------- | --------- |
| Page background    | `--bg`              | `#0b1d2a` |
| Surface / panel    | `--surface`         | `#12304a` |
| Primary (blue)     | `--primary`         | `#1e88e5` |
| Primary dark       | `--primary-dark`    | `#1565c0` |
| Primary light      | `--primary-light`   | `#64b5f6` |
| Accent (green)     | `--accent`          | `#2ecc71` |
| Accent dark        | `--accent-dark`     | `#1b9e56` |
| Accent light       | `--accent-light`    | `#7be3a5` |
| Text on dark       | `--text`            | `#f1f8ff` |
| Text on light      | `--text-dark`       | `#0b1d2a` |

### Usage rules

- Use blue for primary surfaces, buttons, and interactive elements.
- Use green for accents, highlights, active/confirm actions, and success states.
- Use dark navy for backgrounds and panels; keep text light on dark backgrounds.
- Do not introduce colors outside the blue/green/neutral palette (no orange, red, purple, etc.) unless required for error states.
- Hover: lighten the element (`--primary-light` / `--accent-light` or `filter: brightness(1.1)`). Active: darken (`--primary-dark` / `--accent-dark`).
- Focus: always provide a visible `:focus-visible` outline using `--accent-light`.
- Ensure text/background contrast meets WCAG AA (at least 4.5:1 for normal text).

### General style conventions

- Use `box-sizing: border-box` globally.
- Use rounded corners (8-16px) and consistent spacing (multiples of 4px).
- Use the system font stack: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- Keep styles in `styles.css`; avoid inline styles.
- Use class-based selectors with descriptive, kebab-case names; avoid IDs for styling.
- Use `rem` for font sizes and `px` for borders and fine spacing.
