import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({user}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/login');
        }
      }, [localStorage.getItem('token')]);

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw',fontSize: '2rem' }}>
     Hello {user.username}
    </div>
  )
}

export default Home
