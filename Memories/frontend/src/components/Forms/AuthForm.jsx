import {useState } from 'react'
import { PulseLoader } from "react-spinners";
import {useGoogleLogin} from '@react-oauth/google';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';


const AuthForm = () => {
    const navigate = useNavigate();
    const [isSignin, setIsSignin] = useState(false);
    const [isLoding, setIsLoding] = useState(false);
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState('');
    const [errormsg, setError] = useState({})
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: ''
    })


    const handlePassword=(confirm, password ) => {
    if (!confirm) return setPass('');
    if (password === confirm) {
      setPass('true');
    } else {
        setPass('false');
    }
    }

    const registerUser = async (userData) => {
        const token = localStorage.getItem('token');
        if(!token || !userData)console.log('no user data')
        try {
            const data = {
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                sub: userData.sub,
            }
            const user = await api.post('/user/google/signin',
                data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            try{
                const userData = await api.get('https://www.googleapis.com/oauth2/v3/userinfo',{
                    headers: {
                        Authorization: `Bearer ${res.access_token}`,
                    },
                });
                if(userData.status === 200) {
                    localStorage.setItem('token',res.access_token);
                    registerUser(userData.data);
                    await setTimeout(() => {
                        navigate('/', { replace: true });
                    },3000);
                }
                
            }catch(err){
                console.error(err)
            }
        },
        onError: () => {
            console.log ('Login failed')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!isSignin) {
            if (!formData.firstName || formData.firstName.length < 3) {
                newErrors.firstName = 'First name must be at least 3 characters';
            }
            if (!formData.lastName || formData.lastName.length < 3) {
                newErrors.lastName = 'Last name must be at least 3 characters';
            }
            if (pass !== 'match') {
                newErrors.confirm = 'Passwords do not match';
            }
        }
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password || formData.password.length < 3) {
            newErrors.password = 'Password must be at least 3 characters';
        }
        
        setError(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);

        }
    }

  return (
    <div className='flex flex-col justify-center gap-2 bg-zinc-700 rounded-md w-100 lg:w-120'>
        <h1 className='my-4 font-semibold text-3xl'>{isSignin ? 'Sign In' : 'Sign Up'}</h1>
        <form className='flex flex-col gap-3 mx-3'onSubmit={handleSubmit} noValidate>
        { !isSignin &&
            <div className='flex justify-between gap-3'>
                <div className="relative w-full">
                    {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.firstName}</p>}
                    <input type="text" value={formData.firstName} onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} error={errormsg.firstName} required autoComplete="off"
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>FirstName</span>
                    </label>
                </div>
                <div className="relative w-full">
                    {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.lastName}</p>}
                    <input type="text" value={formData.lastName} onChange={(e) => {setFormData({...formData, lastName: e.target.value})}} required autoComplete="off"
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Last name</span>
                    </label>
                </div>
            </div>}
            <div className="relative w-full">
                {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.email}</p>}
                <input type='email' value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}} required autoComplete="off"
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Email</span>
                </label>
            </div>
            <div className="relative w-full">
                {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.password}</p>}
                <input type={show ? "text" : "password"} value={formData.password} onChange={(e) => {handlePassword(formData.confirm,e.target.value);setFormData({...formData, password: e.target.value})}} required autoComplete="off"
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Password</span>
                </label>
                <div onClick={() =>setShow(!show)} className='right-4 z-1 absolute flex justify-end p-2 rounded-full text-gray-400 -translate-y-9'>
                { show ? 
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                        </svg>
                    </> :
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                        </svg>
                    </>
                }
                </div>
            </div>
            {isSignin ? null : <>
            <div className='flex flex-col items-start w-full'>
                <p className='m-0.5 p-0 text-red-400 text-sm transition-all ease-in-out'></p>
                <div className="relative w-full">
                    <input id='confirm' type={show ? "text" : "password"} value={formData.confirm} onChange={(e) => {handlePassword(e.target.value,formData.password);setFormData({...formData, confirm: e.target.value})}} required autoComplete="off"
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                    />
                    <label className={`left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 ${pass === 'false' && 'peer-focus:text-[#f33a21e9] peer-valid:text-[#f33a21e9] '} ${ pass === 'true' &&'peer-focus:text-[#3df321db] peer-valid:text-[#3df321db]' } text-sm scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform`}>
                    {pass === 'false' &&'password should match'}{pass === 'true' &&'password confirmed'}{pass === '' && 'Confirm password'}
                    </label>
                </div>
            </div>
            </>}
            <div className='flex flex-row items-start gap-2 w-full'>
                <button type='submit' disabled={isLoding||pass === '' || pass == "false"} className='items-center bg-indigo-500 hover:bg-indigo-600 mt-3 w-1/2 h-10 transition-all ease-in-out'>{isLoding === false && (isSignin ? 'Sign In' : 'Sign Up')}{isLoding === true && <PulseLoader color="#fff"/>}</button>
                <button onClick={() => handleGoogleLogin()} className='items-center bg-linear-to-r/decreasing from-indigo-700 to-teal-400 mt-3 w-1/2 h-10 hover:scale-[1.05] transition-all ease-in-out'>Google</button>
            </div>
        </form>
        <div onClick={() => setIsSignin(!isSignin)} className='my-4 text-blue-400 text-sm text-center hover:underline cursor-pointer'>
            <p>{isSignin ? "Don't have an account?" : "Already have an account?"} <i className='text-blue-400'>{isSignin ? 'Sign Up' : 'Sign In'}</i></p>
        </div>
    </div>
  )
}

export default AuthForm;
