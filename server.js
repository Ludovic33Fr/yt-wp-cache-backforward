const express = require('express');
const app = express();
const port = 3000;

// Fonction pour simuler une latence de 2 secondes
const simulateLatency = (req, res, next) => {
    setTimeout(next, 2000);
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/CacheBF-On', simulateLatency, (req, res) => {
    res.sendFile(__dirname + '/Eligible.html');
});

app.get('/CacheBF-Off', simulateLatency, (req, res) => {
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate, private');
    res.sendFile(__dirname + '/NonEligible.html');
});

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css');
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
