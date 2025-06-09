import Header from '../Header'
import ProfileForm from '../Forms/ProfileForm'
import UserPosts from '../user Posts/UserPosts'

const Profile = () => {
  return (
        <div className=''>
          <Header/>
          <div className='flex justify-between gap-2 mx-5 md:mx-20 mt-[15px] overflow-hidden'>
              <div className='flex w-full h-full overflow-hidden'>
                  <UserPosts/>      
              </div>
              <div className='hidden md:flex'><ProfileForm/></div>
          </div>
          <div className='md:hidden flex'><ProfileForm/></div>
        </div>
  )
}

export default Profile
