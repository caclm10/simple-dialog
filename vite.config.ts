import tailwindcss from "@tailwindcss/vite";
import nodePath from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/simple-dialog/",
    plugins: [tailwindcss()],
    resolve: {
        alias: {
            "@": nodePath.resolve(__dirname, "src"),
        },
    },
});
