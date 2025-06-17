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
    <div className='flex justify-between items-center bg-[rgba(84,84,84,0.6)] shadow-xl backdrop-blur-5xl px-5 rounded-md w-full h-20'>
      <div className='flex justify-center items-center gap-3'>
        <img className='rounded-full w-15 h-15' src={props.data.picture} alt="" />
        <h4 className='font-semibold text-2xl'>{props.data.name}</h4>
      </div>
      <div>
        {userData._id === props.data._id ? '' : <div onClick={() =>follow()} className="flex items-center gap-1 px-2 border-1 rounded-md text-xl cursor-pointer">
            { userData.following?.includes(props.data?._id) ? 'following' : 'follow'}
        </div>}
      </div>
    </div>
  )
}

export default UserProfile
