import { defineConfig } from "eslint/config";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vueslint from "eslint-plugin-vue";
import vueparser from "vue-eslint-parser";

import globals from "globals";

export default defineConfig(eslint.configs.recommended, tseslint.configs.strict, {
	extends: [
		eslint.configs.recommended,
		...tseslint.configs.strict,
		...vueslint.configs["flat/strongly-recommended"],
	],
	files: ["**/*.{ts,vue}"],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: globals.browser,
		parser: vueparser,
		parserOptions: {
			parser: tseslint.parser,
		},
	},
	rules: {
		"vue/html-indent": ["error", "tab", {}],
		"vue/require-v-for-key": "off", // if we don't need the key why add it

		"no-useless-assignment": "off", // currently broken for vue turn back on when fixed

		// handled by prettier
		"vue/html-self-closing": "off",
		"vue/max-attributes-per-line": "off",
		"vue/first-attribute-linebreak": "off",
		"vue/html-closing-bracket-newline": "off",
		"vue/singleline-html-element-content-newline": "off",
	},
});
