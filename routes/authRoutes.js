const router = require("express").Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
const tokenSevice = require('../controllers/verifyToken')
const {verifyToken} = require('../services/token.service')
const productController = require('../controllers/productController');
const {uploadProductImage, uploadProfileImage} = require('../utils/uploadImages')

router.post('/signup', validators.validateSignup, authController.createUser);
router.post('/otp',  tokenSevice.verifyOtp)
router.post('/login', validators.validateLogin, authController.loginUser);
router.post('/product', uploadProductImage.array('productImages'), productController.createProduct);
router.post('/forget-email', validators.validateForgetPassword, authController.forgetPassword);
router.post('/reset-password', verifyToken, authController.resetPassword);

router.delete('/user', authController.deleteAccount);
router.delete('/product', productController.deleteProduct);

router.get('/users', verifyToken, userController.listUsers);
router.put('/user', userController.updateUser);
router.put('/change-password', validators.validateChangePassword, authController.changePassword);

module.exports = router;