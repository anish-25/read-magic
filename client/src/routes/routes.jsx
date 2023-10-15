import LandingPage from "../pages/landing";
import BookDetailsPage from "../pages/books-details";
import CartPage from "../pages/cart";

import SignInPage from "../pages/sign-in";
import SignUpPage from "../pages/sign-up";
import CreatePasswordPage from "../pages/create-password";

import { paths } from "./paths";
import LoaderHoc from "../hoc/LoaderHoc";
import CheckoutPage from "../pages/checkout";
import SuccessPage from "../pages/success";
import OrdersPage from "../pages/my-orders";
import PopularPage from "../pages/popular";

const components = {
    home: () => <LoaderHoc Component={LandingPage} />,
    signIn: () => <LoaderHoc Component={SignInPage} />,
    signUp: () => <LoaderHoc Component={SignUpPage} />,
    createPassword: () => <LoaderHoc Component={CreatePasswordPage} />,
    bookDetails: () => <LoaderHoc Component={BookDetailsPage} />,
}

export const publicRoutes = [
    {
        path: paths.signIn,
        element: <components.signIn />,
    },
    {
        path: paths.signUp,
        element: <components.signUp />,
    },
    {
        path: paths.createPassword,
        element: <components.createPassword />,
    }
];

export const privateRoutes = [
    {
        path: paths.cart,
        element: <CartPage />,
    },
    {
        path: paths.checkout,
        element: <CheckoutPage />
    },
    {
        path: paths.success,
        element: <SuccessPage />,
    },
    {
        path: paths.orders,
        element: <OrdersPage />,
    }
]

export const commonRoutes = [
    {
        path: paths.home,
        element: <LandingPage />,
    },
    {
        path: paths.bookDetails,
        element: <BookDetailsPage />,
    },
    {
        path: paths.popular,
        element: <PopularPage />,
    }
]