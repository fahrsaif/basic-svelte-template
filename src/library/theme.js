import { darkMode } from "./store";

const html = document.getElementsByTagName("html")[0];

export function initTheme() {
    if (localStorage.getItem("theme") == null) {
        localStorage.setItem("theme", "light");
    }

    const theme = localStorage.getItem("theme");

    html.setAttribute("data-theme", theme);

    darkMode.set(theme == "dark");
}

export function toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    const targetTheme = currentTheme == "light" ? "dark" : "light";

    html.setAttribute("data-theme", targetTheme);

    darkMode.set(targetTheme == "dark");

    localStorage.setItem("theme", targetTheme);
}