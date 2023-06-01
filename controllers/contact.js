const contactModel = require("../models/contact");
const messageModel = require("../models/message");
const userModel = require("../models/user");

exports.createContact = async (req, res) => {
  const { userId1, userId2, status } = req.body;

  try {
    await contactModel.create({
      userId1,
      userId2,
      status,
    });

    return res.status(201).json({ message: "Contact created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.deleteContactById = async (req, res) => {
  const { id } = req.params;

  try {
    await contactModel.deleteById(id);

    return res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.findAll();

    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getContactsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const contacts = await contactModel.findByUserId(userId);

    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await contactModel.updateStatus(id, status);

    return res
      .status(200)
      .json({ message: "Contact status updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllContactsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);

    const contactsRaw = await contactModel.findAllContactsByUserId(userId);

    const contacts = await Promise.all(contactsRaw.map(async (contact) => {
      const userContact = await userModel.findById(contact.contact1_id === userId ? contact.contact1_id : contact.contact2_id);
      let lastMessage = await messageModel.findLastMessageByContactId(contact.id) || [];
      return {
        user,
        userContact,
        lastMessage,
        status: contact.status
      }
    }));

    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
