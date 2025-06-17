import axios from "axios";

export const verifyGoogleToken = async (token) => {
    if (!token) return null

    try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if(res.data && res.email_verified === false) throw new Error('Invalid Token')
        try {
            const data = res.data.sub
            const user = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/google`,{sub:data},
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            return user.data;
        } catch (err) {
        }
    } catch (error) {
    }
}

export const verifyToken = async (token) => {
    if (!token) return null
    try {
        const responsre = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/verify`, {
            withCredentials: true
          });
        return responsre.data;
    } catch (error) {
        return null
    }
}