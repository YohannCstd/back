const messageModel = require("../models/message");
const contactModel = require("../models/contact");
const moment = require("moment-timezone");

exports.createMessage = async (req, res) => {
  const { fromUserId, toUserId, content } = req.body;

  try {

    const alreadyContact = await contactModel.findByfromUserIdAndToUserId(fromUserId, toUserId);
    
    let contactId = 0;
    if(alreadyContact == undefined) {
      contactId = await contactModel.create({fromUserId, toUserId, status: "nonLu"});
      console.log(contactId)
    } else {
      contactId = alreadyContact.id;
    }

    const date = moment().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

    const message = await messageModel.create({
      fromUserId,
      contactId,
      content,
      date,
    });

    return res.status(201).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.deleteMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    await messageModel.deleteById(id);

    return res.status(200).json({ message: "Message deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await messageModel.findAll();

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await messageModel.findById(id);

    if (message) {
      return res.status(200).json(message);
    } else {
      return res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.updateMessageById = async (req, res) => {
  const { id } = req.params;
  const { fromUserId, contactId, groupId, content, date } = req.body;

  try {
    await messageModel.updateById(id, {
      fromUserId,
      contactId,
      groupId,
      content,
      date,
    });

    return res.status(200).json({ message: "Message updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getMessagesByContactId = async (req, res) => {
  const { contactId } = req.params;

  try {
    const messages = await messageModel.findByContactId(contactId);

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}
