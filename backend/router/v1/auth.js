var express = require('express');
var db = require('../../config/db');
var APIError = require('../../utils/APIError');
var router = express.Router();
var httpStatus = require('http-status');

router.get('/', function (req, res) {
    if (req.session && req.session.loggedOn && req.session.userId) {
        res.send({
            auth: true,
            userId: req.session.userId,
        });
    } else {
        res.send({
            auth: false,
            userId: null,
        });
    }
});

router.post('/login', function (req, res, next) {
    if (req.body.id && req.body.password) {
        const userData = { id : req.body.id, password : req.body.password };
        db.selectUser(userData, function (err, rows) {
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
                req.session.userId = userData.id;
                req.session.loggedOn = true;
                req.session.save((err) => {
                    if (err) {
                        next(new APIError({
                            ...err,
                            message: "Login process eror",
                            status: httpStatus.INTERNAL_SERVER_ERROR,
                        }))
                        return;
                    }
                    console.log('New session saved : ', req.session);
                });
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

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.send({
        success: true,
    });
});

module.exports = router;
