import Group from "../models/group.model.js";

const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = new Group({ name, members });

    await group.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('members', 'name')
    res.status(200).json(groups);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {createGroup , getGroups}