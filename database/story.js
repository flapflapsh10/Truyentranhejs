var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({

    storyname:  {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    chapter:[{
        type: Schema.Types.ObjectId,
        ref: 'chapter'
    }],
    author: String,
    avatar: String,
    gallery: String
});

let STORY_COLL  = mongoose.model('story',storySchema);
module.exports = STORY_COLL;