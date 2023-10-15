export const paths = {
    home: '/',
    signIn: '/sign-in',
    signUp: '/sign-up',
    createPassword: '/create-password',
    bookDetails: '/book-details/:bookId',
    cart: '/cart',
    checkout: '/checkout',
    success: '/success',
    orders: '/my-orders',
    popular: '/popular-books',
}

export const pathsWithoutHeader = [
    paths.signIn, paths.signUp, paths.createPassword
]