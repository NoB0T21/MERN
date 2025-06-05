import {useGoogleLogin} from '@react-oauth/google';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const GoogleForm = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const registerUser = async (userData) => {
        setProgress(40)
        const token = localStorage.getItem('token');
        if(!token || !userData)console.log('no user data')
        try {
            const data = {
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                sub: userData.sub,
            }
            setProgress(55)
            const user = await api.post('/user/google/signin',
                data);
                setProgress(80)
        } catch (err) {
            console.error(err);
            setProgress(100)
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            try{
                setProgress(10)
                const userData = await api.get('https://www.googleapis.com/oauth2/v3/userinfo',{
                    headers: {
                        Authorization: `Bearer ${res.access_token}`,
                    },
                });
                if(userData.status === 200) {
                    setProgress(30)
                    localStorage.setItem('token',res.access_token);
                    registerUser(userData.data);
                    await setTimeout(() => {
                        setProgress(100)
                        navigate('/', { replace: true });
                    },2000);
                }
                
            }catch(err){
                setProgress(100)
                console.error(err)
            }
        },
        onError: () => {
            setProgress(100)
            console.log ('Login failed')
        }
    })

  return (
    <>
        <div className="top-0 left-0 absolute w-full max-w-xl">
        <div className="bg-transparent rounded-full h-[4px] overflow-hidden">
            <div
            className="bg-indigo-700 h-full transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
            />
        </div>
        </div>
        <button onClick={() => handleGoogleLogin()} className='items-center bg-linear-to-r/decreasing from-indigo-700 to-teal-400 mt-3 w-1/2 h-10 hover:scale-[1.05] transition-all ease-in-out'>Google</button>
    </>
  )
}

export default GoogleForm
