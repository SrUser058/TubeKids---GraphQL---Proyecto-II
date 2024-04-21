const Father = require('../models/father')

// Find the father by ID
const getAllFather = async (_id) => {
    try {
        return await Father.findOne(_id);
    }
    catch (e) {
        console.log('Error into the data sended');
        console.log(e);
        return null;
    }
};
// get the father by the email
const getEmail = async (email) => {
    try {
        return await Father.findOne(email)
    } catch(e){
        console.log(e);
        return null;
    }
};

module.exports = { getAllFather, getEmail }