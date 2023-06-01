const participantModel = require("../models/participant.js");

esports.addParticipant = async (req, res) => {
  const { userId , petId, postId } = req.body;

  if(!userId || !petId || !postId) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    await participantModel.create({ postId, userId, petId, status: "pending", statusMessage: "NA" });
    return res.status(201).json({ message: "Participant added successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await participantModel.deleteById(id);

    return res.status(200).json({ message: "Participant deleted successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Allparticipants = async (req, res) => {
  try {
    const participants = await participantModel.findAll();

    return res.status(200).json(participants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
