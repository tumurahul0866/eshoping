export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        olive: {
          100: '#e7f1cf',
          900: '#33411f'
        },
        yellow: {
          100: '#fff3cd',
          900: '#8a6116'
        },
        red: {
          100: '#f8d7d0',
          900: '#7a2c1d'
        },
        sand: {
          100: '#f7eee3',
          900: '#bfa78b'
        },
        green: {
          100: '#d6e1b5',
          900: '#4f6d35'
        }
      }
    }
  },
  plugins: []
}
