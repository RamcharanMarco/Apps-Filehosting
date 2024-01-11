import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'


export const useLogout = () =>{

    const {logoutuser} = useStore()
    const navigate = useNavigate()

    const logout = () =>{
        logoutuser()
        navigate('/login')
    }

    return {logout}
}