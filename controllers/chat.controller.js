import Message from "../models/message.model.js"

// const sendMessage = async (req, res) => {
    
//     try {
//         const { sender, content, receiver } = req.body
        
//         const message = new Message({
//             sender , content , receiver
//         })

//         await message.save()

//         res.status(201).json(message)

//     } catch (error) {
//         res.status(400).json({error : error.message})
//     }

// }


const sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  if (!sender || !receiver || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newMessage = new Message({ sender, receiver, content });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};


const getMessages = async (req, res) => {
  const { userId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    })
      .sort({ timestamp: 1 }) // Sort by timestamp
      .populate("sender", "name profilePic") // Populate sender details
      .populate("receiver", "name profilePic"); // Populate receiver details

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch messages" });
  }
};




// const getMessages = async (req, res) => {
//     try {
//         const { id } = req.params
        
//         const messages = await Message.findById(id)
        
//         res.status(200).json(messages)

//     } catch (error) {
//         res.status(400).json({error : error.message})
//     }
// }



export {sendMessage , getMessages }