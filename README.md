# PressGang Child Theme — Grunt Init Template 🧰

This repository provides a `grunt-init` scaffold for creating **PressGang child themes**.

If you’re comfortable with WordPress theme development but new to PressGang, this template gives you a clean, predictable starting point with:
- 🧱 a ready-to-use child theme structure
- ⚙️ a simple, explicit Grunt-based build pipeline
- 🎨 modern SCSS organisation without hidden conventions

This repo **does not contain a theme**.  
It is a generator that creates a new project for you.

---

## Who This Is For 👋

This template is designed for developers who:

- build bespoke WordPress themes (not page-builder sites)
- value clarity over “magic”
- want a maintainable front-end pipeline without overengineering
- are happy working with npm, Grunt, and SCSS

You do **not** need prior PressGang experience to use this template.

---

## What This Template Generates 📦

Running this scaffold produces:

- ✅ a fully valid WordPress child theme
- 🗂️ a structured SCSS architecture suitable for long-lived projects
- 🔁 a Grunt build pipeline wrapped in npm scripts
- 📤 predictable output locations for CSS and JS
- 🚫 no global build dependencies after setup

You are expected to:
- extend the PressGang parent theme
- add or remove build steps as your project evolves
- commit the generated theme as your own project

---

## Golden Path (Recommended Workflow) ⭐

Follow these steps in order for the smoothest experience.

### 1. Install scaffolding tools (once) 🧱

These are global tools used only for project creation.

```bash
npm install --global grunt-cli grunt-init
```

No `sudo` should be required.

### 2. Install the PressGang child template 📥

`grunt-init` looks for templates in `~/.grunt-init/`.

```bash
git clone https://github.com/pressgang-wp/pressgang-child.git ~/.grunt-init/pressgang-child
```

### 3. Create your theme directory 📁

Inside your WordPress install:

```bash
wp-content/themes/<your-theme-slug>
```

⚠️ The folder name matters — it must match the `theme_slug` you provide later.

### 4. Run the scaffold 🏗️

Change into the theme directory and run:

```bash
grunt-init --force pressgang-child
```

The installer will prompt you for project details and generate the theme files.

If the current folder name does not match `theme_slug`, the scaffold will stop and warn you.  
This avoids subtle naming bugs later.

### 5. Install project dependencies 📦

Inside the generated theme:

```bash
npm install
```

Once a `package-lock.json` exists, prefer:

```bash
npm ci
```

**Why isn’t there a lockfile in this repo?** 🤔

This repository is a template. Each generated theme has unique metadata (name, author, package name), so dependency lockfiles should be created and committed per project.

### 6. Start development 🚀

```bash
npm run dev
```

This compiles assets once and starts a file watcher, ready for active development.

---

## Build Commands (Generated Theme) 🛠️

All commands run via **local Grunt**, wrapped by npm scripts.  
No global Grunt install is required after scaffolding.

| Command | What it does |
|--------|--------------|
| `npm run clean` | 🧹 Remove compiled assets |
| `npm run styles` | 🎨 Compile SCSS + PostCSS |
| `npm run scripts` | 📜 Concatenate & minify JS |
| `npm run lint` | 🔍 Lint SCSS with stylelint |
| `npm run dev` | ⚡ Clean → compile → watch |
| `npm run build` | 📦 Production-ready build |
| `npm run package` | 🗜️ Build and zip a release |

---

## SCSS Structure (Generated Theme) 🎨

The scaffold follows a layered, predictable SCSS structure:

```
scss/
├─ settings/     // design tokens and variables
├─ tools/        // mixins and helper utilities
├─ base/         // base element styles
├─ layout/       // layout-level partials
├─ components/   // reusable UI components
├─ blocks/       // block-specific styles
├─ pages/        // page-level overrides
├─ gutenberg/    // editor-only styles
└─ styles.scss   // root import file
```

This keeps concerns separated and scales well as projects grow.

---

## Output & Cache Busting 🔄

### Compiled Assets

- CSS
	- `css/styles.css`
	- `css/editor-styles.css`
- JS
	- `js/dist/<theme-slug>.js`
	- `js/min/<theme-slug>.min.js`

### Cache Busting Strategy

PressGang uses **theme versioning** as the source of truth.

- Bump the `Version` in `style.css` per release
- Enqueue assets using:

```php
wp_get_theme()->get( 'Version' )
```

This keeps cache invalidation simple and predictable.

---

## Why Grunt? 🤔

This repository exists as a **`grunt-init` template**, so Grunt remains a first-class build tool for compatibility with existing PressGang projects.

The task pipeline is intentionally explicit:
- 🧠 no hidden behaviour
- 🪄 no magic defaults
- 🔧 easy to extend or simplify

---

## Troubleshooting 🩺

**Node version issues**
- Required: **Node >= 18.18.0**
- See `engines` in the generated `package.json`

**`grunt` command not found**
- Use `npm run dev` or `npm run build`
- Avoid relying on a global `grunt` install

**Install failures**
- 🚫 Avoid `sudo`
- Ensure npm directories are user-writable
- Remove `node_modules` and retry `npm install`

**Deterministic installs / CI**
- Commit `package-lock.json` in your generated theme
- Use `npm ci` in CI environments

---

## Future Direction (Non-Blocking) 🔭

`grunt-init` remains supported and stable.

A future iteration may offer an **additional generator path** (e.g. `degit` or a small Node installer) while preserving:
- the same generated theme structure
- the same npm scripts
- the same PressGang conventions

This README reflects the **current, supported workflow**.

---

## License 📄

MIT
