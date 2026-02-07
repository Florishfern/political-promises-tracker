const db = require('../config/db');

const Politician = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT p.*, c.year, c.constituency 
            FROM Politicians p
            LEFT JOIN Campaigns c ON p.campaign_id = c.campaign_id
        `);
        return rows;
    }
};

module.exports = Politician;