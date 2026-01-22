import { create } from "zustand";

export const useAuthStore= create((set)=>({
    authUser : { name : "Akash", _id:123, age:20},
    isLoggedin: false,
    isLoading:false,

    login:()=>{
        console.log("We just logged in")
        set({isLoggedin:true, isLoading:true})
    }
}))