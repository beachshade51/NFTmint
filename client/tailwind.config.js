module.exports = {
   corePlugins: {
      container: false
   },
   content: [
      './src/**/*.{js,jsx,ts,tsx}',
   ],
   theme: {
      extend: {},
   },
   content: [
      // ...
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
   ],
   plugins: [
      require('flowbite/plugin'),
      function ({ addComponents }) {
         addComponents({
            '.container': {
               maxWidth: '100%',
               '@screen sm': {
                  maxWidth: '640px',
               },
               '@screen md': {
                  maxWidth: '768px',
               },
               '@screen lg': {
                  maxWidth: '1280px',
               },
               '@screen xl': {
                  maxWidth: '1400px',
               },
            }
         })
      }
   ],
}
