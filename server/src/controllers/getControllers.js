const { Countries, Activities } = require('../db');
require('dotenv').config();

async function getCountries(req, res) {
  try {
      const countries = await Countries.findAll({
        attributes:{exclude:['country_activity']},
        include:[Activities]
      });
      res.status(200).json(countries);
    } catch (error) {
    res.status(500).json({ error: error.message });
    };
};

async function getCountriesById(req, res) {
  const id = req.params.id.toUpperCase();
  try {
    const country = await Countries.findByPk(id, {
        include: Activities, 
      });
      if (!country) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
        res.json(country);
  } catch (error) {
        res.status(404).status({ error: error.message })
  };
};

async function getCountriesName(req, res) {
    const { name } = req.query;
    try {
      const countries = await Countries.findAll({
        where: {
          name: name.toUpperCase(),
        },
      });
      if (countries.length === 0) {
        return res.status(404).json({ error: 'No se encontraron países' });
      }
      res.json(countries);
    } catch (error) {
        res.status(404).status({ error: error.message })
    };
};

async function getActivities(req, res) {
  try {
    const activities = await Activities.findAll({
      attributes:{exclude:['country_activity']},
      include:[Countries]
    });
    res.json(activities);
  } catch (error) {
      res.status(404).status({ error: error.message })
  };
};
module.exports = {getCountries,getCountriesById,getCountriesName,getActivities};

