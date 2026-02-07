const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({
    secret: process.env.SESSION_SECRET || 'political_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

const promiseRoutes = require('./routes/promiseRoutes');
const politicianRoutes = require('./routes/politicianRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/', promiseRoutes);        // หน้าแรกและจัดการคำสัญญา
app.use('/politicians', politicianRoutes); // จัดการนักการเมือง
app.use('/auth', authRoutes);       // ระบบ Login/Logout

app.get('/login', (req, res) => res.render('login'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});