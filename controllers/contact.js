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

    const contacts = await contactModel.findAllContactsByUserId(userId);

    for (const contact of contacts) {
      let message = await messageModel.findLastMessageByContactId(contact.id);
      if (message === undefined) message = [];
      else contact.lastMessage = message;
      delete contact.id;

      if (contact.contact1_id === userId) {
        contact.user = user;
        delete contact.contact1_id;

        const contact2 = await userModel.findById(contact.contact2_id);
        contact.userContact = contact2;
        delete contact.contact2_id;
      } else if (contact.contact2_id === userId) {
        contact.user = user;
        delete contact.contact2_id;

        const contact1 = await userModel.findById(contact.contact1_id);
        contact.userContact = contact1;
        delete contact.contact1_id;
      }
    }
    
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
