import {useContext, useState } from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google'
import { PulseLoader } from "react-spinners";
import { api } from '../../utils/api';
import { HidePass, ShowPass } from '../Icons/Icons';
import { useNavigate } from 'react-router-dom';
import GoogleForm from './GoogleForm';
import {DataContext} from '../../context/DataProvider'


const AuthForm = () => {
    const navigate = useNavigate();
    const{setSigninMethod}=useContext(DataContext)
    const googleID = `${import.meta.env.VITE_GOOGLE_ID}`
    const [isSignin, setIsSignin] = useState(false);
    const [isLoding, setIsLoding] = useState(false);
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState('');
    const [form, setForm] = useState(false);
    const [errormsg, setError] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        picture:'',
        password: '',
        confirm: ''
    })
    const [formData1, setFormData1] = useState({
        email: '',
        password: ''
    })

    const handlePassword=(confirm, password ) => {
        if (!confirm || !password) return setPass('');
        setPass(password === confirm ? 'true' : 'false')
    }
    
    const validation = ({first,ema,pas}) => {
        const newErrors = {};
        if (!isSignin) {
            if (!first || first.length < 3) {
                newErrors.name = 'First name must be at least 3 characters';}
        }
        if (!ema|| ema.length < 3) {newErrors.email = 'Email is required';setForm(false)}
        if (!pas || pas.length < 3) {
            newErrors.password = 'Password must be at least 3 characters';
            setForm(false)
        }
        setError(newErrors);
        if(Object.keys(newErrors).length === 0)setForm(true)
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoding(true);
         try {
            setIsLoding(false);
            const user = await api.post(isSignin ? '/user/signin' : '/user/signup',isSignin ? formData1 : formData,{withCredentials: true})
            const responsre = await api.get(`${import.meta.env.VITE_BASE_URL}/user/token`,{withCredentials: true});
            localStorage.setItem('token',responsre.data.token)
            setSigninMethod(false)
            await setTimeout(() => {
                        navigate('/', { replace: true });
                    },2000);
        } catch (error) {
                
        }
    }

  return (
    <div className='flex flex-col justify-center gap-2 bg-zinc-700 rounded-md w-100 lg:w-120'>
        <h1 className='my-4 font-semibold text-3xl'>{isSignin ? 'Sign In' : 'Sign Up'}</h1>
        <form className='flex flex-col gap-3 mx-3 w-[94]'onSubmit={handleSubmit} noValidate>
        { !isSignin &&
            <div className='flex justify-between gap-3'>
                <div className="relative w-full">
                    {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.name}</p>}
                    <input type="text" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value});validation({first: e.target.value,ema:formData.email,pas:formData.password})}} error={errormsg.firstName} required 
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Name</span>
                    </label>
                </div>
            </div>}
            <div className="relative w-full">
                {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.email}</p>}
                <input type='email' value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value}); setFormData1({...formData1, email: e.target.value });validation({first:formData.name,ema: e.target.value,pas:formData.password})}} required 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Email</span>
                </label>
            </div>
            <div className="relative w-full">
                <input type='email' value={formData.picture} onChange={(e) => {setFormData({...formData, picture: e.target.value});}} required autoComplete="off"
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Profile Pic</span>
                </label>
            </div>
            <div className="relative w-full">
                {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.password}</p>}
                <input type={show ? "text" : "password"} value={formData.password} onChange={(e) => {handlePassword(formData.confirm,e.target.value);setFormData({...formData, password: e.target.value});setFormData1({...formData1, password: e.target.value });validation({first:formData.name,ema:formData.email,pas: e.target.value})}} required autoComplete="off"
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Password</span>
                </label>
                <div onClick={() =>setShow(!show)} className='right-4 z-1 absolute flex justify-end p-2 rounded-full text-gray-400 -translate-y-9'>
                    { show ? <ShowPass/>:<HidePass/> }
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
            <div className='flex w-full'>
                <button type='submit' disabled={ isLoding||(!isSignin && (pass === '' || pass == "false")||(isSignin && (!form)))} className='items-center bg-indigo-500 hover:bg-indigo-600 mt-3 w-full h-10 transition-all ease-in-out'>{!isLoding&& (isSignin ? 'Sign In' : 'Sign Up')}{isLoding && <PulseLoader color="#fff"/>}</button>
            </div>
        </form>
        <GoogleOAuthProvider clientId={googleID}>
            <GoogleForm/>
        </GoogleOAuthProvider>
        <div onClick={() => setIsSignin(!isSignin)} className='my-4 text-blue-400 text-sm text-center hover:underline cursor-pointer'>
            <p>{isSignin ? "Don't have an account?" : "Already have an account?"} <i className='text-blue-400'>{isSignin ? 'Sign Up' : 'Sign In'}</i></p>
        </div>
    </div>
  )
}

export default AuthForm;
