var Threads = require('../models/threads');
var bodyParser = require('body-parser');

module.exports = function(app) {

    // Get method when displaying comments
    app.get('/', function(req, res) {
        res.send('welcome')
        Threads.find({}, {sort: {created_at: -1}}, function (err, db_results, count){
            if(err) return err;
            if(!db_results) 
            {   
                comments = ['test']
                return res.render('No comments yet');
            }
            console.log(db_results.length + ' comments found');
            
            //res.render('mainPage.js', {comments: db_results})
        })
    })

   
    // Post method when adding a new comment
    app.post('/newComment', function(req, res) {
        // Checking carac length
        if(req.body.content.length > 140){
            return res.send('Wow dude, did you hear about summarizing ?')
        }
        /*
        if(req.body.content.indexOf('fuck') > -1 || req.body.content.indexOf('bitch') > -1 ){
            return res.send('Be polite cowboy')
        }*/
        
        var newCom = new Object ({
            username: 'Tester',
            content: req.body.content
        })
        Threads.newMessage(newCom, function(err, result){
            if(err) return res.send(err);
            res.send(result);
            //res.redirect('/allComments')
        })
    })
    // Post method when liking

    app.post('/addLike/:comId', function(req, res){
        Threads.newLike(req.params.comId, function(err, cb){
            if(err) return err;
            res.send('new like');
            //res.redirect('/allComments')
        })
    })
    // Post method when removing like
    app.post('/removeLike/:comId', function(req, res){
        Threads.newLike(req.params.comId, function(err, cb){
            if(err) return err;
            res.send('like removed');
            //res.redirect('/allComments')
        })
    })
}