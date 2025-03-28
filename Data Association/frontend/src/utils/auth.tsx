import { api } from "./api";

export const getToken = async() => {
  const tk = await api.get('token')
  return tk
}
