// Importation package.json
const package = require('../package.json');

exports.version = (req, res) => {
    const version = package.version;
    res.json({ version });
};
