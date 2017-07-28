var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ThreadsSchema = new Schema({
    username: { type: String, required: true },
    content: String,
    likesArray: Array,
    created_at: Date
});

ThreadsSchema.statics.newMessage = function(comment, cb) {
    console.log('Adding new comment: ' + comment.content);

    var newMessage = new Threads ({
        username: comment.username,
        content: comment.content,
        likesArray: [],
        created_at: new Date()
    })

    newMessage.save(function(err, db_result){
        if (err) console.log(err);
        console.log(db_result);
        return cb(null, db_result)
    })
}

ThreadsSchema.statics.newLike = function (comment, cb) {
    console.log(comment)
    Threads.findOneAndUpdate({_id: comment}, {$push: {likesArray: "x"}}, function (err, db_result) {
        if (err) return ('Like failed')
        return cb(null, db_result)
    })
}

ThreadsSchema.statics.removeLike = function (comment, cb) {
    Threads.findOneAndUpdate({_id: comment}, {$pop: {likesArray: "x"}}, function (err, db_result) {
        if (err) return ('Like failed')
        return cb(null, db_result)
    })
}

var Threads = mongoose.model('Threads', ThreadsSchema);

global.Threads = Threads;

module.exports = Threads;