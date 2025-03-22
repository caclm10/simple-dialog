import type { AppDialog } from "@/components/app-dialog";

class AppDialogTrigger extends HTMLElement {
    get target() {
        return this.getAttribute("target");
    }

    connectedCallback(): void {
        const element = this.firstElementChild;
        if (!element || !this.target) return;

        element.addEventListener("click", () => {
            const dialog = document.querySelector<AppDialog>(
                `app-dialog[name=${this.target}]`,
            );

            if (dialog) {
                dialog.hasAttribute("open") ? dialog.close() : dialog.open();
            }
        });
    }
}

export { AppDialogTrigger };
