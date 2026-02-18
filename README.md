# Service Provider Dashboard

A modern React (Vite) dashboard for managing users, chat, notifications, and analytics. Built with React 18, React Router, Tailwind CSS v4, Ant Design v5, and Recharts.

## Tech Stack
- **Build Tool**: Vite 6
- **UI Library**: React 18, React Router 7
- **Styling**: Tailwind CSS 4 (with `@tailwindcss/vite`), arbitrary colors enabled
- **Components**: Ant Design 5
- **Charts**: Recharts
- **Icons**: react-icons
- **Rich Text**: react-quill

## Getting Started

### Prerequisites
- Node.js 18+ (recommended LTS)
- npm 9+ or pnpm/yarn (examples below use npm)

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
- Starts Vite dev server with fast HMR.
- App will be available at the URL printed by Vite (e.g., http://localhost:5173).

### Lint
```bash
npm run lint
```
- Runs ESLint (React, hooks, refresh plugins configured).

### Build
```bash
npm run build
```
- Produces a production build in `dist/`.

### Preview (serve production build locally)
```bash
npm run preview
```

## Project Structure (high level)
```
Izz_Dashboard/
├─ src/
│  ├─ pages/
│  │  ├─ Chat/Chat.jsx
│  │  ├─ Notifications/Notifications.jsx
│  │  ├─ Reports/Reports.jsx
│  │  ├─ dashboard/
│  │  │  ├─ DashboardPage.jsx
│  │  │  ├─ RecentUsers.jsx
│  │  │  └─ TotalView.jsx
│  │  ├─ userDetails/UserDetails.jsx
│  │  └─ auth/ (SignInPage.jsx, ForgetPassword.jsx, VerificationCode.jsx, ResetPassword.jsx)
│  ├─ routes/Routes.jsx
│  └─ shared/
│     ├─ Sidebar/Sidebar.jsx
│     └─ MainHeader/MainHeader.jsx
├─ package.json
└─ README.md
```

## Features
- **Chat**: Responsive chat UI with typing indicator and attachments (`src/pages/Chat/Chat.jsx`).
- **Notifications**: List with read/unread state, AntD theming (`src/pages/Notifications/Notifications.jsx`).
- **Dashboard**: Key metrics, charts with Recharts (`src/pages/dashboard`).
- **User Management**: Filter/search, block modal, view modal (`src/pages/userDetails/UserDetails.jsx`).
- **Auth Screens**: Sign in, reset, verification flows (`src/pages/auth/`).

## Theming
- Primary brand color: `#BEFFB6` (applied across pages via Tailwind arbitrary classes like `bg-[#BEFFB6]`).
- With Tailwind v4, arbitrary color utilities are supported. If you prefer semantic class names:
  - Create CSS variables in a global stylesheet and reference them via Tailwind’s CSS variables.
  - Or configure a Tailwind plugin/theme (when migrating to a custom config).
- Ant Design theming: components are themed via `ConfigProvider` `theme.components` entries in each page.

## Routing
- Routes are defined in `src/routes/Routes.jsx` using React Router 7.
- Update or add routes there when adding new pages.

## Development Guidelines
- **Components**: Keep components page-scoped under `src/pages/...` and shared UI under `src/shared/...`.
- **Styling**: Prefer Tailwind utility classes. Use arbitrary values for brand color: `[#BEFFB6]`.
- **State**: Use React hooks; no global store at present.
- **Linting**: Keep code lint-clean via `npm run lint`.
- **Commits**: Use clear, descriptive messages (e.g., `feat:`, `fix:`, `chore:`).

## Environment Variables
- None required for local development.
- If you add APIs, do not hardcode keys. Use environment files and Vite’s `import.meta.env`.

## Build & Deploy
- Build with `npm run build`.
- Serve `dist/` with any static hosting (Netlify, Vercel, Nginx).
- For SPA routing on static hosts, ensure 404s redirect to `index.html`.

## Troubleshooting
- **Windows line endings**: Git may warn about LF/CRLF conversions. Configure Git as needed:
  ```bash
  git config core.autocrlf true   # checkout CRLF on Windows, commit LF
  ```
- **Tailwind arbitrary colors not applied**: Ensure dev server restarted after changes; verify classes like `bg-[#BEFFB6]` are present in built CSS.
- **AntD styles**: Make sure `ConfigProvider` wraps components that need theming.

## License
MIT

## Acknowledgements
- React, Vite, Tailwind CSS, Ant Design, Recharts, React Router, React Icons, React Quill.
