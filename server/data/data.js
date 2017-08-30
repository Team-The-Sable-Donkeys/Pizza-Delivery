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

    const getUsers = () => {
        return db.collection('pizza-users')
            .find()
            .toArray()
            .then((users) => {
                return Promise.resolve(users);
            })
    };

    const getUserById = (id) => {
        return db.collection('pizza-users')
            .findOne({ 'id': id })
            .then((user) => {
                return Promise.resolve(user);
            })
    };

    const getPizzaById = (id) => {
        return db.collection('pizzas')
            .findOne({ 'id': id })
            .then((pizza) => {
                return Promise.resolve(pizza);
            })
    };

    const updateUserCart = (userId, pizza) => {
        return db.collection('pizza-users')
            .update({ 'id': userId },
            {
                $push: {
                    cart: pizza,
                },
            }
            )
            .then((user) => {
                return Promise.resolve(user);
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
                    user.id = users.length + 1;
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
                    // const token = jwt.sign(foundUser, SECRET_KEY);
                    const token = foundUser.authKey;
                    return Promise.resolve(token);
                }
            });
    };

    const data = {
        getPizzas,
        getPizzaById,
        register,
        login,
        getUsers,
        getUserById,
        updateUserCart
    };

    return Promise.resolve(data);
};

module.exports = { init };