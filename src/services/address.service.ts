import { ACTION_URL } from "../constants/utils";
import { AuthService } from "./auth.service";

export const setDefaultAddress = async (addresses: any) => {
    const defaultAddress = addresses.find((address: any) => address.is_default);
  
    if (!defaultAddress) {
        addresses[0].is_default = true;
    }
  
    const addressToSet = addresses.find((address: any) => address.is_default);
    await update_default_address({ address_id: addressToSet.id });

    return addressToSet;
};

export const update_default_address = async ({ address_id }: any) => {   
    try{
        const stored_user = await AuthService.getStoredUser();

        if(stored_user === null || !stored_user?.id){
            return {
                status: false,
                message: "no user",
                address: null
            }
        }

        const result = await fetch(`${ACTION_URL}/api/profile/update-default-address`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: stored_user?.id,
                address_id 
            })
        });

        if(!result.ok){
            return {
                status: false,
                message: "failed",
                address: null
            }
        }

        const data = await result.json();

        return {
            status: true,
            message: "success",
            address: data
        }

    }catch(err: any){
        return {
            status: false,
            message: err.message,
            address: null
        }
    }

}

export const add_address = async ({ address, city, state, zip_code, country, phone }: any) => {   
    try{
        const stored_user = await AuthService.getStoredUser();

        if(stored_user === null || !stored_user?.id){
            return {
                status: false,
                message: "no user",
                address: null
            }
        }

        const result = await fetch(`${ACTION_URL}/api/profile/add-address`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: stored_user?.id,
                address,
                city,
                state,
                zip_code,
                country,
                phone
             })
        });

        if(!result.ok){
            return {
                status: false,
                message: "failed",
                address: null
            }
        }

        const data = await result.json();

        return {
            status: true,
            message: "success",
            address: data
        }

    }catch(err: any){
        return {
            status: false,
            message: err.message,
            address: null
        }
    }

}


export const get_default_address = async (addresses: any) => {   
    const defaultAddress = addresses.find((address: any) => address.is_default);
  
    if (!defaultAddress) {
        return{
            status: false,
            message: "no default address",
            address: null
        }
    }
  
return {
    status: true,
    message: "success",
    address: defaultAddress
}; 
}
