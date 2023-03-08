#!/usr/bin/env node

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { loadConfig } from "./manageConfig";
import { Rule } from "./manageConfig/schemas";

import CleanCss from "clean-css";

const main = async () => {
  const { outputPath, rules } = await loadConfig();
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) await mkdir(outputDir);
  const raw = rules.reduce((acc, rule) => acc + processRule(rule), "");

  const cleanCss = new CleanCss({ level: 2 });
  const { styles, warnings, errors } = cleanCss.minify(raw);
  if (errors.length) console.error(errors);
  if (warnings.length) console.error(warnings);
  await writeFile(outputPath, styles);
  console.log(`${outputPath} generated`);
};

const processRule = (rules: Rule) => {
  const patterns = Object.entries(rules.patterns).map((el) => ({
    selector: el[0],
    content: el[1],
  }));
  return patterns.reduce(
    (acc, { selector, content }) =>
      acc + processPattern(selector, content, rules.tokens),
    ""
  );
};

const processPattern = (
  selector: string,
  content: string,
  tokensMap: Record<string, string>
) => {
  const tokens = Object.entries(tokensMap).map((el) => ({
    key: el[0],
    value: el[1],
  }));
  return tokens.reduce(
    (acc, { key, value }) =>
      acc +
      `${parsePattern(selector, key, value)}{${parsePattern(
        content,
        key,
        value
      )}}`,
    ""
  );
};

const parsePattern = (pattern: string, key: string, value: string) =>
  pattern.replace(/KEY/g, key).replace(/VALUE/g, value);

main();
