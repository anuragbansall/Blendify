# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Run with Docker

The project includes a `Dockerfile` for running the Vite dev server inside a container.

1. Build the image

```bash
docker build -t blendify .
```

2. Run the container and expose the dev port

Vite’s dev server needs to listen on `0.0.0.0` inside the container to be reachable from your host. If the default `npm run dev` doesn’t bind externally, run with `--host`:

```bash
# Standard run (may work if Vite binds externally)
docker run --rm -p 5173:5173 blendify

# If the site isn’t reachable, override the CMD to add --host
docker run --rm -p 5173:5173 blendify sh -c "npm run dev -- --host"
```

3. Open the app

Visit http://localhost:5173 in your browser.

Notes:

- If you see network errors connecting from your host, ensure the dev server is bound to `0.0.0.0` (the `--host` flag above). Alternatively, set `server.host` to `true` in your `vite.config.js`.
- On Windows, run these commands in PowerShell or Command Prompt.
