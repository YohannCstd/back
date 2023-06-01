const postModel = require("../models/post.js");
const moment = require("moment-timezone");

exports.createPost = async (req, res) => {
  const { userId, appointmentDate, title,description, limitParticipants } = req.body;

  if(!userId || !appointmentDate || !title || !description || !limitParticipants) return res.status(400).json({message: "Missing parameters"});

  const createdAt = moment().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

  try {
    await postModel.create({
      userId,
      createdAt,
      appointmentDate,
      title,
      description,
      limitParticipants,
    });

    return res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await postModel.deleteById(id);

    return res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.updateById = async (req, res) => {
  const { id } = req.params;

  const { appointmentDate, description, limitParticipants } = req.body;

  const updatedAt = moment().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");
  try {
    await postModel.updateById(id, updatedAt,appointmentDate, description, limitParticipants);

    return res.status(200).json({ message: "Post updated successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Allposts = async (req, res) => {
  try {
    const posts = await postModel.findAll();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
