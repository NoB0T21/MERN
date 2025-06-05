import Header from '../Header'
import MobileNav from '../Forms/Form'

const Profile = () => {
  return (
    <>
        <Header/>
        <div className='flex justify-between mx-10 mt-[15px] md:ml-20'>
            <div className='flex flex-col gap-5 w-full md:w-1/2 h-full'>
                <div className='bg-red-600 w-full h-50'>profile</div>
                <div className='bg-yellow-600 w-full h-[65vh]'>posts</div>        
            </div>
            <div className='hidden md:flex'><MobileNav/></div>
        </div>
        <div className='md:hidden flex'><MobileNav/></div>
    </>
  )
}

export default Profile
