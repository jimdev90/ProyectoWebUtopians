const mongoose = require('mongoose');
const app = require('./app');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERISION
} = require('./constants');

const port = process.env.PORT || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`, (error) => {
        if (error) {
            throw new Error(error)
        }

        app.listen(port, () => {
            console.log('#################################################');
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERISION}`);
            console.log('#################################################');

        })
    }
)
