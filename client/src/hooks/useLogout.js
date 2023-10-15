import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"

const useLogout = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        dispatch(logout())
        window.location.reload()
    }
    return handleLogout
}

export default useLogout