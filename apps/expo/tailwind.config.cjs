/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@packages/tailwind-config")],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
};
