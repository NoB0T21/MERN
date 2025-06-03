import {useState } from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google'
import { PulseLoader } from "react-spinners";
import GoogleForm from './GoogleForm';
import { api } from '../../utils/api';
import { HidePass, ShowPass } from '../Icons/Icons';


const AuthForm = () => {
    const googleID = `${import.meta.env.VITE_GOOGLE_ID}`
    const [isSignin, setIsSignin] = useState(false);
    const [isLoding, setIsLoding] = useState(false);
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState('');
    const [form, setForm] = useState(false);
    const [errormsg, setError] = useState({})
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
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
    
    const validation = ({first,last,ema,pas}) => {
        const newErrors = {};
        if (!isSignin) {
            if (!first || first.length < 3) {
                newErrors.firstName = 'First name must be at least 3 characters';}
            if (!last || last.length < 3) {
                newErrors.lastName = 'Last name must be at least 3 characters';
            }
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
            const user = await api.post(isSignin ? '/user/signin' : '/user/signup',isSignin ? formData1 : formData)
        } catch (error) {
                
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
                    <input type="text" value={formData.firstName} onChange={(e) => {setFormData({...formData, firstName: e.target.value});validation({first: e.target.value,last: formData.lastName,ema:formData.email,pas:formData.password})}} error={errormsg.firstName} required autoComplete="off"
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>FirstName</span>
                    </label>
                </div>
                <div className="relative w-full">
                    {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.lastName}</p>}
                    <input type="text" value={formData.lastName} onChange={(e) => {setFormData({...formData, lastName: e.target.value});validation({first:formData.firstName,last: e.target.value,ema:formData.email,pas:formData.password})}} required autoComplete="off"
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Last name</span>
                    </label>
                </div>
            </div>}
            <div className="relative w-full">
                {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.email}</p>}
                <input type='email' value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value}); setFormData1({...formData1, email: e.target.value });validation({first:formData.firstName,last:formData.lastName,ema: e.target.value,pas:formData.password})}} required autoComplete="off"
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Email</span>
                </label>
            </div>
            <div className="relative w-full">
                {errormsg && <p className="mb-1 text-red-500 text-xs">{errormsg.password}</p>}
                <input type={show ? "text" : "password"} value={formData.password} onChange={(e) => {handlePassword(formData.confirm,e.target.value);setFormData({...formData, password: e.target.value});setFormData1({...formData1, password: e.target.value });validation({first:formData.firstName,last:formData.lastName,ema:formData.email,pas: e.target.value})}} required autoComplete="off"
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
            <div className='flex flex-row items-start gap-2 w-full'>
                <button type='submit' disabled={ isLoding||(!isSignin && (pass === '' || pass == "false")||(isSignin && (!form)))} className='items-center bg-indigo-500 hover:bg-indigo-600 mt-3 w-1/2 h-10 transition-all ease-in-out'>{!isLoding&& (isSignin ? 'Sign In' : 'Sign Up')}{isLoding && <PulseLoader color="#fff"/>}</button>
                <GoogleOAuthProvider clientId={googleID}>
                    <GoogleForm/>
                </GoogleOAuthProvider>
            </div>
        </form>
        <div onClick={() => setIsSignin(!isSignin)} className='my-4 text-blue-400 text-sm text-center hover:underline cursor-pointer'>
            <p>{isSignin ? "Don't have an account?" : "Already have an account?"} <i className='text-blue-400'>{isSignin ? 'Sign Up' : 'Sign In'}</i></p>
        </div>
    </div>
  )
}

export default AuthForm;
