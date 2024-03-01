/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      // <<<<<< Text >>>>>> //
      // 'color-': '#', // primary-
      'color-white': '#FCFCFF',

      // <<<<<< Text >>>>>> //
      'color-text': '#2b6273', // primary-700
      'color-text-unfocus': '#9ca3af', // gray-400
      'color-text-gray': '#9ca3af', // gray-400
      'color-subtitle': '#',
      'color-body': '#',
      'color-click': '#',

      // <<<<<< Button >>>>>> //
      'color-button-1': '#3494a6', // primary-500
      'color-button-1-hover': '#2e798c', // primary-600
      'color-textbutton-1': 'FCFCFF', // white

      'color-button-2': '#FCFCFF', // white
      'color-button-2-hover': '#f0fafb', // primary-50
      'color-text-button-2': '#3494a6', // primary-500

      // <<<<<< Border >>>>>> //
      'color-border': '#2e798c', // primary-600
      'color-border-red': '#d62246', // red-600
      'color-border-unfocus': '#e5e7eb', // gray-200

      // <<<<<< Icon >>>>>> //
      'color-icon-1': '#3494a6', // primary-500
      'color-icon-unfocus': '#e5e7eb', // gray-200
      'color-icon-red': '#d62246', // red-600

      // <<<<<< Color >>>>>> //
      'color-error': '#ef445f', // red-500
      'color-error-hover': '#d62246', // red-600

      'color-info': '#2b59c3', // info-700
      'color-info-hover': '#2a4ba3', // info-800

      // <<<<<< Divide >>>>>> //
      'color-divide': '#3494a6', // primary-500

      // <<<<<< bg submenu >>>>>> //
      'color-bg-submenu': '#f0fafb', // primary-50

      // <<<<<< bg >>>>>> //
      'color-bg': '#eff1f7',

      //'color_text': '#264a7e', // blue-700

      //'color_focus': '#5a619b', // 700
      //'color_unfocus': '#b6c2da', // 300

      //'color_error': '#d62246',  //red-600
      //'color_error_hover': '#b9173c', // red-700

      //'color_info': '#2FB8FF',
      //'color_info_hover': '#1182E4',

      //'color_btn_accept': '#5a619b', // 700
      //'color_btn_accept_hover': '#7887b9', // 500

      //'color_bg': '#eff1f7',

      'primary': {
        '50': '#f0fafb',
        '100': '#daf1f3',
        '200': '#b9e4e8',
        '300': '#88ced8',
        '400': '#43aabb',
        '500': '#3494a6', // key  
        '600': '#2e798c',
        '700': '#2b6273',
        '800': '#2b535f',
        '900': '#274652',
        '950': '#152d37',
      },

      'red': {
        '50': '#fff1f2',
        '100': '#fee5e7',
        '200': '#fdced3',
        '300': '#faa7af',
        '400': '#f77585',
        '500': '#ef445f',
        '600': '#d62246', // key
        '700': '#b9173c',
        '800': '#9b1638',
        '900': '#851636',
        '950': '#4a0719',
      },

      'info': {
        '50': '#f0f7fe',
        '100': '#deebfb',
        '200': '#c4def9',
        '300': '#9cc9f4',
        '400': '#6dabed',
        '500': '#4a8ce7',
        '600': '#3570db',
        '700': '#2b59c3', // key
        '800': '#2a4ba3',
        '900': '#274281',
        '950': '#1c2a4f',
      },
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true
    })
  ],
}

