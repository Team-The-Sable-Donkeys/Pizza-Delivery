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
            .findOne({'id': id})
            .then((pizza) => {
                return Promise.resolve(pizza);
            })
    };

    const data = {
        getPizzas,
        getPizzaById
    };
    
    return Promise.resolve(data);
};

module.exports = { init };