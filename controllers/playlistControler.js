const Playlist = require('../models/playlistModel');

const getPlaylistByFather = (req,res) => {
    if(req.query && req.query.father){
        Playlist.find({father:req.query.father})
        .then(list => {
            if(list[0]){
                res.json(list).status(200);
            } else {
                res.json().status(422);
            };
        })
        .catch(error => {
            console.log(error);
            res.json({error:'Error searching the playlist'}).status(422);
        });
    }
};

const getPlaylist = (req, res) => {
    if (req.query && req.query.id) {
        Playlist.findById(req.query.id)
            .then((playlist) => {
                res.json(playlist).status(200);
            })
            .catch(err => {
                console.log('Server error obtain the playlist', err)
                res.json().status(422);
            });
    } else {
        console.log('Error with the data in the request')
        res.json().status(422);
    };
};

module.exports = {getPlaylist, getPlaylistByFather};