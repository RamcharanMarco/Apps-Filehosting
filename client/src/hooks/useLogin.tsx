import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'

export const useLogin = () =>{

    const navigate = useNavigate()

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const {loginuser} = useStore()

    const login = async(email:string, password:string) =>{
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({password, email})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            console.log(json)
            loginuser(json)
            localStorage.setItem('cm', JSON.stringify(json))
            setLoading(false)
            navigate(`/console/${json.user._id}`)
        }
    }

    return {login, loading, error}
}