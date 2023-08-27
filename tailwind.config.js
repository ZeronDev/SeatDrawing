/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        Cafe24Shiningstar: ["Cafe24Shiningstar"],
      }
    },
    colors: {
      "brown" : '#dcc492',
      "thickbrown" : '#cc6f18',
      "lightbrown" : '#ecdeb8',
      "justbrown" : '#db972a'
    }
  },
  plugins: [],
}
