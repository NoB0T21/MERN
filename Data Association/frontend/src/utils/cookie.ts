import { api } from "./api"

export const getcookie = async (email: string,name: string) =>{
    const response = await api.post('/cookies', {email:email, name:name});
    return response
}