const async = () => {
    return Promise.resolve();
};

async()
    .then(() => require('./db').init('mongodb://nivalen:123ndb123@ds141232.mlab.com:41232/nivalen-db'))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running at localhost:${process.env.PORT || 3000}`);
        });
    });