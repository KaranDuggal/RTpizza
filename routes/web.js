const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cardController = require('../app/http/controllers/customers/cardController')
const guest = require('../app/http/middleware/guest')


function initRoutes(app){
    app.get('/',homeController().index);
    
    app.get('/login',guest,authController().login);
    app.post('/login',authController().postLogin);

    app.get('/register',guest,authController().register);
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)

    app.get('/card',cardController().index);
    app.post('/update-card',cardController().update)
}

module.exports = initRoutes;