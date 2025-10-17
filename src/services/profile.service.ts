import { ACTION_URL } from "../constants/utils";
import { AuthService } from "./auth.service";


export const get_delivery_user = async () => {

    try{
        const stored_user = await AuthService.getStoredUser();

        if(stored_user === null || !stored_user?.id){
            return {
                status: false,
                message: "no user"
            }
        }

        const result = await fetch(`${ACTION_URL}/api/auth`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: stored_user?.id  })
        });

        if(!result.ok){
            return {
                status: false,
                message: "failed"
            }
        }

        return {
            status: true,
            message: "success"
        }

    }catch(err: any){
        return {
            status: false,
            message: err.message
        }
    }

}

export const get_profile = async () => {

    try{
        const stored_user = await AuthService.getStoredUser();

        if(stored_user === null || !stored_user?.id){
            return {
                status: false,
                message: "no user",
                profile: null
            }
        }

        const result = await fetch(`${ACTION_URL}/api/profile/get-details`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: stored_user?.id  })
        });

        if(!result.ok){
            return {
                status: false,
                message: "failed",
                profile: null
            }
        }

        const data = await result.json();

        return {
            status: true,
            message: "success",
            profile: data
        }

    }catch(err: any){
        return {
            status: false,
            message: err.message,
            profile: null
        }
    }

}

export const get_address = async () => {   
    try{
        const stored_user = await AuthService.getStoredUser();

        if(stored_user === null || !stored_user?.id){
            return {
                status: false,
                message: "no user",
                address: null
            }
        }

        const result = await fetch(`${ACTION_URL}/api/profile/get-address`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: stored_user?.id  })
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
            address: data.addresses
        }

    }catch(err: any){
        return {
            status: false,
            message: err.message,
            address: null
        }
    }
}