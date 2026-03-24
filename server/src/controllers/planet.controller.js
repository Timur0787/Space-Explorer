const PlanetService = require('../services/planet.service');

class PlanetController {
  static async getAll(req, res) {
    const artists = await PlanetService.getAll();
    res.status(200).json(artists);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const artist = await PlanetService.getById(id);
    if (!artist) {
      return res.status(404).send('Planet not found');
    }
    return res.json(artist);
  }

  static async create(req,res) {
    const { data } = req.body
    const artist = await PlanetService.create(data);
    return res.status(201).json(artist);
  }

  static async update(req,res) {
    const { id } = req.params
    const { data } = req.body
    const artist = await PlanetService.update(id, data);
    return res.status(201).json(artist);
  }

  static async delete(req, res) {
    const { id } = req.params;
     await PlanetService.delete(id);
    return res.sendStatus(204);
  }
}
module.exports = PlanetController;