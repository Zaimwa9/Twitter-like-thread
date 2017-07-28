var Threads = require('../models/threads.js');
var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function(app) {

    // Get method when displaying comments
    app.get('/', function(req, res) {
        console.log('received mainpage')
        Threads.find({}, {} ,{sort: {created_at: -1}}, function (err, db_results, count){
            if(err) {console.log(err);return err};
            if(!db_results) 
            {   
                console.log('test')
                return res.render('mainPage.ejs', {comments:[]});
            }
            console.log(db_results.length + ' comments found');
            res.render('mainPage.ejs', {comments: db_results, moment: moment})
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
            content: req.body.comment
        })
        Threads.newMessage(newCom, function(err, result){
            if(err) return res.send(err);
            res.redirect('/')
        })
    })
    // Post method when liking

    app.post('/addLike/:comId', function(req, res){
        Threads.newLike(req.params.comId, function(err, cb){
            if(err) return err;
            console.log('new like');
            res.redirect('/')
        })
    })
    // Post method when removing like
    app.post('/removeLike/:comId', function(req, res){
        Threads.removeLike(req.params.comId, function(err, cb){
            if(err) return err;
            console.log('like removed');
            res.redirect('/')
        })
    })
}