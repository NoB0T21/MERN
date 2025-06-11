import UserPosts from '../user Posts/UserPosts'

const Profile = () => {
  return (
        <>
          <div className='flex justify-between gap-2 mt-[15px] w-full overflow-hidden'>
              <div className='flex w-full h-full overflow-hidden'>
                  <UserPosts/>      
              </div>
          </div>
        </>
  )
}

export default Profile
