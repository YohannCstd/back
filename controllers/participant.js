const participantModel = require("../models/participant.js");


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
