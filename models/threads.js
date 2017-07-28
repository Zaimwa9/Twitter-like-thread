var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ThreadsSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    content: String,
    likesArray: Array,
    created_at: Date
});

ThreadsSchema.statics.newMessage = function(comment, cb) {
    console.log('Adding new comment: ' + comment.content);
    console.log(content.username);

    var newMessage = new Threads ({
        username: comment.username,
        content: comment.content,
        likesArray: [],
        created_at: new Date().moment().format('MMMM Do YYYY, h:mm:ss a')
    })

    newMessage.save(function(err, db_result){
        if (err) return ('Saving error');
        console.log(db_result);
    })
}

ThreadsSchema.statics.newLike = function (comment, cb) {
    Threads.findOne({_id: comment._id}, function (err, db_result) {
        if (err) return ('Like failed')
        this.likeArray.push['newlike']
        return cb(null, db_result)
    })
}

ThreadsSchema.statics.removeLike = function (comment, cb) {
    Threads.findOne({_id: comment._id}, function (err, db_result) {
        if (err) return ('Like failed')
        if(this.likeArray.length === 0)
        {   
            console.log(`Can't unlike what's not liked!`)
            return cb(new Error('Woooow dude nobody liked it anyway'))
        }
        this.likeArray.splice(0,1)
        return cb(null, db_result)
    })
}

var Threads = mongoose.model('Threads', ThreadsSchema);

global.Threads = Threads;

module.exports = Threads;