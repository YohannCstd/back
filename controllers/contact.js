const contactModel = require("../models/contact");

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

    return res.status(200).json({ message: "Contact status updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
