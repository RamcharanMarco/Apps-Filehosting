import {FC} from 'react'
import '../../styles/confirmlogout.scss'
import { useLogout } from '../../hooks/useLogout';

interface AppProps {
  toggleLogout: (params: any) => any;
}

const ConfirmLogout: FC<AppProps> = ({toggleLogout}) => {

  const {logout} = useLogout() 

  return (
    <div className="confirmlogout">
        <div className='content'>
        <div className='question'>
            <h1>are you sure???</h1>
        </div>
        <div className='confirm-nav'>
        <button onClick={toggleLogout}>cancel</button>
        <button onClick={logout}>logout</button>
        </div>
        </div>

    </div>
  )
}

export default ConfirmLogout