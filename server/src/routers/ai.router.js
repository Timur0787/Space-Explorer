const AiController = require('../controllers/ai.controller')

const aiRouter = require('express').Router()

aiRouter.post('/questions',AiController.askAi)

module.exports = aiRouter