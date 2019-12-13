const express = require('express')
const knex = require('./db/knex.js')
const app = express()
app.use(express.json())
app.get('/api', (req, res) => {
  res.send('Welcome to Multitetris-API')
})

app.get('/api/game', async (req, res) =>{
  let results = await knex('game')
              
  res.json(results)
  console.log("get game" + JSON.stringify(req.body))
})

app.get('/api/bestPlayer', async (req, res) =>{
  let results = await knex('game')
                      .select('best_id')
  res.json(results)
  console.log("get id of strongest player" + JSON.stringify(req.body))
})

app.get('/api/kill', async (req, res) =>{
  let results = await knex('game')
                      .select('kill_id')
  res.json(results)
  console.log("get id of weakest player" + JSON.stringify(req.body))
})

app.get('/api/enemyattacked/:iduser', async (req, res) =>{
  let results = await knex('user')
              .where('iduser', req.params.iduser)
              .select('attacked')
  res.json(results)
  console.log("get attacked of enemy" + JSON.stringify(req.body))
})

app.get('/api/attacker/:iduser', async (req, res) =>{
  let results = await knex('user')
              .where('iduser', req.params.iduser)
              .select('attacker_id')
  res.json(results)
  console.log("get attacker of user" + JSON.stringify(req.body))
})

app.get('/api/attacked/:iduser', async (req, res) =>{
  let results = await knex('user')
              .where('iduser', req.params.iduser)
              .select('attacked')
  res.json(results)
  console.log("get attacked of user" + JSON.stringify(req.body))
})

app.get('/api/gamestarter', async (req, res) =>{
  let results = await knex('game')
              .select("gamestarter")
  res.json(results)
  console.log("get gamestarter" + JSON.stringify(req.body))
})

app.get('/api/user', async (req, res) =>{
  let results = await knex('user')
              
  res.json(results)
  console.log("get user" + JSON.stringify(req.body))
})

app.get('/api/user/:name', async (req, res) =>{
  let results = await knex('user')
                      .where('name', req.params.name) 
                      .select('iduser')
  res.json(results)
  console.log("get user" + JSON.stringify(req.body))
})

app.get('/api/user_alive', async (req, res) =>{
  let results = await knex('user')
                      .where('alive', 1)
  res.json(results)
  console.log("get user_alive" + JSON.stringify(req.body))
})

app.get('/api/leaderboardwinner', async (req, res) =>{
  let results = await knex('user')
                      .orderBy('points', 'desc')
  res.json(results)
  console.log("leaderboardwinner" + JSON.stringify(req.body))
})

app.get('/api/leaderboardloser', async (req, res) =>{
  let results = await knex('user')
                      .orderBy('points', 'asc')
  res.json(results)
  console.log("get leaderboardloser" + JSON.stringify(req.body))
})

app.post('/api/user', async (req, res) =>{
  let results = await knex('user')
                      .insert({
                          "name": req.body.name,
                          "level": 1,
                          "points": 0,
                          "attacked": 0,
                          "alive": 1,
                      })
  res.json(results)
  console.log("post user" + JSON.stringify(req.body))
})

app.put('/api/user/:iduser', async (req, res) =>{
  let results = await knex('user')
                      .update({
                        "name": req.body.name,
                        "level": req.body.level,
                        "points": req.body.points,
                        "attacked": req.body.attacked,
                        "attacker_id": req.body.attacker_id,
                        "alive": req.body.alive,
                        "target_id": req.body.target_id,
                      })
                      .where('iduser', req.params.iduser)
  res.json(results)
  console.log("update user" + JSON.stringify(req.body))
})

app.put('/api/gamestarter/:idgame', async (req, res) =>{
  let results = await knex('game')
                      .update({
                        "gamestarter": req.body.gamestarter
                      })
                      .where("idgame", req.params.idgame)
  res.json(results)
  console.log("update gamestarter" + JSON.stringify(req.body))
})

app.put('/api/game/:idgame', async (req, res) =>{
  let results = await knex('game')
                      .update({
                        "game_is_running": req.body.game_is_running,
                        "best_id": req.body.best_id,
                        "kill_id": req.body.kill_id,
                      })
                      .where("idgame", req.params.idgame)
  res.json(results)
  console.log("update best and worst players" + JSON.stringify(req.body))
})

app.listen(3000, () => console.log("Listening on port 3000"))