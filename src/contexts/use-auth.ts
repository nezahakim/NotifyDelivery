import * as SecureStore from 'expo-secure-store'
import { AUTH_URL } from "../constants/utils";

const refresh_token = 'refresh_token'
const acess_token = 'access_token'
const user_info = 'user'

export const auth_login = async ({ url }: any) =>{

  const token = new URL(url).searchParams.get('token') as string;
  await SecureStore.setItemAsync(refresh_token, token);

  if(!token){
    return { 
      status: false,
      message: "failed"
    }
  }

  return { 
    status: true,
    message: "success",
    refresh_token: token
  }

}

export const get_access_token = async ({ token }: any) =>{

  const result = await fetch(`${AUTH_URL}/api/auth/refresh`,{
    method:"POST",
    headers:{
      Authorization: `Bearer ${token}`
    }
  });

  if(!result.ok){
    return { 
      status: false,
      message:"failed",
    }
  }

  const data = await result.json();
  await SecureStore.setItemAsync(acess_token, data.accessToken);

  return {
    status:true,
    message:"success",
    access_token: data.accessToken
  };
}

export const verify_access_token = async ({ access_token }: any) =>{

  const result = await fetch(`${AUTH_URL}/api/auth/verify`,{
    method:"POST",
    headers:{
      Authorization: `Bearer ${access_token}`
    }
  });

  if(!result.ok){
    return { 
      status: false,
      message:"failed"
    }
  }

const data = await result.json();
await SecureStore.setItemAsync(user_info, data.user);

return {
  status: true,
  message: "success",
  user: data.user
}

}

export const is_user_authenticated = async ():Promise<boolean>  =>{

  const is_secure_storage_set = (await SecureStore.isAvailableAsync?.()) ?? false;

  if (!is_secure_storage_set){
    return false;
  }

  const user = await SecureStore.getItemAsync(user_info)
  const refresh = await SecureStore.getItemAsync(refresh_token)

  if(!user && !refresh){
    return false;
  }

  return true;
}