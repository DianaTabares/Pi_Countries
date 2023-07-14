const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const {Countries} = require('./src/db')
const PORT = 3001;

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
axios.get('http://localhost:5000/countries').then(({data})=>{
  const countries =[];
  data.forEach((country) => {
    const newContries = {
      id:country.cca3,
      name: country.name.common.toUpperCase(),
      flag: country.flags.png,
      continent: country.continents[0],
      capital:country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population
    }
    countries.push(newContries); 
  });
  Countries.bulkCreate(countries)
    .then(()=>{
      console.log('Base de Datos cargada correctamente');
    })
    .catch((error)=>{
      console.log(error.message);
    })
})
}).catch(error => console.error(error))
