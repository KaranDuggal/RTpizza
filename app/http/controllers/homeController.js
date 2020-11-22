const Menu = require('../../models/menu');
function homeController(){
    return {
        async index(req,res){
            const pizzas = await Menu.find()
            console.log(pizzas);
            res.render('home', {pizzas: pizzas})
        }
    }
}

module.exports = homeController;