var socket = io();
let userName='';
const btn = document.getElementById('btn');
const userInput = document.getElementById('userInput');
const userNameForm = document.querySelector('.user-form');
const loginForm = document.querySelector('.login');
const chatContainer = document.querySelector('.chat-container');
const messages = document.querySelector('.messages');
const messageInput = document.querySelector('#message-input');
const sendBtn = document.getElementById('send-message');

btn.addEventListener('click', (event) =>{
    event.preventDefault();
    userName = userInput.value;

    if(userName) { // make sure the user name should be present
        loginForm.style.display = 'none';
        chatContainer.style.display = 'block';
    }
});

sendBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Just prevention purposes
    
    let data = {
        id: socket.id,
        userName: userName,
        message : messageInput.value,
    }
    socket.emit('data', data);
    appendMessage(data, 'sent');
});

socket.on('data', (data) => {
    if(data.id !== socket.id) {
        appendMessage(data, 'received');
    }
});

function appendMessage(data, message) {
    let div = document.createElement('div');
    div.innerHTML = `${data.userName}: ${data.message}`;
    if(message==='sent') {
        div.className = 'message send';
    } else {
        div.className = 'message';
    }
    messages.appendChild(div);
    messageInput.value='';
}