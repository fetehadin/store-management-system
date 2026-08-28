/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#0A4D3C',
        accentLime: '#D4F870',
        emeraldGreen: '#107c61',
        surfaceWhite: '#FFFFFF',
        textDark: '#1A1A1A',
        textSlate: '#64748b'
      }
    },
  },
  plugins: [],
}