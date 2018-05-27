const express = require('express');
const app = express();

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

app.get('/api/adverts/:id', (req, res) => {
    const advert = adverts.find(c => c.id === parseInt(req.params.id));
    if (!advert) res.status(404).send('Not found');
    res.send(advert);
});

// PORT | export PORT=portNumber
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))