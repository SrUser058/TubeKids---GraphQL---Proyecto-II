const Father = require('../models/father')

// get the father by the email and password
const getAllFather = async (email, password) => {
    try {
        await Father.findOne({ 'email': email, 'password': password })
            .then(fathers => {
                if (fathers.email == email && fathers.password == password) {
                    return fathers;
                } else {
                    return null;
                };
            })
            .catch(err => {
                console.log('Internal error while search the data', err);
                return null;
            });
    }
    catch (e) {
        console.log('Error into the data sended');
        console.log(e);
        return null;
    }
};

const getEmail = async (email) => {
    try {
        await Father.find({ 'email': email })
            .then(fathers => {
                if (!fathers[0]) {
                    return fathers[0];
                } else {
                    return null;
                };
            }).catch(err => {
                console.log(err);
                return null;
            })
    } catch(e){
        console.log(e);
        return null;
    }
};

module.exports = { getAllFather, getEmail }