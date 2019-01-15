var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Root');
});

app.get('/persons', function(req, res){
    db.persons(function(err, rows) {
        if (err) throw err;

        console.log('The solution is: ', rows);
        res.send(rows);
    });
});

app.put('/persons', function(req, res) {
    const person = JSON.parse(JSON.stringify(req.body));
    db.insertPerson(person, function(err, rows) {
        if (err) throw err;
        console.log('Inserts person : ', person);
        res.redirect('/persons');
    });
});

app.delete('/persons/:id', function(req, res) {
    db.deletePerson(req.params.id, function(err, rows) {
        if (err) throw err;
        console.log('Delete person id : ', req.params.id);
        res.redirect('/persons');
    });
})

app.post('/persons', function(req, res) {
    const person = JSON.parse(JSON.stringify(req.body));
    console.log(person);
    db.updatePerson(person, function(err, rows) {
        if (err) throw err;
        console.log('Update person : ', person);
        res.redirect('/persons');
    });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});