var express = require('express');
var db = require('../../config/db');
var router = express.Router();

router.get('/', function(req, res){
    db.users(function(err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

router.put('/', function(req, res) {
    const user = JSON.parse(JSON.stringify(req.body));
    db.insertUser(user, function(err, rows) {
        if (err) {
            console.log("error while insert : ", err);
            res.send(res);
            return;
        }
        console.log('Inserts user : ', user);
    });
});

router.delete('/:d', function(req, res) {
    db.deleteUser(req.params.id, function(err, rows) {
        if (err) throw err;
        console.log('Delete person id : ', req.params.id);
    });
})

router.post('/', function(req, res) {
    const user = JSON.parse(JSON.stringify(req.body));
    db.updatePerson(person, function(err, rows) {
        if (err) throw err;
        console.log('Update person : ', user);
    });
});

module.exports = router;