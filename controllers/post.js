const postModel = require("../models/post.js");
const userModel = require("../models/user.js");
const petModel = require("../models/pet.js");
const participantModel = require("../models/participant.js");
const moment = require("moment-timezone");

exports.createPost = async (req, res) => {
  const { userId, appointmentDate, title, description, limitParticipants } =
    req.body;

  if (
    !userId ||
    !appointmentDate ||
    !title ||
    !description ||
    !limitParticipants
  )
    return res.status(400).json({ message: "Missing parameters" });

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
    await postModel.updateById(
      id,
      updatedAt,
      appointmentDate,
      description,
      limitParticipants
    );

    return res.status(200).json({ message: "Post updated successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Allposts = async (req, res) => {
  try {
    let posts = await postModel.findAll();
    if (posts == undefined) posts = [];
    else {
      for (const post of posts) {
        // Récupération de l'utilisateur
        const user = await userModel.findById(post.user_id);
        post.user = user;
        delete post.user_id;

        // Récupération des participants
        let participants = await participantModel.findByPostId(post.id);
        if (participants == undefined)participants = [];
        else {
          for (const participant of participants) {
            // Récupération de l'utilisateur
            const user = await userModel.findById(participant.user_id);
            participant.user = user;

            // Récupération de l'animal
            const pet = await petModel.findById(participant.pet_id);
            participant.pet = pet;

            delete participant.post_id;
            delete participant.user_id;
            delete participant.pet_id;
          }
        }
        post.participants = participants;
      }
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.postById = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupération du post
    const post = await postModel.findById(id);

    // Récupération de l'utilisateur
    const user = await userModel.findById(post.user_id);
    post.user = user;
    delete post.user_id;

    // Récupération des participants
    let participants = await participantModel.findByPostId(post.id);
    if (participants == undefined) participants = [];
    else {
      for (const participant of participants) {
        // Récupération de l'utilisateur
        const user = await userModel.findById(participant.user_id);
        participant.user = user;

        // Récupération de l'animal
        const pet = await petModel.findById(participant.pet_id);
        participant.pet = pet;

        delete participant.post_id;
        delete participant.user_id;
        delete participant.pet_id;
      }
    }
    post.participants = participants;

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};