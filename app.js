//Pascal naming convention joi= class so J
const Joi = require('joi');
const express = require('express');
const app = express();
//MongoDB
const mongoose = require('mongoose');
//DB connection 
mongoose.connect('mongodb://localhost:27017/express-restful');
//load all files in model
const fs = require('fs');
fs.readdirSync(__dirname + '/models').forEach(function (filename) {
   if (~filename.indexOf('js')) require(__dirname + '/models/' + filename) 
});
//return piece of middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/adverts', (req, res) => {
    mongoose.model('adverts').find((err, adverts) => {
        res.send(adverts)
    });
});

//Manually asign ID because not Working with a Database
app.post('/api/adverts', (req, res) => {

    const { error } = validateAvert(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const advert = {
        name: req.body.name,
    }
});

//modif if not exist return 404 
//if invalid validate return 400
app.put('/api/adverts/:id', (req, res) => {
    //exist else 404
    const advert = adverts.find(c => c.id === parseInt(req.params.id));
    if (!advert) return res.status(404).send('Not found');
    //if not return, the code bellow will be executed
    //same to do res.status(404).send('Not found'); NEWLINE return;



    //validation else 400

    const { error } = validateAvert(req.body); //result.error

    // 400 Bad Request
    if (error) return res.status(400).send(error.details[0].message);



    //update 
    advert.name = req.body.name;
    //return the course
    res.send(advert);
});

app.get('/api/adverts/:id', (req, res) => {

    mongoose.model('adverts').findById(req.params.id, (err, advert) => {
        if (!advert) return res.status(404).send('Not found');
        res.send(advert)

    });
});

app.delete('/api/adverts/:id', (req, res) => {
    if (!advert) return res.status(404).send('Not found');

    //delete
    const index = adverts.indexOf(advert);
    adverts.splice(index, 1);

    res.send(advert);
});




function validateAvert(advert) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(advert, schema);

}



// PORT | export PORT=portNumber
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))