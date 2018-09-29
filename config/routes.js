//Update the name of the controller below and rename the file.
const cards = require("../controllers/cards.js")
module.exports = function(app){

  app.get('/', cards.index);
  app.get('/cards/add/:id', cards.listCard);
  app.get('/cards/remove/:id', cards.remove);

  app.post('/cards', cards.createCard);
}
