import { afterAllAnimations, afterAnimation } from "@/utils/animation";

class AppDialog extends HTMLElement {
    private isDragging: boolean = false;
    private startY: number = 0;
    private currentY: number = 0;
    private scrollThreshold: number = 20;

    get name() {
        return this.getAttribute("name");
    }

    get variant() {
        return this.getAttribute("variant");
    }

    get content() {
        return this.querySelector<HTMLElement>(`[data-app-dialog=content]`);
    }

    connectedCallback(): void {
        const dialog = this.firstElementChild as HTMLDialogElement | null;
        if (!dialog || !this.name) {
            throw new Error("Dialog is not valid.");
        }

        dialog.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement) {
                if (
                    event.target ===
                        this.querySelector(`[data-app-dialog=overlay]`) ||
                    event.target.getAttribute("data-app-dialog") === "close"
                ) {
                    this.close();
                }
            }
        });

        dialog.addEventListener("cancel", (event) => {
            event.preventDefault();

            this.close();
        });
    }

    open() {
        if (this.variant === "drawer") {
            this.addDragEvents();
        }

        const dialog = this.firstElementChild as HTMLDialogElement;
        const overlay = this.querySelector<HTMLElement>(
            `[data-app-dialog=overlay]`,
        );
        const content = this.querySelector<HTMLElement>(
            `[data-app-dialog=content]`,
        );

        dialog.showModal();

        if (overlay) {
            overlay.setAttribute("data-state", "opening");
            afterAnimation(overlay).then(() => {
                overlay.setAttribute("data-state", "active");
            });
        }

        if (content) {
            content.setAttribute("data-state", "opening");
            afterAnimation(content).then(() => {
                content.setAttribute("data-state", "active");
            });
        }
    }

    async close() {
        if (this.variant === "drawer") {
            this.removeDragEvents();
        }
        const dialog = this.firstElementChild as HTMLDialogElement;
        const overlay = this.querySelector<HTMLElement>(
            `[data-app-dialog=overlay]`,
        );
        const content = this.querySelector<HTMLElement>(
            `[data-app-dialog=content]`,
        );

        if (overlay) {
            overlay.setAttribute("data-state", "closing");
            afterAnimation(overlay).then(() => {
                overlay.removeAttribute("data-state");
            });
        }

        if (content) {
            content.setAttribute("data-state", "closing");
            afterAnimation(content).then(() => {
                content.removeAttribute("data-state");
            });
        }

        await afterAllAnimations(dialog);

        dialog.close();
    }

    private addDragEvents(): void {
        this.content!.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);

        this.content!.addEventListener("touchstart", this.onTouchStart);
        document.addEventListener("touchmove", this.onTouchMove, {
            passive: false,
        });
        document.addEventListener("touchend", this.onTouchEnd);
    }

    private removeDragEvents(): void {
        this.content!.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);

        this.content!.removeEventListener("touchstart", this.onTouchStart);
        document.removeEventListener("touchmove", this.onTouchMove);
        document.removeEventListener("touchend", this.onTouchEnd);
    }

    private onMouseDown = (event: MouseEvent) => this.startDrag(event.clientY);
    private onMouseMove = (event: MouseEvent) => this.drag(event.clientY);
    private onMouseUp = () => this.endDrag();

    private onTouchStart = (event: TouchEvent) =>
        this.startDrag(event.touches[0].clientY);
    private onTouchMove = (event: TouchEvent) => {
        if (this.isDragging) {
            event.preventDefault();
            this.drag(event.touches[0].clientY);
        }
    };
    private onTouchEnd = () => this.endDrag();

    private startDrag(startY: number): void {
        this.isDragging = true;
        this.startY = startY;
    }

    private drag(currentY: number): void {
        if (!this.isDragging) return;
        this.currentY = currentY;
        const diffY = this.currentY - this.startY;

        if (diffY < 0) return;

        this.content.style.transition = "none";

        if (Math.abs(diffY) > this.scrollThreshold) {
            console.log(`translate(0, ${Math.min(diffY, 200)}px)`);
            this.content.style.transform = `translate(0, ${Math.min(
                diffY,
                200,
            )}px)`;
        }
    }

    private endDrag(): void {
        if (!this.isDragging) return;
        this.isDragging = false;

        if (this.currentY > window.innerHeight * 0.7) {
            this.close().then(() => {
                this.content.style.transition = "none";
                this.content.style.transform = "";
            });
        } else {
            this.content.style.transition = "transform 150ms";
            this.content.style.transform = "translate(0, 0)";
        }

        this.currentY = 0;
        this.startY = 0;
    }
}

export { AppDialog };
