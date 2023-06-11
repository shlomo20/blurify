module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#10b981",
          "secondary": "#7c3aed",    
          "accent": "#fda4af",       
          "neutral": "#f3e8ff",        
          "base-100": "#1d232a",        
          "info": "#3abff8",       
          "success": "#36d399",        
          "warning": "#fbbd23",         
          "error": "#f87272",
        },
      },
    ],
  },
}
