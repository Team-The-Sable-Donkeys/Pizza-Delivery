const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

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

    app.get('/api/custom-pizza-sizes', (request, response) => {
        return data.getSizes()
            .then((sizes) => {
                return response.json(sizes);
            });
    });

    app.get('/api/custom-pizza-flours', (request, response) => {
        return data.getFlours()
            .then((flours) => {
                return response.json(flours);
            });
    });

    app.get('/api/custom-pizza-meats', (request, response) => {
        return data.getMeats()
            .then((meats) => {
                return response.json(meats);
            });
    });

    app.get('/api/custom-pizza-dairies', (request, response) => {
        return data.getDairies()
            .then((dairies) => {
                return response.json(dairies);
            });
    });

    app.get('/api/custom-pizza-sauces', (request, response) => {
        return data.getSauces()
            .then((sauces) => {
                return response.json(sauces);
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
        const page = +request.query.page;
        return data.getOrders(page)
            .then((orders) => {
                return response.json(orders);
            });
    });

    app.get('/api/user-orders', (request, response) => {
        return data.getUserOrders()
            .then((orders) => {
                return response.json(orders);
            });
    });

    app.post('/api/orders', (request, response) => {
        const order = request.body;
        return data.insertOrder(order);
    });

    app.post('/contact', (request, response) => {
        const msg = request.body;
        return data.insertMsg(msg).then(() => {
            return Promise.resolve();
        });
    });

    app.post('/api/users' , (request, response) => {
        const input = request.body;
        return data.updateProfile(input)
            .then(() => {
                return response.status(201);
            });
    })

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    return Promise.resolve(app);
};

module.exports = { init };
