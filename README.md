# Perdix-Design-Tokens

Perdix provides a easy to use and minimalist utility classes generator based on design tokens.

## Installation

```bash
npm install perdix-design-tokens
```

## Configuration

### Configuration file :

javascript :

```js
//perdix.config.js
module.exports = {
  outputPath: "css/tokens.css",
  rules: "css/tokens/*.json",
};
```

json :

```json
//perdixrc.json
{
  "outputPath": "css/generated.css",
  "rules": "css/tokens/*.json"
}
```

### Rules

```json
//css/tokens/colors.json
[
  {
    "tokens": {
      "0": "#f8f9fa",
      "1": "#f1f3f5",
      "2": "#e9ecef",
      "3": "#dee2e6",
      "4": "#ced4da",
      "5": "#adb5bd",
      "6": "#868e96",
      "7": "#495057",
      "8": "#343a40",
      "9": "#212529",
      "10": "#16191d",
      "11": "#0d0f12",
      "12": "#030507"
    },
    "patterns": {
      ":root": "--clr-KEY: VALUE;",
      ".colorKEY": "color: var(--clr-KEY);",
      ".bg-colorKEY": "background-color: var(--clr-KEY);"
    }
  }
]
```

## Cli usage

```bash
npm perdix-design-tokens
```
