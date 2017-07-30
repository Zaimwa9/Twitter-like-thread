var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ThreadsSchema = new Schema({
    username: { type: String, required: true },
    ip: String,
    content: String,
    likesArray: Array,
    hashtags: Array,
    created_at: Date
});

ThreadsSchema.statics.newMessage = function(comment, cb) {
    console.log('Adding new comment: ' + comment.content);
    
    var newMessage = new Threads ({
        username: comment.username,
        ip: comment.ip,
        content: comment.content,
        likesArray: [],
        hashtags: comment.hashtags(comment.content),
        created_at: new Date()
    })

    newMessage.save(function(err, db_result) {
        if (err) console.log(err);
        console.log(db_result);
        return cb(null, db_result)
    })
}

ThreadsSchema.methods.newLike = function (ip, cb) {
    this.likesArray.push(ip);
    this.save(cb) 
    /*console.log(comment)
    Threads.findOneAndUpdate({_id: comment}, {$push: {likesArray: ip}}, function (err, db_result) {
        if (err) return ('Like failed')
        return cb(null, db_result)
    })*/
}

ThreadsSchema.methods.removeLike = function (ip, cb) {
    var index = this.likesArray.indexOf(ip);
    if (index > -1) {
        this.likesArray.splice(index, 1);
    this.save(cb); 
    }
    /*Threads.findOneAndUpdate({_id: comment}, {$pop: {likesArray: "x"}}, function (err, db_result) {
        if (err) return ('Unlike failed')
        return cb(null, db_result)
    })*/
}

var Threads = mongoose.model('Threads', ThreadsSchema);

global.Threads = Threads;

module.exports = Threads;