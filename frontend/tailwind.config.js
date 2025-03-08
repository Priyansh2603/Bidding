module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          space: "#0b3d91",
          star: "#ffffff",
          nebula: "#ff007f",
        },
      },
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
      extend: {
        animation: {
          'slide-up': 'slideUp 2s ease-in-out',
          'slide-up-loop': 'slideUp 10s ease-in-out infinite', // Looping animation
        },
        keyframes: {
          slideUp: {
            '0%': { transform: 'translateY(10rem)', opacity: '0' },
            // '50%': { transform: 'translateY(25px)', opacity: '0.5' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  }
  