import {GoogleOAuthProvider} from '@react-oauth/google'
import AuthForm from './Forms/AuthForm';

import Header from './Header'
const Unauth = () => {
  return (
    <>
        <Header/>
        <div className='flex justify-center mx-10 my-10'>
          <GoogleOAuthProvider clientId='1072507074771-28gr6oi61jpbc1lk3otdg0tgemsthd07.apps.googleusercontent.com'>
            <AuthForm/>
          </GoogleOAuthProvider>
        </div>
    </>
  )
}

export default Unauth
