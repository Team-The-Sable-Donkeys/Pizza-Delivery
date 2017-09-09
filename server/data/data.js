const bcrypt = require('bcrypt-nodejs');
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
            });
    };

    const updateProfile = (user) => {
        const saltRounds = 10;
        let newFirstName;
        let newLastName;
        let city;
        let street;
        let country;
        let newPhoneNumber;
        let newAddress = {
            city,
            street,
            country
        };

        if (user.newData.password === '' || user.newData.password === null){
            newPassword = user.oldData.password;
        } else {
            newPassword = user.newData.password;
        }

        if (user.newData.firstName){
            newFirstName = user.newData.firstName;
        } else {
            newFirstName = user.oldData.firstName;
        }

        if (user.newData.lastName){
            newLastName = user.newData.lastName;
        } else {
            newLastName = user.oldData.lastName;
        }

        if (user.newData.address.city){
            newAddress.city = user.newData.address.city;
        } else {
            newAddress.city = user.oldData.address.city;
        }

        if (user.newData.address.street){
            newAddress.street = user.newData.address.street;
        } else {
            newAddress.street = user.oldData.address.street;
        }

        if (user.newData.address.country){
            newAddress.country = user.newData.address.country;
        } else {
            newAddress.country = user.oldData.address.country;
        }

        if ( user.newData.phoneNumber === '' || user.newData.phoneNumber === null ){
            newPhoneNumber = user.oldData.phoneNumber;
        } else if(user.newData.phoneNumber.toString().length < 8) {
            newPhoneNumber = user.oldData.phoneNumber;
        } else {
            newPhoneNumber = user.newData.phoneNumber;
        }        

        return db.collection('pizza-users')
            .update({ 'username': user.oldData.username },
            {
                $set: {
                    firstName: newFirstName,
                    lastName: newLastName,
                    password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(saltRounds), null),
                    phoneNumber: newPhoneNumber,
                    address: newAddress,
                },
            }
            );
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
                const ordersLength = Math.ceil(orders.length / ORDERS_PER_PAGE);
                orders = orders.slice((page - 1) * ORDERS_PER_PAGE, page * ORDERS_PER_PAGE);
                return Promise.resolve({
                    orders: orders,
                    length: ordersLength
                });
            })
    }

    const insertMsg = (data) => {
        return db.collection('pizza-messages').insert({
            name: data.name,
            email: data.email,
            message: data.message
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
        insertMsg,
        emptyUserCart,
        getOrders,
        getSizes,
        getFlours,
        getMeats,
        getDairies,
        getSauces,
        updateProfile
    };

    return Promise.resolve(data);
};

module.exports = { init };