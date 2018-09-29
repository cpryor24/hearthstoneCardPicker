const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    if(!req.session.listCard) {
      req.session.listCard = [];
    }
    knex('cards').then( (data) => {
      res.render('index', {newCards: data, listCard: req.session.listCard});
    })
  },
  createCard: (req, res) => {
    knex('cards')
      .insert({
        mana: req.body.mana,
        attack: req.body.attack,
        health: req.body.health,
        description: req.body.description
      })
      .then( () => {
        res.redirect('/');
      })
  },
  listCard: (req, res) => {
    knex('cards')
      .where('id', req.params.id)
      .then( (data) => {
        req.session.listCard.push(data[0]);
        res.redirect('/');
      })
  },
  remove: (req, res) => {
    let deck = req.session.listCard;
    if(deck.length == 1) {
      req.session.listCard = [];
      res.redirect('/');
      return;
    }
    for(let i = 0; i < deck.length; i++){
      if(deck[i].id == req.params.id){
        deck.splice(i, 1);
        res.redirect('/');
        return;
      }
    }
    res.redirect('/');
  }
}
