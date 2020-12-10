const Order = require('../../../models/order')
const moment = require('moment')

function orderController (){
    return {
        store(req,res){
            // validate request 
            const {phone, address} = req.body
            if(!phone || !address){
                req.flash('error', 'All Fields Are Required')
                return res.redirect('/card')
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.card.items,
                phone,
                address
            })
            order.save().then(result =>{
                req.flash('success','order placed successfully')
                delete req.session.card
                return res.redirect('/customer/orders')
            }).catch(err =>{
                req.flash('error','something went wrong')
                return res.redirect('/card')
            })  
        },
        async index(req,res){
            const orders = await Order.find({ customerId: req.user._id},null,{ sort:{'createdAt': -1}})
            res.header('cache-Control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0, pre-check=0')
            res.render('customers/orders', {orders: orders, moment: moment})
        },
        async show(req,res){
            const order = await Order.findById(req.params.id)
            if(req.user._id.toString() === order.customerId.toString()){
                return res.render('customers/singleOrder',{order})
            }else{
                return res.redirect('/')
            }
  
        }
    }
}

module.exports = orderController