import { useEffect, useState } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
import { PulseLoader } from "react-spinners";
import { getcookie } from "../../utils/cookie";
import  Cookie from "js-cookie";


const formSchema = z.object({
    name: z.string().min(1,"Name require"),
    userName: z.string().min(1,"Username require"),
    email: z.string().email("Plese enter a Valid email"),
    password: z.string().min(3,"Password mus be 3 characters long"),
})

type AuthFormType = 'sign-in' | 'sign-up'

const AuthForm = ({type}: {type: AuthFormType}) => {

    const [name, SetName] = useState('')
    const [userName, SetUserName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [image, SetImage] = useState('')
    const [status, setStatus] = useState<{message?: string, success?: boolean}>({})
    const [isloding, SetIsloding] = useState(false)
    const [error, SetError] = useState<{name?: string,userName?: string,email?: string,password?: string,}>({})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parserResult = formSchema.safeParse({name,userName,email,password})
        if(!parserResult.success){
            const errorMessage = parserResult.error.flatten().fieldErrors;
            if(type === 'sign-in'){
                SetError({
                    email: errorMessage.email?.[0],
                    password: errorMessage.password?.[0],
                })
            }
            if(type === 'sign-up'){
                SetError({
                    name: errorMessage.name?.[0],
                    userName: errorMessage.userName?.[0],
                    email: errorMessage.email?.[0],
                    password: errorMessage.password?.[0],
                })
            }
            
        }
        
        SetIsloding(true)

        if(type === 'sign-in') {
            if(email.endsWith('.com') === false || error.password ) {
                SetIsloding(false);
                return
            }
        }

        const formData = {
            name: name,
            username: userName,
            email: email,
            password: password,
            image: image,
        }
        const formData2 = {
            email: email,
            password: password
        }
        try{
            const endpoint = type ==='sign-up' ? '/signup' : '/signin'
            const outpoint = type ==='sign-up' ? formData : formData2
            const response = await api.post(endpoint, outpoint);
            const data = response.data
            if(response.data){
                setStatus(data); 
                const cookie = await getcookie(email, name) 
                Cookie.set('token',cookie.data.token)
            }         
        }catch(err){
            return err
        }finally{
            if(!status.success){
                SetIsloding(false)
            }
            SetIsloding(false)
            SetName('')
            SetUserName('')
            SetEmail('')
            SetPassword('')
            SetImage('')
            SetError({})
        }
    }
    
    useEffect(() => {
        console.log(status);
    }, [status]);

  return (
    <div className="h-screen flex-col gap-5 center p-10">
        {type === 'sign-up' ? <h1 className="h1 m-1 h-auto p-2">Sign UP</h1>: <h1 className="h1">Sign IN</h1>}
        <form className="center flex-col gap-3 max-w-45 min-w-50 md:max-w-72 md:min-w-50">
            {type === 'sign-up' && (
                <><div className="flex flex-col items-start h-full w-full">
                    {error.name ==='' ? '' : <p className="text-sm text-red-500">{error.name}</p>}
                    <input onChange={(e)=>SetName(e.target.value)} value={name} type="text" name="name" placeholder="Name" className="w-full bg-zinc-700 m-1 ml-0 px-3 py-1 md:py-2 rounded-lg outline-none"/>
                </div>
                <div className="flex flex-col items-start h-full w-full">
                    {error.userName ==='' ? '' : <p className="text-sm text-red-500">{error.userName}</p>}
                    <input onChange={(e)=>SetUserName(e.target.value)} value={userName} type="text" name="username" placeholder="Username" className="w-full bg-zinc-700 m-1 ml-0 px-3 py-1 md:py-2  rounded-lg outline-none"/>
                </div></>
            )}
            <div className="flex flex-col items-start h-full w-full">
                {error.email ==='' ? '' : <p className="text-sm text-red-500">{error.email}</p>}
                <input onChange={(e)=>SetEmail(e.target.value)} value={email} type="text" name="email" placeholder="Email" className="w-full bg-zinc-700 m-1 ml-0 px-3 py-1 md:py-2  rounded-lg outline-none"/>
            </div>
            <div className="flex flex-col items-start h-full w-full">
                {error.password ==='' ? '' : <p className="text-sm text-red-500">{error.password}</p>}
                <input onChange={(e)=>SetPassword(e.target.value)} value={password} type="text" name="password" placeholder="Password" className="w-full bg-zinc-700 m-1 ml-0 px-3 py-1 md:py-2 rounded-lg outline-none"/>
            </div>
            {type === 'sign-up' && (
                <>
                    <div className="flex flex-col items-start h-full w-full">
                        <input onChange={(e)=>SetImage(e.target.value)} value={image} type="text" name="image" placeholder="Image URL" className="w-full bg-zinc-700 m-1 ml-0 px-3 py-1 md:py-2 rounded-lg outline-none"/>
                    </div>
                </>
            )}
            {type === 'sign-up' ?
                <button disabled={isloding} onClick={handleSubmit} className="bg-color w-full m-1 p-1 px-3 rounded-md hover:scale-105 text-md md:text-xl transition-all duration-300">{isloding && <PulseLoader color="#fff"/>}{!isloding && 'Sign UP'}</button>
                :
                <button disabled={isloding} onClick={handleSubmit} className="bg-color w-full m-1 p-1 px-3 rounded-md hover:scale-105 text-md md:text-xl transition-all duration-300">{isloding && <PulseLoader color="#fff"/>}{!isloding && "Sign IN"}</button>
            }
        </form> 
    </div>
  )
};

export default AuthForm;
