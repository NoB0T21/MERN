import Header from '../Header'
import MobileNav from '../Forms/Form'
import Posts from '../user Posts/UserPosts'

const Profile = () => {
  return (
    <>
        <Header/>
        <div className='flex justify-between mx-5 mt-[15px] md:ml-20'>
            <div className='flex flex-col gap-5 w-full md:w-1/2 h-full'>
                <Posts/>      
            </div>
            <div className='hidden md:flex'><MobileNav/></div>
        </div>
        <div className='md:hidden flex'><MobileNav/></div>
    </>
  )
}

export default Profile
