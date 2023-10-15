import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PublicRoutes = () => {
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
    return (
        isLoggedIn ? <Navigate to="/" /> : <Outlet />
    )
}

export default PublicRoutes