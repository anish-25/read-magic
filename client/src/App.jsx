import AllRoutes from './routes'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleRefresh } from './services/auth.services'
import { useEffect } from 'react'
import { hideLoader } from './slices/loaderSlice'
const App = () => {
  let refreshToken = localStorage.getItem('refresh')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (refreshToken) {
      handleRefresh(refreshToken, dispatch, navigate)
    }
    else {
      dispatch(hideLoader('pageLoader'))
    }
  }, [])

  return (
    <div>
      <AllRoutes />
    </div>
  )
}

export default App