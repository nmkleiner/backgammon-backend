// collection name = users

'use strict'
const mongoService = require('./mongo.service')
// const ObjectId = require('mongodb').ObjectId;

module.exports = {
    signUp,
    login,
    // query,
    // getById,
    // update,
    // remove,
    // add
}
function login (userName, password) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const playerCollection = dbConn.collection('users')
            playerCollection.findOne({userName})
            return playerCollection.findOne({userName})
        })
        .then(user => {
            if (password === user.password) return user
            else return {};
    })
}

function signUp(user) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const playerCollection = dbConn.collection('users');
            playerCollection.insertOne(user)
        })
}

// function query() {
//     return mongoService.connectToDB()
//         .then(dbConn => {
//             const playerCollection = dbConn.collection('players');
//             return playerCollection.find({}).toArray()
//         })
// }

// function getById(playerId) {
//     playerId = new ObjectId(playerId)
//     return mongoService.connectToDB()
//         .then(dbConn => {
//             const playerCollection = dbConn.collection('players');
//             return playerCollection.findOne({ _id: playerId })
//         })
// }


// function update(user) {
//     const userId = new ObjectId(user._id)
//     delete user._id;
//     return mongoService.connectToDB()
//         .then(dbConn => {
//             const playerCollection = dbConn.collection('players');
//             playerCollection.findOneAndUpdate({ _id: userId }, { $set: user })
//         })
//     }
    
    



// function remove(userId) {
//     userId = new ObjectId(userId)
//     return mongoService.connectToDB()
//         .then(dbConn => {
//             const playerCollection = dbConn.collection('players');
//             return playerCollection.remove({ _id: userId })
//         })
// }

// function add(user) {
//     return mongoService.connectToDB()
//         .then(dbConn => {
//             const playerCollection = dbConn.collection('players');
//             return playerCollection.insert(user)
//         })
// }
