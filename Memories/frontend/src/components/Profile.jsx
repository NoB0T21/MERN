

const Profile = (user) => {
  return (
    <div className="w-1/2 flex gap-2 justify-end items-center">
      <div className="w-1/2 font-semibold text-xl">
        {user.value.name}
      </div>
      <img className="w-15 h-15 rounded-full" src={`${user.value.picture}`}/>
    </div>
  )
}

export default Profile
