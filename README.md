# Perdix-Design-Tokens

Perdix provides a easy to use and minimalist utility classes generator based on design tokens.

## Installation

```bash
pnpm i -D perdix-design-tokens
```

## Configuration

### Configuration file :

javascript :

```js
// perdix.config.js
module.exports = {
  outputPath: "css/tokens.css",
  rules: "css/tokens/*.json",
};
```

json :

```json
// perdixrc.json
{
  "outputPath": "css/generated.css",
  "rules": "css/tokens/*.json"
}
```

| Property     | Type                | Description                                                                                                                                        |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `outputPath` | `string`            | The path where the generated CSS file will be saved.                                                                                               |
| `rules`      | `string` or `array` | The path or paths to the JSON files that define the design tokens and CSS patterns. Can be a string or an array of strings that use glob patterns. |

### Rules

The rules property in the configuration file specifies the location of the JSON files that define the design tokens and their usage. You can also define the rules directly in the configuration file using the rules property. Here is an example of a colors.json file:

```json
// css/tokens/colors.json
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

The patterns object in the rules file defines CSS patterns that use the design tokens specified in the tokens object. These patterns are written using the KEY and VALUE placeholders, which will be replaced with the actual token keys and values during the generation process.

| Property   | Type     | Description                                                                                                                                                                                            |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tokens`   | `object` | An object that contains the design tokens as key-value pairs. The keys are arbitrary labels that correspond to a specific value, which can be a color, a font size, or any other design-related value. |
| `patterns` | `object` | An object that defines CSS patterns that use the design tokens. The patterns are written using the `KEY` placeholder, which is replaced with the actual token keys during the generation process.      |

## Cli usage

To generate CSS files based on the design tokens and patterns specified in the configuration file, run the following command:

```bash
pnpm perdix
```
