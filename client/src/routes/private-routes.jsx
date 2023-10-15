import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/layout/loader'
const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
  const pageLoader = useSelector((state) => state.loader.pageLoader)

  if(pageLoader){
    return (
      <Loader/>
    )
  }
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes