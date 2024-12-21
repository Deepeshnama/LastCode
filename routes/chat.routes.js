import express from "express"
import { getMessages, sendMessage } from "../controllers/chat.controller.js"

const chatRouter = express.Router()

chatRouter.post('/', sendMessage)
// chatRouter.get('/message/:id', getMessages)

chatRouter.get('/:userId/:receiverId' , getMessages)

export default chatRouter;