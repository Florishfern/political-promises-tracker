const Politician = require('../models/politicianModel');

const politicianController = {
    listPoliticians: async (req, res) => {
        try {
            const politicians = await Politician.getAll();
            res.render('politician', { politicians });
        } catch (err) {
            res.status(500).send("Error: " + err.message);
        }
    }
};

module.exports = politicianController;