import AuthForm from './Forms/AuthForm';
import Header from './Header'
const Unauth = () => {
  return (
    <>
        <Header/>
        <div className='flex justify-center mx-10 my-10'>
            <AuthForm/>
        </div>
    </>
  )
}

export default Unauth
