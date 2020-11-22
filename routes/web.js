const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cardController = require('../app/http/controllers/customers/cardController')


function initRoutes(app){
    app.get('/',homeController().index);
    app.get('/login',authController().login);
    app.get('/register',authController().register);

    app.get('/card',cardController().index);
    app.post('/update-card',cardController().update)
}

module.exports = initRoutes;