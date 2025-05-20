// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ["expo", "prettier"],
	ignorePatterns: ["/dist/*"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
		"comma-dangle": [
			"error",
			"always-multiline",
		],
	},
	overrides: [
		{
			// Test files only
			files: [
				"**/__tests__/**/*.[jt]s?(x)",
				"**/?(*.)+(spec|test).[jt]s?(x)",
			],
			extends: [
				"plugin:testing-library/react",
			],
		},
	],
};
