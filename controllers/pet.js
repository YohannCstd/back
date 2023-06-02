const petModel = require("../models/pet.js");

exports.createPet = async (req, res) => {
  const { name, userId, avatar, description, type } = req.body;

  try {
    const pet = await petModel.create({
      name,
      userId,
      avatar,
      description,
      type,
    });

    return res.status(201).json({ pet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.deletePetById = async (req, res) => {
  const { id } = req.params;

  try {
    await petModel.deleteById(id);

    return res.status(200).json({ message: "Pet deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.readAllPets = async (req, res) => {
  try {
    let { search, offset, limit } = req.query;

    if (!offset || !limit) {
      offset = 0;
      limit = 30;
    }

    let totalCount = await petModel.count();
    const pets = await petModel.findAllByOffsetAndLimit(search, offset, limit);

    if (search) totalCount = pets.length;

    const output = {
      count: totalCount,
      next: null,
      previous: null,
      results: pets,
    };

    if (parseInt(offset) + parseInt(limit) < totalCount) {
      // Vérifie s'il y a une page suivante
      const nextOffset = parseInt(offset) + parseInt(limit);
      output.next = `http://localhost:8090/api/pet?limit=${limit}&offset=${nextOffset}`;
    }

    if (parseInt(offset) > 0) {
      // Vérifie s'il y a une page précédente
      const previousOffset = parseInt(offset) - parseInt(limit);
      output.previous = `http://localhost:8090/api/pet?limit=${limit}&offset=${previousOffset}`;
    }

    return res.status(200).json(output);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePetById = async (req, res) => {
  const { id } = req.params;
  const { name, userId, avatar, description, type } = req.body;

  try {
    await petModel.updateById(id, name, userId, avatar, description, type);

    return res.status(200).json({ message: "Pet updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await petModel.findAll();

    return res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
