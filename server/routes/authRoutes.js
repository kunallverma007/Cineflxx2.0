const { Router } = require('express');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
const router = Router();
router.post('/signup_user',authController.signup_user)
router.post('/signin_user',authController.signin_user)
router.post('/signup_theater',authController.signup_theater)
router.post('/signin_theater',authController.signin_theater)
router.post('/user',dataController.user_data)
router.post('/theater',dataController.theater_data)
router.post('/show',dataController.show_movie)
router.post('/fetch_theater',dataController.movie_shower)
router.post('/booking_add',dataController.booking_adder)
router.post('/pending',dataController.pending_history)
router.post('/complete',dataController.complete_history)
router.post('/delete_movie',dataController.movie_deleter);
router.post('/is_correct_user',authController.is_correct_user)
router.post('/is_correct_theater',authController.is_correct_theater)
router.post('/Osignup_user',authController.google_user_login)
router.post('/Osignup_theater',authController.google_theatre_login)
router.post('/payment',dataController.confirm_payment)
router.post('/booking_of_user',dataController.get_booking_data)
router.post('/delete_booking',dataController.booking_deleter)
router.get('/verify/:type/:id',authController.verify)
// router.post('/test',()=>{console.log("ajao bhai")})
//router.get('/favicon.ico', (req, res) => res.status(204));
module.exports=router;