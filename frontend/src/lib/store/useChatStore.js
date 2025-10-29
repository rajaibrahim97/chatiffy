import {create} from "zustand";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get)=>({
    allContacts: [],
    chats:[],
    messages:[],
    activeTab: "chats",
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) || false,

    toggleSound: () =>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
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
    },
    getMessagesByUserId: async (userId) => {
        set({isMessagesLoading:true})
        try {
        const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({isMessagesLoading:false});
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const {authUser} = useAuthStore.getState();
        const tempId = `temp-${Date.now()}`;
        const optimisticMesage = {
            _id:tempId,
            senderId:authUser._id,
            recieverId:selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt:new Date().toISOString(),
            isOptimistic:true // glag to identify optimistic mesages (optional)
        };
        // immediately update the ui by adding the message
        set({messages:[...messages,optimisticMesage]});
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:messages.concat(res.data)})
        } catch (error) {
            // remove optimistic message on failure
            set({messages:messages})
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    },
}))




