const jwt = require('jsonwebtoken')
const express = require('express');
const firebaseTokenValidator = require('../../validators/firebaseTokenValidator.js')
const firebaseAuthMiddleware = require('../../middlewares/firebaseAuthMiddleware.js')
const accessTokenValidator = require('../../validators/accessTokenValidator.js')
const LoginService = require('../../services/LoginService.js')
const config = require('../../config/index.js')
const Success = require('../../models/SuccessResponse.js')
const TokenResponse = require('../../models/TokenResponse.js')


const router = express.Router()
const loginService = new LoginService()

router.post('/token', firebaseTokenValidator, firebaseAuthMiddleware, async (req, res) => {

    const token = await loginService.authenticateUser(req.uid)
    
    res.status(200).json(Success.createSuccessResponse(TokenResponse.create(token)))
})

router.post('/refreshToken', accessTokenValidator, async (req, res) => {
    console.log("Refresh token")
    const response = await loginService.authenticateUserBasedOnRefreshToken(req.accessToken)
    res.status(response.code).json(response)
})

module.exports = router;