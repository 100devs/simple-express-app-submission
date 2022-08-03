module.exports = {
  content: ['./index.html', './views/index.ejs', './public/main.js',],
  theme: {
    fontFamily: {
      serif: ['Poppins', 'serif'],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
