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
        return res.data;
    } catch (error) {
        return null;
    }
}