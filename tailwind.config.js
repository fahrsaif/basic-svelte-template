module.exports = {
    purge: ['./src/**/*.svelte', './src/**/*.css'],
    plugins: [require("daisyui")],
    theme: {
        container: {
            center: true,
            padding: '5rem',
        },
    }
}

