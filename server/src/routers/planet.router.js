const express = require('express');
const PlanetController = require('../controllers/planet.controller');
// const validateId = require('../middlewares/validateId');
const artistRouter = express.Router();

artistRouter.get('/', PlanetController.getAll);
artistRouter.get('/:id',  PlanetController.getById);
artistRouter.post('/', PlanetController.create);
artistRouter.put('/:id',  PlanetController.update);
artistRouter.delete('/:id', PlanetController.delete);

module.exports = artistRouter;