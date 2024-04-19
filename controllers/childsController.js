const Childs = require('../models/childs')

// 
const getChilds = async (_id) => {
    try {
        await Childs.findById(_id)
            .then((child) => {
                if (!child) {
                    return null;
                }
                return child;
            })
            .catch(err => {
                console.log('Server error obtain the user', err);
                return null;
            });
    } catch (e) {
        console.log('Internal error with the user data');
        console.log(e);
        return null;
    };
};

//Get the childs by the father ID
const getChildsByFather = (_id) => {
    try {
        Childs.find({ 'father': _id })
            .then((childs) => {
                if (childs[0]) {
                    return childs;
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.log('Server error obtaining the user', err)
                return null;
            });
    } catch (e) {
        console.log(e);
        return null;
    }

};

module.exports = { getChildsByFather, getChilds };