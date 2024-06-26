const Playlist = require('../models/playlistModel');

const getPlaylistByFather = async (father) => {
    try {
        return await Playlist.find(father);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getPlaylistByChild = async (child) => {
    try {
        return await Playlist.find(child)
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getAllPlaylist = async (_id) =>{
    try {
        return await Playlist.findOne(_id);
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {getPlaylistByFather, getPlaylistByChild, getAllPlaylist};