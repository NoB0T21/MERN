import {GoogleOAuthProvider} from '@react-oauth/google'
import AuthForm from './Forms/AuthForm';
import Header from './Header'
const Unauth = () => {
  const googleID = `${import.meta.env.VITE_GOOGLE_ID}`
  return (
    <>
        <Header/>
        <div className='flex justify-center mx-10 my-10'>
          <GoogleOAuthProvider clientId={googleID}>
            <AuthForm/>
          </GoogleOAuthProvider>
        </div>
    </>
  )
}

export default Unauth
