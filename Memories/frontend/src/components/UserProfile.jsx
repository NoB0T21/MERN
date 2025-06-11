import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { api } from '../utils/api';

const UserProfile = (props) => {
    const {userData,setUserData} = useContext(DataContext);
    const follow = async () => {
        const token = localStorage.getItem('token');
        if(!token){
          return
        }
        const data = await api.get(`/user/follow/${props.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const user = await api.get(`/user/user/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUserData(user.data)
      }
  return (
    <div className='bg-zinc-700 w-full h-20 flex justify-between items-center rounded-md px-5'>
      <div className='flex justify-center items-center gap-3'>
        <img className='w-15 h-15 rounded-full' src={props.data.picture} alt="" />
        <h4 className='text-2xl font-semibold'>{props.data.name}</h4>
      </div>
      <div>
        <div onClick={() =>follow()} className="flex items-center gap-1 text-xl px-2 border-1 rounded-md cursor-pointer">
            {userData.following?.includes(props.data?._id) ? 'following' : 'follow'}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
