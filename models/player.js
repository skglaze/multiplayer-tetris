const mongoose = require('./connection')

global.sampleModel = [];

const PlayerSchema = new mongoose.Schema(({
    username: String,
    mmr: Number,
    wins: Number,
    losses: Number
}))

const Player = mongoose.Model('player', PlayerSchema);

const getAllPlayers = () => {
    return Player.find({})
}

const getOnePlayer = (id) => {
    return Player.findById({ id })
}

const addNewPlayer = (newPlayerData) => {
    return Player.create(newPlayerData)
}

const updatePlayer = (id, playerData) => {
    return Player.updateOne({ _id: id }, playerData)
}

const deletePlayer = (id) => {
    return Player.deleteOne({ _id: id })
}

module.exports = {
    getAllPlayers,
    getOnePlayer,
    addNewPlayer,
    updatePlayer,
    deletePlayer
}