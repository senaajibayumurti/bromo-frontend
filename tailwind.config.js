/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",

  ],
  theme: {
    extend: {
      colors: {
        'bromo-green-1': {
          '50': '#f2fcf1',
          '100': '#defadf',
          '200': '#bff3c0',
          '300': '#8ce98f',
          '400': '#53d556',
          '500': '#2cbb31',
          '600': '#1e9722',
          '700': '#1c7920',
          '800': '#1b601e',
          '900': '#184f1c',
          '950': '#082b0a',
        },
        'bromo-green-2': {
          '50': '#ecfdf3',
          '100': '#d1fadf',
          '200': '#a8f2c6',
          '300': '#6fe6a7',
          '400': '#36d183',
          '500': '#12b76a',
          '600': '#079455',
          '700': '#057747',
          '800': '#075e3a',
          '900': '#074d32',
          '950': '#022c1c',
        },
        'bromo-yellow': {
          '50': '#fdfde9',
          '100': '#fcfcc5',
          '200': '#faf88e',
          '300': '#f7ed4d',
          '400': '#f2dc1b',
          '500': '#e2c410',
          '600': '#c39a0b',
          '700': '#9c6f0c',
          '800': '#815812',
          '900': '#6e4815',
          '950': '#402608',
        },
        'bromo-orange': {
          '50': '#fffbed',
          '100': '#fff7d4',
          '200': '#ffeba8',
          '300': '#ffda71',
          '400': '#ffbf38',
          '500': '#fda712',
          '600': '#f79009',
          '700': '#c56a09',
          '800': '#9d530f',
          '900': '#7e4510',
          '950': '#442106',
        },  
        'bromo-red': {
          '50': '#fef3f2',
          '100': '#fee4e2',
          '200': '#ffcdc9',
          '300': '#fdaaa4',
          '400': '#f97970',
          '500': '#f04438',
          '600': '#de3024',
          '700': '#bb241a',
          '800': '#9a221a',
          '900': '#80231c',
          '950': '#460d09',
        },  
        'bromo-gray': {
          '50': '#f6f7f9',
          '100': '#edeef1',
          '200': '#d7dae0',
          '300': '#b3b9c6',
          '400': '#8a94a6',
          '500': '#667085',
          '600': '#565e73',
          '700': '#464c5e',
          '800': '#3d424f',
          '900': '#363a44',
          '950': '#24262d',
        },

        // backgroundImage: {
        //   'bromo-gradient-to-r': 'linear-gradient(to right, #F2DC1B, #1E9722)', // Kiri ke kanan
        //   'bromo-gradient-to-l': 'linear-gradient(to left, #F2DC1B, #1E9722)',  // Kanan ke kiri
        //   'bromo-gradient-to-tl-br': 'linear-gradient(to bottom right, #F2DC1B, #1E9722)', // Kiri atas ke kanan bawah
        //   'bromo-gradient-to-br-tl': 'linear-gradient(to top left, #F2DC1B, #1E9722)',   // Kanan bawah ke kiri atas
        //   'bromo-gradient-to-b': 'linear-gradient(to bottom, #F2DC1B, #1E9722)',  // Atas ke bawah
        //   'bromo-gradient-to-t': 'linear-gradient(to top, #F2DC1B, #1E9722)',     // Bawah ke atas
        // },
      }
    },
  },
  plugins: [],
}