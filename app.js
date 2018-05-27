//Pascal naming convention joi= class so J
const Joi = require('joi');
const express = require('express');
const app = express();

//return piece of middleware
app.use(express.json());

const adverts = [
    { id: 1, name: 'advert1' },
    { id: 2, name: 'advert2' },
    { id: 3, name: 'advert3' },
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/adverts', (req, res) => {
    res.send([1, 2, 3]);
});

//Manually asign ID because not Working with a Database
app.post('/api/adverts', (req,res) => {
    const schema ={
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const advert = {
        id: adverts.length +1,
        name: req.body.name,
    }
    adverts.push(advert);
    res.send(advert);
});



app.get('/api/adverts/:id', (req, res) => {
    const advert = adverts.find(c => c.id === parseInt(req.params.id));
    if (!advert) res.status(404).send('Not found');
    res.send(advert);
});

// PORT | export PORT=portNumber
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))