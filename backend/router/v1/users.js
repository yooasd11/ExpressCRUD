var express = require('express');
var db = require('../../config/db');
var APIError = require('../../utils/APIError');
var router = express.Router();
var httpStatus = require('http-status');

router.get('/', function(req, res){
    db.users(function(err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

router.put('/', function(req, res, next) {
    const user = JSON.parse(JSON.stringify(req.body));
    db.insertUser(user, function(err, rows) {
        if (err) {
            next(new APIError({
                ...err,
                message: "Already exists!",
                status: httpStatus.INTERNAL_SERVER_ERROR,
            }));
            return;
        }
        res.end();
        console.log('Inserts user : ', user);
    });
});

router.delete('/:id', function(req, res) {
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