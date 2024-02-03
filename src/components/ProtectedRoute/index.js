import {Navigate, Outlet} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  
  return token===undefined?<Navigate to="/login" />:<Outlet/>
}

export default ProtectedRoute
