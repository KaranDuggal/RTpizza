import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCard = document.querySelectorAll('.add-to-card')
let cardCounter = document.querySelector('#cardCounter')
function updatecard(pizza){
    axios.post('/update-card',pizza).then(res =>{
        cardCounter.innerText = res.data.totalQty
        new Noty({
            type: "success",
            timeout: 1000,
            text: 'Item Added to Card',
            progressBar: false,
            layout: 'bottomLeft'
        }).show();
    }).catch(err => {
        new Noty({
            type: "error",
            timeout: 1000,
            text: 'Something Went Wronge',
            progressBar: false,
            layout: 'bottomLeft'
        }).show();
    })
}

addToCard.forEach((btn) =>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updatecard(pizza)
        
    })
})

// remove alert message after 5 second 
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

initAdmin()