const { Router } = require("express");
const {getCountries,getCountriesById,getCountriesName,getActivities} = require('../controllers/getControllers');
const {postActivities} = require('../controllers/postControllers');

const router = Router();
router.get('/countries',(req,res,next)=>{
    if(Object.keys(req.query).length > 0){
        getCountriesName(req,res,next);
    }else{
        getCountries(req,res,next);
    }
});
router.get('/countries/:id',getCountriesById);
router.get('/activities',getActivities);
router.post('/activities',postActivities);

module.exports = router;
