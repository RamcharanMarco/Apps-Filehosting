import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'

export const useSignup = () =>{

    const navigate = useNavigate()

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const {loginuser} = useStore()

    const signup = async(email:string,password:string) =>{
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            console.log(json)
            loginuser(json)
            setLoading(false)
            navigate(`/console/${json.user._id}`)
        }
    }

    return {signup, loading, error}
}