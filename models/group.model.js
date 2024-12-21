import { Schema, model } from "mongoose"

const groupSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }]
} , {timestamps : true});

const Group = model("group", groupSchema)

export default Group;