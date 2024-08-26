import('tailwindcss').Config

module.exports = {
    content: {
        relative: true,
        files: [
            "./index.html",
            "'./src/**/*.{js,ts,jsx,tsx}",

        ],
    },
    theme: {
        themes: ["light", "dark", "dracula"],
        // mytheme: {
        //     "primary": "#fde047",
        //     "primary-content": "#161202",
        //     "secondary": "#eab308",
        //     "secondary-content": "#130c00",
        //     "accent": "#d97706",
        //     "accent-content": "#110500",
        //     "neutral": "#374151",
        //     "neutral-content": "#d3d6da",
        //     "base-100": "#374151",
        //     "base-200": "#2e3745",
        //     "base-300": "#262e3a",
        //     "base-content": "#d3d6da",
        //     "info": "#d6d3d1",
        //     "info-content": "#101010",
        //     "success": "#a3e635",
        //     "success-content": "#0a1301",
        //     "warning": "#ef4444",
        //     "warning-content": "#140202",
        //     "error": "#ef4444",
        //     "error-content": "#140202",
        // },
    },
    plugins: [
        require('daisyui'),
    ],
}