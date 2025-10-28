import {create} from "zustand";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

export const useChatStore = create(()=>({
    allContacts: [],
    chats:[],
    messages:[],
    activeTab: "chats",
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSoundEnable:localStorage.getItem("isSoundEnabled") === true,

    toggleSound: () =>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnable)
        setInterval({isSoundEnabled:!get().isSoundEnable})
    },

    setActiveTab:(tab) => set({activeTab:tab}),

    setSelectedUser: (selectedUser) => set({selectedUser:selectedUser}),

    getAllContacts: async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isUsersLoading:false});
        }
    },

    getMyChatPartners: async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({allContacts:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isUsersLoading:false});
        }
    }
}))




