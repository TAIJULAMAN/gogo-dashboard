import {
    LayoutDashboard,
    Users,
    Store,
    Layers,
    Megaphone,
    Headphones,
    MessageCircle,
    Settings
} from "lucide-react";

export const AdminItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        link: "/",
    },
    {
        key: "userManagement",
        label: "User Management",
        icon: Users,
        link: "/dashboard/user-management",
    },
    {
        key: "sellermanagement",
        label: "Seller Management",
        icon: Store,
        link: "/dashboard/seller-management",
    },
    {
        key: "categorymanagement",
        label: "Category Management",
        icon: Layers,
        link: "/category-management",
    },
    {
        key: "englishAdPromotion",
        label: "Ads Promotion",
        icon: Megaphone,
        link: "/ads-promotion",
    },
    {
        key: "customerSupport",
        label: "Customer Support",
        icon: Headphones,
        link: "/support",
    },
    {
        key: "vendorChat",
        label: "Vendor Chat",
        icon: MessageCircle,
        link: "/chat",
    },
    {
        key: "settings",
        label: "Settings",
        icon: Settings,
        link: "/dashboard/Settings/profile",
        children: [
            {
                key: "profile",
                label: "Profile",
                link: "/dashboard/Settings/profile",
            },
            {
                key: "terms",
                label: "Terms & Condition",
                link: "/dashboard/Settings/Terms&Condition",
            },
            {
                key: "privacy",
                label: "Privacy Policy",
                link: "/dashboard/Settings/PrivacyPolicy",
            },
            {
                key: "faq",
                label: "Faq",
                link: "/faq",
            },
        ],
    },
];
