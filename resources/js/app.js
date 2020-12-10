import axios from 'axios'
import Noty from 'noty'
import { create } from '../../app/models/menu'
import { initAdmin } from './admin'
import moment from 'moment'

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

// change order status 
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value : null 
order = JSON.parse(order)
let time = document.createElement('small')
function updateStatus(order){
    let stepCompleted = true
    statuses.forEach((status)=>{
         let dataProp = status.dataset.status
         if(stepCompleted){
            status.classList.add('step-completed')
         }
         if(dataProp === order.status){
            stepCompleted = false
            time.innerText= moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
             if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
             }
         }
    })
}

updateStatus(order);

// socket 
let socket = io()
if(order){
    socket.emit('join', `order_${order._id}`)
}

socket.on('orderUpdate',(data)=>{
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    console.log(data);
})
