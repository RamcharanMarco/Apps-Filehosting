import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { backend } from '../api/api'


export const useSendFiles = () =>{
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<any>(false)
    const [sent, setSent] = useState<any>(false)


    const {user} = useStore()
    const navigate = useNavigate()

    const sendFiles = async(
        files:string,emailto:string,emailfrom:string,message:string
        ) =>{
            const body = {      files,emailto,emailfrom,message
            }
            console.log('hookfiles', files)
            try{
                setLoading(true)
                setError(null)
                const response = await axios.post(`${backend}/uploads`,body, {
                    headers: {
                        'Content-Type': 'multipart/form-data'                      },
                })
                const json = await response.data
                setError(false)
                setSent(true)
          }catch(error){
              console.log(error)
              setError(true)
          }
          finally{
              setLoading(false)
              setTimeout(()=>{
                setSent(false)
              },2000)
          }
    }

    return {sendFiles, loading, error,sent}
}