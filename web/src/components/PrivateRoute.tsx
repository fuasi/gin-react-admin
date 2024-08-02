import { Navigate, useLocation } from 'react-router-dom';
import { tokenStore } from '@/store/localstrageStore'
import { ReactNode } from "react";


const PrivateRoute = ({ children } : { children : ReactNode }) => {
  const location = useLocation()
  if (!tokenStore.token) {
    return <Navigate replace to={ '/login' }/>
  } else {
    if (location.pathname === '/') return <Navigate to={ '/login' }/>
  }
  return children
}
export default PrivateRoute
