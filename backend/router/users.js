var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/', function(req, res){
    db.users(function(err, rows) {
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send(rows);
    });
});

router.put('/', function(req, res) {
    const user = JSON.parse(JSON.stringify(req.body));
    db.insertUser(user, function(err, rows) {
        if (err) throw err;
        console.log('Inserts user : ', user);
        res.redirect('/users');
    });
});

router.delete('/:id', function(req, res) {
    db.deleteUser(req.params.id, function(err, rows) {
        if (err) throw err;
        console.log('Delete person id : ', req.params.id);
        res.redirect('/users');
    });
})

router.post('/', function(req, res) {
    const user = JSON.parse(JSON.stringify(req.body));
    db.updatePerson(person, function(err, rows) {
        if (err) throw err;
        console.log('Update person : ', user);
        res.redirect('/users');
    });
});

module.exports = router;