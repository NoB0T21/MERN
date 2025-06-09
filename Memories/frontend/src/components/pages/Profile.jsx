import Header from '../Header'
import MobileNav from '../Forms/Form'
import Posts from '../user Posts/UserPosts'

const Profile = () => {
  return (
        <div className=''>
          <Header/>
          <div className='flex justify-between mx-5 mt-[15px] md:ml-20 overflow-hidden'>
              <div className='flex flex-col w-full md:w-1/2 h-full overflow-hidden'>
                  <Posts/>      
              </div>
              <div className='hidden md:flex'><MobileNav/></div>
          </div>
          <div className='md:hidden flex'><MobileNav/></div>
        </div>
  )
}

export default Profile
