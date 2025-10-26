import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";


export const getAllContacts = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({message:"Server error"});
}
}

export const getMessagesByUserId = async (req,res) => {
    try {
        const myId = req.user
        const { id: userToChatId } = req.params;
        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ],
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ". error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const sendMessage = async (req,res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.bpdy;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            // upload base 64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save()

        // realtime chat using socket.io
        res.status(201).json(newMessage);
    } catch (error) {
        console.log('Error in sendMessage controlller: ',error.message);
        res.status(500).json({error:"Internal server error"});
    }
}