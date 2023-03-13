/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.tsx"],
  // @ts-ignore
  presets: [require("@packages/tailwind-config")],
};

module.exports = config;
