import { Search, ShoppingCart, Truck, User, UserPlus } from "lucide-react"

export const NavbarLinks = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/popular-books",
        label: "Popular",
    },
    {
        href: "/services",
        label: "Services",
    },
    {
        href: "/contact",
        label: "Contact",
    }
]

export const NavbarIcons = [
    {
        href: "/search",
        icon: Search,
        name: "Search",
        private: false
    },
    {
        href: "/cart",
        icon: ShoppingCart,
        name: "ShoppingCart",
        private: true
    },
    {
        href: "/",
        icon: User,
        name: "User",
        private: false
    },
    {
        href: "/",
        icon: User,
        name: "Avatar",
        private: true
    },
]

export const mobileNavIcons = [
    {
        href: "/cart",
        icon: ShoppingCart,
        name: "My Cart",
        private: true
    },
    {
        href: "/my-orders",
        icon: Truck,
        name: "My Orders",
        private: true
    },
    {
        href: "/sign-in",
        icon: User,
        name: "Sign in",
        private: false
    },
    {
        href: "/sign-in",
        icon: UserPlus,
        name: "Sign up",
        private: false
    },
    {
        href: "/my-profile",
        icon: User,
        name: "Profile",
        private: true
    },
    {
        href: "/",
        icon: User,
        name: "Logout",
        private: true
    }
]

export const server = ""