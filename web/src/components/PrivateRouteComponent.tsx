import { Navigate } from 'react-router-dom';
import { tokenStore } from '@/store/localstrageStore'


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (!tokenStore.token) {
        return <Navigate replace to={ '/login' }/>
    }
    return children
}
export default PrivateRoute
