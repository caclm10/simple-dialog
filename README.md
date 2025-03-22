# Simple Dialog

A lightweight and accessible dialog implementation using the native `<dialog>` tag.  
This project provides **Dialog, Sheet, and Drawer** variations with styling inspired by [shadcn/ui](https://ui.shadcn.com/).

Built with modern web technologies:

- **HTML**
- **CSS (TailwindCSS v4)**
- **JavaScript (TypeScript)**
- **Web Components** (for modular and reusable components)

## Features

✅ Native `<dialog>` element for accessibility and performance  
✅ Supports **Dialog, Sheet, and Drawer** variations  
✅ Styled with **TailwindCSS**, inspired by shadcn/ui  
✅ Uses **Web Components** for a simple, reusable implementation  
✅ Lightweight and easy to integrate

### `<app-dialog>`

A custom dialog component based on the `<dialog>` tag.

#### Attributes:

- `name` (**required**) → A unique identifier for the dialog
- `variant` (**optional**) → Defines the dialog type:
    - `"default"` (default) → Standard modal (also used for **Sheet**)
    - `"drawer"` → Slide-in (draggable) drawer

### `<app-dialog-trigger>`

A button or element that opens a specified `<app-dialog>`.

#### Attributes:

- `target` (**required**) → The `name` of the target `app-dialog`.

## Setup

- Ensure [tailwindcss v4](https://tailwindcss.com/docs/installation) and [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) plugin already intalled on your project.

- Copy `dialog.css`, `animation.ts`, `app-dialog.ts`, and `app-dialog-trigger.ts` file to your project.

- Import `dialog.css` to your main css file.

```css
@import "tailwindcss";
@import "@/assets/dialog.css"; /* import here */

@plugin "tailwindcss-animate";
```

- Define web component in your main script file.

```ts
import { AppDialog } from "@/components/app-dialog";
import { AppDialogTrigger } from "@/components/app-dialog-trigger";

customElements.define("app-dialog", AppDialog);
customElements.define("app-dialog-trigger", AppDialogTrigger);
```

Adjust all the import path based on your preference. Now you're ready to go 🚀.

## Usage

```html
<app-dialog-trigger target="simpleDrawer">
    <button type="button" class="btn btn--ghost">Drawer</button>
</app-dialog-trigger>

<app-dialog name="simpleDrawer" variant="drawer">
    <dialog class="drawer" data-app-dialog="root">
        <div class="drawer__overlay" data-app-dialog="overlay"></div>
        <div class="drawer__content" data-app-dialog="content">
            <div class="drawer__handle"></div>
            <div class="drawer__header">
                <h5 class="drawer__title">Example Drawer</h5>
                <p class="drawer__description">
                    Example of drawer using HTML, CSS, and Javascript
                    (Typescript)
                </p>
            </div>

            <div class="drawer__footer">
                <button
                    type="button"
                    class="btn btn--ghost"
                    data-app-dialog="close"
                >
                    Close
                </button>
            </div>
        </div>
    </dialog>
</app-dialog>
```

You can see live demo [here](https://caclm10.github.io/simple-dialog).

## Contribution

Contributions to this project are welcome. If you'd like to contribute, please follow these guidelines:

- Open issues for bug reports or feature requests.
- Fork the repository and create a new branch for your contributions.
- Submit pull requests with clear descriptions and details of your changes.
