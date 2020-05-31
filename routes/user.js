let route = require('express').Router();
const  USER_MODEL = require('../models/user');

route.get('/danh-sach-user', async (req, res) => {
    var listUser = await USER_MODEL.getList();
    res.json({listUser: listUser.data});

})
route.post('/them-user', async (req, res) =>{
    let{username,name,password,phone,age} = req.body;
    console.log(username,name,password,phone,age);
    var addUser = await USER_MODEL.insert(username,name,password,phone,age);
    res.json({addUser});
})
 route.post('/sua-user', async (req, res) =>{
    let {id} = req.query;
    let{username,name,password,phone,age} = req.body;
    console.log(id, username, name, password, phone, age);
    var updateUser = await USER_MODEL.update({id, username,name,password,phone,age});
    res.json({updateUser});
 })

module.exports = route;