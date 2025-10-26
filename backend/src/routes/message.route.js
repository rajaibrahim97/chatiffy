import express from "express";
import { getAllContacts } from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessagesByUserId } from "../controller/message.controller.js";

const router = express.Router()
router.use(protectRoute);

router.get("/contacts",getAllContacts);
router.get("/:id",getMessagesByUserId);
router.post("/send/:id",sendMessage);
// router.get("/chats",getChatPartners);


export default router;



