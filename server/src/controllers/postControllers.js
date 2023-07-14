const { Countries, Activities } = require("../db");
require("dotenv").config();

async function postActivities(req, res) {
  const { name, difficulty, duration, season, country } = req.body;

  try {
    const activity = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });
    if (country && country.length > 0) {
      const countriesToAdd = await Countries.findByPk(country);

      await activity.addCountries(countriesToAdd);
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(404).status({ error: error.message });
  }
}
module.exports = { postActivities };
