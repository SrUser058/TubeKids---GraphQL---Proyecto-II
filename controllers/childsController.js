const Childs = require('../models/childs')

// 
const getChilds = async (_id) => {
    try {
        return await Childs.findOne(_id)
    } catch (e) {
        console.log('Internal error with the user data');
        console.log(e);
        return null;
    };
};

//Get the childs by the father ID
const getChildsByFather = async (father) => {
    try {
        return await Childs.find(father)
    } catch (e) {
        console.log(e);
        return null;
    }

};

module.exports = { getChildsByFather, getChilds };