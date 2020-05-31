let route = require('express').Router();
const CATEGORY_MODEL =  require('../models/category')

route.post('/them-danh-muc', async(req, res) => {
    let {title, description} = req.body;
    console.log({title, description});

    let infoProductForInsert = await CATEGORY_MODEL.insert(title, description);
    console.log({infoProductForInsert});
    
    res.json({infoProductForInsert})
    
})

module.exports = route;
