const { Planet } = require('../../db/models');

class PlanetService {
  static getAll() {
    return Planet.findAll();
  }

  static getById(id) {
    return Planet.findByPk(id);
  }

  static create(data) {
    return Planet.create(data);
  }

  static async update(id, data) {
    const planet = await Planet.findByPk(id);
    if (!planet) {
      throw new Error('Planet not found');
    }
    return planet.update(data);
  }

  static delete(id) {
    return  Planet.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = PlanetService;
