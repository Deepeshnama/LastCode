import express from "express"
import { createGroup, getGroups } from "../controllers/group.controller.js"

const groupRouter = express.Router()

groupRouter.post("/create", createGroup)
groupRouter.get('/', getGroups)

export default groupRouter