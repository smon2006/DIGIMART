const customerAuthController = require('../../controllers/home/customerAuthController')
const router = require('express').Router()

router.post('/customer/customer-register',customerAuthController.customer_register)
router.post('/customer/customer-login',customerAuthController.customer_login)
router.post('/customer/forgot-password',customerAuthController.forgot_password)
router.post('/customer/change-password',customerAuthController.customer_change_password)
router.post('/customer/update-name',customerAuthController.customer_update_name)

router.get('/customer/logout',customerAuthController.customer_logout)

module.exports = router