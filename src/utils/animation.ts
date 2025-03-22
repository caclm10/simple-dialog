function afterAnimation(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
        const computedStyle = getComputedStyle(element);

        // Cek apakah elemen benar-benar memiliki animasi
        if (computedStyle.animationName === "none") {
            resolve();
            return;
        }

        // Ambil semua durasi animasi
        const durations = computedStyle.animationDuration
            .split(",")
            .map((time) => {
                time = time.trim();
                return time.endsWith("ms")
                    ? parseFloat(time)
                    : parseFloat(time) * 1000;
            });

        const maxDuration = Math.max(...durations, 0);

        if (maxDuration === 0) {
            resolve();
            return;
        }

        let resolved = false;

        const onAnimationEnd = (event: Event) => {
            if (event.target === element) {
                resolved = true;
                element.removeEventListener("animationend", onAnimationEnd);
                resolve();
            }
        };

        element.addEventListener("animationend", onAnimationEnd);

        // Fallback jika `animationend` tidak terpanggil
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (!resolved) {
                    element.removeEventListener("animationend", onAnimationEnd);
                    resolve();
                }
            }, maxDuration + 50);
        });
    });
}

async function afterAllAnimations(parent: HTMLElement): Promise<void> {
    const children = Array.from(parent.children) as HTMLElement[];
    let remaining = children.length;

    if (remaining === 0) {
        return;
    }

    await Promise.all(children.map((child) => afterAnimation(child)));
}

export { afterAllAnimations, afterAnimation };
