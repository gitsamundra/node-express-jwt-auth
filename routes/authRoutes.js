const { signup_get, login_get, signup_post, login_post, logout_get } = require('../controllers/authController');

const router = require('express').Router();

// =======POST ROUTES=======
router.post('/signup', signup_post);
router.post('/login', login_post);
// router.post('/logout', (req, res) => {});



// =======GET ROUTES========
router.get('/signup', signup_get);
router.get('/login', login_get);
router.get('/logout',logout_get);



module.exports = router;