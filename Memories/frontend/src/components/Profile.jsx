import {api} from '../utils/api.js'

const Profile = (user) => {
  const logout = () =>{
    const user = api.get('/user/logout',{withCredentials: true})
    localStorage.removeItem('token')
  }
  return (
    <div className="flex justify-end items-center gap-2 w-1/2">
      <div className="w-1/2 font-semibold text-xl">
        {user.value.name||user.value.firstName}
      </div>
      <img className="rounded-full w-15 h-15" src={`${user.value.picture}`}/>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Profile
