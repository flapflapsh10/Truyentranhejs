let CATEGORY_COLL = require('../database/category');
let ObjectID = require('mongoose').Types.ObjectId;

const { hash, compare } = require('bcrypt');

module.exports = class CATEGORY {
    static insert(title, description){
        return new Promise(async resolve => {
            try {
                let infoCategory = await CATEGORY_COLL.findOne({title});
                if (infoCategory) {
                    return resolve({error: true, message: 'exist'})
                }
                let newCategory = new CATEGORY_COLL({title, description});
                let infoCategoryAfterInsert = await newCategory.save();
                if(!infoCategoryAfterInsert){
                    return resolve({error: true, message:'cannot_insert_category'});
                }               
                return resolve({error: false, message: 'insert_success', data: infoCategoryAfterInsert});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    // static insert2(){
    //     return new Promise(async resolve => {
    //         try{
    //             let infoCategory = await CATEGORY_COLL.fineOne(title);
    //             if(infoCategory){
    //                 return resolve({error: true, message: 'exist'});
    //             }
    //             let newCategory = new CATEGORY_COLL(title, description);
    //             let newCategory2 = await newCategory.save();
    //             if(newCategory2){
    //                 return resolve({error: false, message: 'Sai roi'});
    //             }
    //             else{
    //                 return resolve({error: true, message: 'Dung roi', data: newCategory2});
    //             }
    //         }catch(error){
    //             return resolve({error: true, message: error.message});
    //         }
    //     }  ) 
    // }

    static getList(){
        return new Promise(async resolve => {
            try {
                let listCategory = await CATEGORY_COLL.find({});
                if (!listCategory){
                    return resolve({error: true, message: 'cannot_get_listChapter'});
                }
                return resolve({error: false, message: 'get_list_chapter_success', data: listCategory});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfo(id){
        return new Promise(async resolve => {
            try {
                let infoCategory = await CATEGORY_COLL.findById(id);
                if(!infoCategory){
                    return resolve({error: true, message:'not_found_infoUser'});
                }
                return resolve({error: false, message:'get_info_success'});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    static update({id, chaptername, author, status, category, view}) {
        return new Promise(async resolve => {
            try {
                 console.log(id, chaptername, author, status, category, view);
                
                if(!ObjectID.isValid(id)){
                    return resolve({error: true, message:'params_invalid'});
                }
                let listCategory     = await CATEGORY_COLL.findByIdAndUpdate(id,{
                    chaptername, author, status, category, view
                }
                ,{
                    new: true
                });
                console.log({listChapter});
                
                if(!listChapter){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listChapter});


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove(id){
        return new Promise(async resolve => {
            try {
                let listChapterForRemove = await CATEGORY_COLL.findByIdAndDelete(id);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}