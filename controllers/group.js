const groupModel = require("../models/group");

exports.createGroup = async (req, res) => {
  const { postId, nom, image } = req.body;

  try {
    await groupModel.create({
      postId,
      nom,
      image,
    });

    return res.status(201).json({ message: "Group created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.deleteGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    await groupModel.deleteById(id);

    return res.status(200).json({ message: "Group deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupModel.findAll();

    return res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await groupModel.findById(id);

    if (group) {
      return res.status(200).json(group);
    } else {
      return res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.updateGroupById = async (req, res) => {
  const { id } = req.params;
  const { postId, nom, image } = req.body;

  try {
    await groupModel.updateById(id, {
      postId,
      nom,
      image,
    });

    return res.status(200).json({ message: "Group updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
