let route = require('express').Router();
const STORY_MODEL = require('../models/story')
let {renderToView} = require('../utils/childRouting')

route.get('/',(req, res) => {
    renderToView(req, res, 'pages/home',{})
})

route.get('/truyen-tranh',async (req, res) => {
    renderToView(req, res, 'pages/story-detail',{})
})

route.post('/truyen-tranh', async (req, res) => {
    let {id} = req.query;
    console.log({id});
    
    let infoStory = await STORY_MODEL.getInfo(id);
    console.log({infoStory});

    res.json({infoStory});
})

module.exports = route;