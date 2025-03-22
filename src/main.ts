import { AppDialog } from "@/components/app-dialog";
import { AppDialogTrigger } from "@/components/app-dialog-trigger";

customElements.define("app-dialog", AppDialog);
customElements.define("app-dialog-trigger", AppDialogTrigger);

let appTheme = localStorage.getItem("app-theme") || "dark";

document.addEventListener("DOMContentLoaded", () => {
    const themeToggler = document.getElementById("themeToggler");

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(appTheme);

    themeToggler.addEventListener("click", () => {
        document.documentElement.classList.remove(appTheme);
        appTheme = appTheme === "dark" ? "light" : "dark";
        document.documentElement.classList.add(appTheme);
        localStorage.setItem("app-theme", appTheme);
    });
});
