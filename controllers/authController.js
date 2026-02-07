const authController = {
    login: (req, res) => {
        const { username, password } = req.body;
        if (username === 'admin' && password === '1234') {
            req.session.user = { role: 'admin', name: 'ผู้ดูแลระบบ' };
            res.redirect('/');
        } else {
            res.send("<script>alert('รหัสผ่านไม่ถูกต้อง'); window.location='/login';</script>");
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = authController;