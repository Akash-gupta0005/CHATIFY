import cloudinary from '../lib/cloudinary.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';


export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({ filteredUsers });
    } catch (error) {
        console.log("Error in getting contacts : ", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getting messages : ", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imgUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(imgUrl);
            imgUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl
        })
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (err) {
        console.log("Error in sending message : ", err);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        const message = await Message.find({
            $or: [{ senderId: loggedUserId }, { receiverId: loggedUserId }]
        });
        const chatPartnerIds = [
            ...new Set(
                message.map((msg) =>
                    msg.senderId.toString() === loggedUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password")
        res.status(200).json(chatPartners);
    } catch (error) {
        console.log("Error in getChatPartner controller : ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}