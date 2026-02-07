const PromiseModel = require('../models/promiseModel');
const UpdateModel = require('../models/updateModel');

const promiseController = {
    getAllPromises: async (req, res) => {
        try {
            const promises = await PromiseModel.getAll();
            res.render('index', { promises });
        } catch (err) {
            res.status(500).send("Error: " + err.message);
        }
    },

    getPromiseDetails: async (req, res) => {
        try {
            const promise_id = req.params.id;
            const promise = await PromiseModel.getById(promise_id);
            const updates = await UpdateModel.getByPromiseId(promise_id);
            res.render('details', { promise, updates });
        } catch (err) {
            res.status(500).send("Error: " + err.message);
        }
    },

    renderUpdateForm: async (req, res) => {
        try {
            const promise_id = req.params.id;
            const promise = await PromiseModel.getById(promise_id);

            if (promise.status === 'เงียบหาย') {
                return res.send("<script>alert('ไม่สามารถอัปเดตคำสัญญาที่สถานะ เงียบหาย ได้'); window.location='/promises/" + promise_id + "';</script>");
            }

            res.render('update', { promise });
        } catch (err) {
            res.status(500).send("Error: " + err.message);
        }
    },

    postUpdate: async (req, res) => {
        try {
            const promise_id = req.params.id;
            const { update_details, status } = req.body;

            await UpdateModel.create(promise_id, update_details);
            await PromiseModel.updateStatus(promise_id, status);

            res.redirect(`/promises/${promise_id}`);
        } catch (err) {
            res.status(500).send("Error: " + err.message);
        }
    }
};

module.exports = promiseController;