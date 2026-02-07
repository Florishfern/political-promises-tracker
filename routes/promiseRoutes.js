const express = require('express');
const router = express.Router();
const promiseController = require('../controllers/promiseController');

router.get('/', promiseController.getAllPromises); // หน้าแรก
router.get('/promises/:id', promiseController.getPromiseDetails); // ดูรายละเอียด
router.get('/promises/:id/update', promiseController.renderUpdateForm); // หน้าฟอร์มอัปเดต
router.post('/promises/:id/update', promiseController.postUpdate); // รับข้อมูลอัปเดต

module.exports = router;