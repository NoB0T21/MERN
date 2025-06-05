import {Link} from 'react-router-dom';


const SigninAlert = () => {
  return (
    <>
        <span className='font-semibold text-xl md:text-2xl xl:text-3xl'>To interact with Posts please</span>
        <div className='mx-1 w-1/2 animate-bounce'>
          <Link className='bg-indigo-600 p-2 xl:p-4 rounded-md w-18 xl:w-33 xl:text-3x text-xl' to={'/user'}>sign in</Link>
        </div>
    </>
  )
}

export default SigninAlert
