const express = require('express');
const cookieParser = require('cookie-parser');
// const requireAuth = require('./middleware/authMiddleware');
// const checkUser = require('./middleware/authMiddleware');
const auth = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// ======MongoDB Database======
require('./db');

// ======GLOBAL MIDDLEWARE======
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// =====GET ROUTE=====
app.get('*', auth.checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', auth.requireAuth, (req, res) => res.render('smoothies'));

// =====ROUTES=======
app.use('/', require('./routes/authRoutes'));

app.listen(port, () => console.log(`Server running on port `, + port));