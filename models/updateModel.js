const db = require('../config/db');

const UpdateModel = {

    getByPromiseId: async (promiseId) => {
        try {
            const [rows] = await db.query(
                'SELECT * FROM PromiseUpdates WHERE promise_id = ? ORDER BY update_date DESC',
                [promiseId]
            );
            return rows;
        } catch (err) {
            throw err;
        }
    },

    create: async (promiseId, details) => {
        try {
            const [result] = await db.query(
                'INSERT INTO PromiseUpdates (promise_id, update_date, update_details) VALUES (?, CURDATE(), ?)',
                [promiseId, details]
            );
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = UpdateModel;