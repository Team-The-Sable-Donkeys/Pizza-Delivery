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
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
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

    app.get('/api/users', (request, response) => {
        return data.getUsers()
            .then((user) => {
                return response.json(user);
            });
    });

    app.get('/api/users/:id', (request, response) => {
        const id = +request.params.id;
        return data.getUserById(id)
            .then((user) => {
                return response.json(user);
            });
    });

    app.put('/api/cart', (request, response) => {
        const userId = +request.body.userId;
        const pizza = request.body.pizza;
        return data.updateUserCart(userId, pizza)
            .then(() => {
                return response.status(201);
            });
    });

    app.delete('/api/cart', (request, response) => {
        const userId = +request.body.userId;
        const pizza = request.body.pizza;
        return data.deletePizzaFromCart(userId, pizza);
    });

    app.delete('/api/empty', (request, response) => {
        const userId = +request.body.id;
        return data.emptyUserCart(userId);
    });

    app.post('/register', (request, response) => {
        const user = request.body;
        const saltRounds = 10;
        delete user.confirmPassword;
        user.cart = [];
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

    app.get('/api/orders', (request, response) => {
        return data.getOrders()
            .then((orders) => {
                return response.json(orders);
            });
    });

    app.post('/api/orders', (request, response) => {
        const order = request.body;
        return data.insertOrder(order);
    });

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    return Promise.resolve(app);
};

module.exports = { init };
