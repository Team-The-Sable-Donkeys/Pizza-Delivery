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

    const getSizes = () => {
        return db.collection('custom-pizza-sizes')
        .find()
        .toArray()
        .then((sizes) => {
            return Promise.resolve(sizes);
        });
    };

    const getFlours = () => {
        return db.collection('custom-pizza-flours')
        .find()
        .toArray()
        .then((flours) => {
            return Promise.resolve(flours);
        });
    };

    const getMeats = () => {
        return db.collection('custom-pizza-meats')
        .find()
        .toArray()
        .then((meats) => {
            return Promise.resolve(meats);
        });
    };

    const getDairies = () => {
        return db.collection('custom-pizza-dairies')
        .find()
        .toArray()
        .then((dairies) => {
            return Promise.resolve(dairies);
        });
    };

    const getSauces = () => {
        return db.collection('custom-pizza-sauces')
        .find()
        .toArray()
        .then((sauces) => {
            return Promise.resolve(sauces);
        });
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
        pizza.quantity = 1;

        return getUserById(userId)
            .then((user) => {
                let isInCart = false;
                user.cart.forEach((p) => {
                    if (+p.id === +pizza.id) {
                        isInCart = true;
                    }
                });
                // if pizza is in cart, dont add it, update the quantity
                if (isInCart) {
                    let newCart = user.cart.map((p) => {
                        if (+p.id === +pizza.id) {
                            p.quantity++;
                            return p;
                        }
                        else {
                            return p;
                        }
                    })
                    return db.collection('pizza-users')
                        .update({ 'id': userId },
                        {
                            $set: {
                                cart: newCart,
                            },
                        }
                        );
                }
                // if pizza is not in cart, add it
                else {
                    return db.collection('pizza-users')
                        .update({ 'id': userId },
                        {
                            $push: {
                                cart: pizza,
                            },
                        }
                        );
                }
            });
    };

    const deletePizzaFromCart = (userId, pizza) => {
        return db.collection('pizza-users')
            .update({ 'id': userId },
            {
                $pull: {
                    cart: { name: pizza.name },
                },
            }
            );
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

    const insertOrder = (order) => {
        return db.collection('pizza-orders')
            .insert(order);
    }

    const emptyUserCart = (userId) => {
        return db.collection('pizza-users')
            .update(
                {
                    'id': userId
                },
                {
                    $set: {
                        cart: []
                    }
                }
            )
    }

    const getOrders = (page) => {
        return db.collection('pizza-orders')
            .find()
            .toArray()
            .then((orders) => {
                const ORDERS_PER_PAGE = 12;
                orders = orders.slice((page - 1) * ORDERS_PER_PAGE, page * ORDERS_PER_PAGE);
                return Promise.resolve(orders);
            })
    }

    const data = {
        getPizzas,
        getPizzaById,
        register,
        login,
        getUsers,
        getUserById,
        updateUserCart,
        deletePizzaFromCart,
        insertOrder,
        emptyUserCart,
        getOrders,
        getSizes,
        getFlours,
        getMeats,
        getDairies,
        getSauces
    };

    return Promise.resolve(data);
};

module.exports = { init };