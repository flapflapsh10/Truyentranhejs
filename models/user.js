let USER_COLL = require('../database/user');
let ObjectID = require('mongoose').Types.ObjectId;

const { hash, compare } = require('bcrypt');

module.exports = class USER {
    static insert(username, name, password, phone, age, sex){
        return new Promise(async resolve => {
            try {
                console.log({username, name, password, phone, age, sex});
                
                let infoUser = await USER_COLL.findOne({username});
                if (infoUser) {
                    return resolve({error: true, message: 'exist'})
                }
                let newUser = new USER_COLL({username, name, password, phone, age, sex});
                let infoUserAfterInsert = await newUser.save();
                if(!infoUserAfterInsert){
                    return resolve({error: true, message:'cannot_insert_user'});
                }               
                return resolve({error: false, message: 'insert_success'});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getList(){
        return new Promise(async resolve => {
            try {
                let listUser = await USER_COLL.find({});
                if (!listUser){
                    return resolve({error: true, message: 'cannot_get_listUser'});
                }
                return resolve({error: false, message: 'get_list_user_success', data: listUser});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfo(id){
        return new Promise(async resolve => {
            try {
                let infoUser = await USER_COLL.findById(id);
                if(!infoUser){
                    return resolve({error: true, message:'not_found_infoUser'});
                }
                return resolve({error: false, message:'get_info_success'});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    static update({id, username, name, password, phone, age, sex}) {
        return new Promise(async resolve => {
            try {
                 console.log(id, username, name, password, phone, age);
                
                if(!ObjectID.isValid(id)){
                    return resolve({error: true, message:'params_invalid'});
                }
                let listUser = await USER_COLL.findByIdAndUpdate(id,{
                    username, name, password, phone, age, sex
                }
                ,{
                    new: true
                });
                console.log({listUser});
                
                if(!listUser){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listUser});


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove(id){
        return new Promise(async resolve => {
            try {
                let listUserForRemove = await USER_COLL.findByIdAndDelete(id);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}