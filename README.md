# GOGO Admin Dashboard

A premium, modern React (Vite) dashboard for managing users, riders, orders, and delivery parameters. Built with React 18, React Router, Tailwind CSS v4, Ant Design v5, and Recharts.

## Tech Stack
- **Build Tool**: Vite 6
- **UI Library**: React 18, React Router 7
- **Styling**: Tailwind CSS 4 (with `@tailwindcss/vite`)
- **Components**: Ant Design 5
- **Charts**: Recharts
- **Icons**: react-icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Project Structure
```
gogo-dashboard/
├─ src/
│  ├─ pages/
│  │  ├─ dashboard/          # Dashboard with User/Rider/Earning Growth charts
│  │  ├─ userDetails/        # User Management with status filters & actions
│  │  ├─ RiderManagement/    # Rider Management with approval & blocking
│  │  ├─ Parameter/          # Delivery charge & mileage settings
│  │  ├─ Listing/            # Order Management
│  │  ├─ auth/               # Authentication (SignIn, Reset, etc.)
│  │  └─ profile/            # Admin Profile & Password settings
│  ├─ routes/                # Router configuration
│  ├─ shared/                # Sidebar, Header, and common UI
│  └─ layout/                # Main dashboard layout
├─ package.json
└─ README.md
```

## Key Features
- **📊 Advanced Analytics**: Real-time charts for User Growth, Rider Growth, and Earnings using Recharts.
- **👥 User Management**: Full control over user accounts with status filtering (Active/Pending/Blocked), view profile, and approval/blocking actions.
- **🏍️ Rider Management**: Dedicated module for managing delivery riders, including document verification and approval workflows.
- **⚙️ Parameter Management**: Dynamic configuration for delivery charges based on mileage, base prices, and minimum distances.
- **🛍️ Order Management**: Overview and management of all delivery orders.
- **🎨 Premium UI**: No-black design system using a curated green palette (`#2D8C3C`), glassmorphism effects, and smooth transitions.

## Theming
- **Primary Brand Color**: `#2D8C3C` (Green).
- **Design System**: Premium "No-Black" aesthetic using soft grays (`#F2F2F2`) and white surfaces with subtle shadows.
- **Ant Design**: Customized components via `ConfigProvider` for a unified green branding across tables, modals, and inputs.

## Deployment
The project is configured for deployment on Vercel:
- **Production URL**: [https://gogo-dashboard.vercel.app](https://gogo-dashboard.vercel.app)

## License
MIT
