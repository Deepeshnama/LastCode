import express from "express"
import {
  getMessages,
  sendMessage,
  getSingleUserMessages,
} from "../controllers/chat.controller.js";

const chatRouter = express.Router()

chatRouter.post('/', sendMessage)
// chatRouter.get('/message/:id', getMessages)

chatRouter.get('/all/:userId/:receiverId' , getMessages)

chatRouter.get("/sender/:senderId" , getSingleUserMessages )

export default chatRouter;