var express = require('express');
var db = require('../../config/db');
var APIError = require('../../utils/APIError');
var router = express.Router();
var httpStatus = require('http-status');

router.post('/', function (req, res, next) {
    if (req.session && req.session.loggedOn) {
        console.log('already logged in : ', req.session);
        res.send('Already logged In');
        return;
    }

    if (req.body.id && req.body.password) {
        db.selectUser({ id: req.body.id, password: req.body.password }, function (err, rows) {
            if (err) {
                next(new APIError({
                    ...err,
                    message: "Database internal error from server",
                    status: httpStatus.INTERNAL_SERVER_ERROR,
                }))
                return;
            }

            if (rows.length > 0) {
                // Login successful
                req.session.loggedOn = true;
                console.log('new log in : ', req.session);
                res.send('Login Succesful!');
            } else {
                next(new APIError({
                    ...err,
                    message: "No match!",
                    status: httpStatus.INTERNAL_SERVER_ERROR,
                }))
            }
        });
    }
});

module.exports = router;
