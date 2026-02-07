const db = require('../config/db');

const PromiseModel = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT pr.*, pol.name as politician_name, pol.party
            FROM Promises pr
            JOIN Politicians pol ON pr.politician_id = pol.politician_id
            ORDER BY pr.date_announced DESC
        `);
        return rows;
    },
    
    getById: async (promise_id) => {
        const [rows] = await db.query(`
        SELECT pr.*, pol.name as politician_name, pol.party 
        FROM Promises pr
        JOIN Politicians pol ON pr.politician_id = pol.politician_id
        WHERE pr.promise_id = ?`, [promise_id]);
    return rows[0];
    },

    updateStatus: async (promise_id, new_status) => {
        await db.query('UPDATE Promises SET status = ? WHERE promise_id = ?', [new_status, promise_id]);
    }
};

module.exports = PromiseModel;