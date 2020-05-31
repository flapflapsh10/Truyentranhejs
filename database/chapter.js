var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chapterSchema = new Schema({

    chaptername:  {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    story: [{
        type: Schema.Types.ObjectId,
        ref: 'story'}],
    author: String,
    avatar: String,
    gallery: String
});

let CHAPTER_COLL  = mongoose.model('chapter',chapterSchema);
module.exports = CHAPTER_COLL;