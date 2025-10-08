import SecureStorage from 'expo-secure-store'
import { AUTH_URL } from "../constants/utils";



const refresh_token = 'refresh_token'
const acess_token = 'access_token'
const user_info = 'user'

export const auth_login = ({ url }: any) =>{
  const token = new URL(url).searchParams.get('token') as string;
  SecureStorage.setItemAsync(refresh_token, token);

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
  SecureStorage.setItemAsync(acess_token, data.accessToken);

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
SecureStorage.setItemAsync(user_info, data.user);

return {
  status: true,
  message: "success",
  user: data.user
}

}

export const is_user_authenticated = async ():Promise<boolean>  =>{
  const user = await SecureStorage.getItemAsync(user_info)
  const refresh = await SecureStorage.getItemAsync(refresh_token)

  if(!user && !refresh){
    return false;
  }

  return true;
}