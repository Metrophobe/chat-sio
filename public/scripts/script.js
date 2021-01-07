const socket = io(); //Step 1 - call the io method 

let user, send,clear,message = null;

let getTime = () => {
    let today = new Date();
    return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

let init = () =>{
    
    send = document.getElementById('send');
    clear = document.getElementById('clear');
    message = document.getElementById('message');
    
    send.addEventListener('click',()=>{
        socket.emit('user-message',{user:user.value, msg:message.value}); //Step 2 use emit() to send a message to the hub 
        messages.innerHTML += `<span id="me">me - ${message.value}<h5>sent: ${getTime()}</h5></span>`;
        message.value = "";
    })

    clear.addEventListener('click',() => {
        message.value = "";
    })

    user = document.getElementById('user');
}

document.addEventListener('DOMContentLoaded', ()=>{
    init();
});

//.on() handles the events sent by the server 
socket.on('messaging', data => {
    messages.innerHTML += `<h4> ${data} </h4aaa>`
});

//and you can have multiple ones.... 
socket.on('shared-message', data => {
    messages.innerHTML += `<span id="user"> ${data.user} - ${data.msg}<h5>received: ${getTime()}</h5></span>`;
})
