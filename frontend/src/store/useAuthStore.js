import { create } from "zustand";
import {axiosInstance} from '../lib/axios.js';
import toast from "react-hot-toast";

export const useAuthStore= create((set)=>({
    authUser : null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingUp:false,

    checkAuth:async()=>{
        try {
            const res= await axiosInstance.get("/auth/check")
            set({authUser : res.data});
        } catch (error) {
            console.log("Error in authentication : ",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signUp:async(data)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data});
            toast.success("Account created successfully !");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },

    loggingUp:async (data) => {
        try {
            const res=await axiosInstance.post('/auth/login',data);
            set({authUser:res.data});
            toast.success("Logged in successfully !");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingUp:false})
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post('/auth/logout');
            toast.success("Logout successfully"); 
            set({authUser:null})
        } catch (error) {
             toast.error(error.response.data.message);
        }
    }
}))