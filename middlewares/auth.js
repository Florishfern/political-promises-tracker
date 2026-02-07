module.exports = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next(); 
    } else {
        res.status(403).send("<script>alert('เฉพาะเจ้าหน้าที่ (Admin) เท่านั้นที่เข้าถึงส่วนนี้ได้'); window.location='/login';</script>");
    }
};