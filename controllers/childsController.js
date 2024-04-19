const Childs = require('../models/childs')

// Obtener los datos del usuario principal de la BD
const getChilds = (req, res) => {
    if (req.query && req.query.id) {
        Childs.findById(req.query.id)
            .then((childs) => {
                res.json(childs).status(200);
            })
            .catch(err => {
                res.status(404);
                console.log('Server error obtain the user', err);
                res.json({ error: "The user doesnt exist" });
            });
    } else {
        console.log('Internal error with the user data');
        res.json().status(404);
    };
};

module.exports = {getChilds};