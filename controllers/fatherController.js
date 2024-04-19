const Father = require('../models/father')

const getAllFather = (req, res) => {
    if (req.query.email && req.query.password) {
        Father.find({'email': req.query.email,'password' : req.query.password})
            .then(fathers => {
                //console.log(fathers[0].email,fathers[0].password);
                //console.log(req.query.email,req.query.password);
                if(fathers[0].email == req.query.email && fathers[0].password == req.query.password){
                    //console.log(1);
                    res.json(fathers).status(200);
                }else{
                    //console.log(2);
                    res.json().status(402);
                };
            })
            .catch(err => {
                res.status(404);
                console.log('Internal error while search the data', err);
                res.json({ error: 'Intentelo de nuevo mas tarde' });
            });
            /*.finally((verification)=>{
                res.json({verification:false});
            })*/
    } else {
        res.status(404);
        console.log('Imposible encontrar el usuario');
        res.json({ error: 404 });
    }
};

const getEmail = (req, res) => {
    if(req.query.email){
        Father.find({'email': req.query.email})
        .then(fathers => {
            if(!fathers[0]){
                res.json(fathers).status(201);
            } else {
                res.json({'verification':false}).status(401);
            }
        }).catch(err => {
            res.json({error:'Imposible encontrar el correo en la bd'}).status(401);
            console.log(err);
        })
    } else {
        res.json({error:'Error en los datos enviados'}).status(401);
    };
};

module.exports = {getAllFather, getEmail}