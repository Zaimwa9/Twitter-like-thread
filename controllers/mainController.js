var Threads = require('../models/threads.js');
var bodyParser = require('body-parser');
var moment = require('moment');

var getHashTags = function(text){
    var hashTags, i, len, word, words;
    words = text.split(/[\s\r\n]+/);
    hashTags = [];
        for (i = 0, len = words.length; i < len; i++) {
            word = words[i];
            if (word.indexOf('#') === 0) {
            hashTags.push(word);
            }
        }
    console.log(hashTags + ' From function')    
    return hashTags;
}

module.exports = function(app) {

    // Get method when displaying comments
    app.get('/', function(req, res) {
        console.log(req.connection.remoteAddress)
        Threads.find({})
         .sort({created_at: -1})
         .limit(10).
         exec(function (err, db_results, count){
            if(err) {console.log(err);return err};
            if(!db_results) 
            {   
                console.log('test')
                return res.render('mainPage.ejs', {comments:[]});
            }
            console.log(db_results.length + ' comments found');
            res.render('mainPage.ejs', {comments: db_results, moment: moment, ip: req.connection.remoteAddress})
        })
    })

   
    // Post method when adding a new comment
    app.post('/newComment', function(req, res) {
        
        // Checking carac length 
        if(req.body.comment.length > 140){
            return res.send('Wow dude, did you hear about summarizing ?')
        }
        
        if(req.body.comment.indexOf('fuck') > -1 || req.body.comment.indexOf('bitch') > -1 ){
            return res.send('Be polite cowboy')
        }
        
        var newCom = new Object ({
            username: 'Tester' + Math.random().toFixed(2),
            content: req.body.comment,
            ip: req.connection.remoteAddress, 
            hashtags: getHashTags
        })
        console.log(newCom.hashtags)
        // Wrap it inside hashtags stuff

        Threads.newMessage(newCom, function(err, result){
        if(err) return res.send(err);
        res.redirect('/')
         })
    })
    // Post method when liking

    app.post('/addLike/:comId', function(req, res){
        Threads.findOne({_id: req.params.comId}, function(err, db_result){
            if (err) return err;
            db_result.newLike(req.connection.remoteAddress, function(err, cb){
                if (err) return err;
                console.log('new like');
                res.redirect('/')                
            })
        })
        /*Threads.newLike(req.params.comId, req.connection.remoteAddress, function(err, cb){
            if(err) return err;
            console.log('new like');
            res.redirect('/')
        })*/
    })
    // Post method when removing like
    app.post('/removeLike/:comId', function(req, res){
        Threads.findOne({_id: req.params.comId}, function(err, db_result){
            if (err) return err;
            db_result.removeLike(req.connection.remoteAddress, function(err, cb){
                if (err) return err;
                console.log('like removed');
                res.redirect('/')                
            })        
        
        /*Threads.removeLike(req.params.comId, req.connection.remoteAddress, function(err, cb){
            if(err) return err;
            console.log('like removed');
            res.redirect('/')
        })*/
        })
    })

    app.post('/delete/:comId', function(req, res){
        Threads.findOneAndRemove({_id: req.params.comId}, function(err, db) {
            if (err) return err;
            console.log('removed');
            res.redirect('/')
        })
    })
}