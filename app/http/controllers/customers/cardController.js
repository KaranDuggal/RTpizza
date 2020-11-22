function cardController() {
    return {
        index(req, res) {
            res.render('customers/card');
        },
        update(req, res) {
            // let card = {
            //     items: {
            //         pizzaId: {item: pizzaObject,qyt:0 },
            //     },
            //     totalQty:0,
            //     totalPrice:0
            // }
            if (!req.session.card) {
                req.session.card = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let card = req.session.card
            // check  items dose not exist in card 
            if (!card.items[req.body._id]) {
                card.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                card.totalQty = card.totalQty + 1;
                card.totalPrice = card.totalPrice + req.body.price
            }else{
                card.items[req.body._id].qty = card.items[req.body._id].qty + 1
                card.totalQty = card.totalQty+1
                card.totalPrice = card.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.card.totalQty })
        }
    }
}

module.exports = cardController;