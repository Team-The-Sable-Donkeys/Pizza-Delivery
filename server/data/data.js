const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'the camp alpha';

const init = (db) => {
    const objectId = require('mongodb').ObjectID;

    const getPizzas = () => {
        return db.collection('pizzas')
            .find()
            .toArray()
            .then((pizzas) => {
                return Promise.resolve(pizzas);
            })
    };

    const getPizzaById = (id) => {
        return db.collection('pizzas')
            .findOne({ 'id': id })
            .then((pizza) => {
                return Promise.resolve(pizza);
            })
    };

    const register = (user) => {
        return db.collection('pizza-users')
            .find()
            .toArray()
            .then((users) => {
                let canRegister = true;
                users.forEach((u) => {
                    if (u.username === user.username) {
                        canRegister = false;
                    }
                })
                if (canRegister) {
                    return db.collection('pizza-users')
                        .insert(user);
                } else {
                    throw new Error('Username is already in use!');
                }
            })
    };

    const login = (user) => {
        return db.collection('pizza-users')
            .findOne({ 'username': user.username })
            .then((foundUser) => {
                if (bcrypt.compareSync(user.password, foundUser.password)) {
                    const token = jwt.sign(foundUser, SECRET_KEY);
                    return Promise.resolve(token);
                }
            });
    };

    const data = {
        getPizzas,
        getPizzaById,
        register,
        login
    };

    return Promise.resolve(data);
};

module.exports = { init };