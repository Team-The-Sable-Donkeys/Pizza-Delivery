const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'the camp alpha';

const init = (data) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    // app.use(cors());

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.get('/api/pizzas', (request, response) => {
        return data.getPizzas()
            .then((pizzas) => {
                return response.json(pizzas);
            });
    });

    app.get('/api/pizzas/:id', (request, response) => {
        const id = +request.params.id;
        return data.getPizzaById(id)
            .then((pizza) => {
                return response.json(pizza);
            });
    });

    app.post('/register', (request, response) => {
        const user = request.body;
        const saltRounds = 10;
        delete user.confirmPassword;
        user.authKey = jwt.sign(user, SECRET_KEY);
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds), null);
        return data.register(user)
            .then((value) => {
                response.json(value);
            });
    });

    app.post('/login', (request, response) => {
        const user = request.body;
        return data.login(user)
            .then((authKey) => {
                return response.json(authKey);
            });
    });

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    return Promise.resolve(app);
};

module.exports = { init };
