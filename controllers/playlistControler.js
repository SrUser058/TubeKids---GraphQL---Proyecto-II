const Playlist = require('../models/playlistModel');

const getPlaylistByFather = async (_id) => {
    try {
        await Playlist.find({ 'father': _id})
            .then(list => {
                if (list[0]) {
                    return list;
                } else {
                    return null;
                };
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    } catch (e) {
        console.log(e);
        return null;
    }
};



module.exports = {getPlaylistByFather };