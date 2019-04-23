const userService = require('../services/user.service')
function addRoutes(app) {


    app.put('/login', (req, res) => {
        console.log('0',req.body)
        const { userName, password } = req.body
        console.log('1',userName,password)
        userService.login(userName, password)
            .then(user => {
                if (user.userName) {
                    req.session.loggedInUser = user
                    console.log(2,user)
                    return res.json(user)
                }
                else res.end()
            })
    })

    app.post('/logout', (req, res) => {
        req.session.destroy();
        res.end();
    });

    app.post('/signup', (req, res) => {
        const user = req.body
        userService.signUp(user)
            .then(() => {
                res.end()
            })
    })


    // app.get('/player', (req, res) => {
    //     playerService.query()
    //         .then(players => res.json(players))
    // })

    // app.get('/player/:playerId', (req, res) => {
    //     const playerId = req.params.playerId;
    //     playerService.getById(playerId)
    //         .then(player => res.json(player))
    // })

    // app.delete('/player/:playerId', (req, res) => {
    //     const playerId = req.params.playerId;
    //     playerService.remove(playerId)
    //         .then(() => res.end())
    // })

    // app.post('/player', (req, res) => {
    //     const player = req.body;
    //     playerService.add(player)
    //         .then(addedUser => res.json(addedUser))
    //     })
        
    //     app.put('/player/:playerId', (req, res) => {
    //         const player = req.body
    //         playerService.update(player)
    //             .then(() => res.end())
    //     })
    
    //     app.get('/player/:playerId', (req, res) => {
    //         const playerId = req.params.playerId
    //         playerService.getById(playerId)
    //             .then((player) => res.json(player))
    //     })



}

module.exports = addRoutes
