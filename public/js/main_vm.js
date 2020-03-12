import ChatMessage from './modules/ChatMessage.js';
import {NewConnMessage, DisconnMessage} from './modules/NotificationMessage.js';

const socket = io();

function logConnect({sID, message}) { //{sID, message}
    console.log(sID, message);
    vm.socketID = sID;
}

function appendMessage(message) {
    console.log('appending message');
    // ensure the component is 'chatMessage'
    message.type = 'chatMessage';
    vm.messages.push(message);
}

function appendNotification(message) {
    console.log('appending notification');
    // use message event string to
    // determine the correct component
    if (message.event === 'newConn') {
        message.type = 'newConnMessage';
    } else if (message.event === 'disconn') {
        message.type = 'disconnMessage';
    } else {
        console.log(`unkown message type: ${message.type}`);
        return;
    }
    vm.messages.push(message);
}

// create Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        avatar: { name: 'Anonymous', src: 'img/Anonymous.jpg'},
        message: "",
        messages: [],
        avatars: [
            { name: 'Anonymous', src: 'img/Anonymous.jpg'},
            { name: 'Hawkeye', src: 'img/Hawkeye.jpg'},
            { name: 'Spider Man', src: 'img/SpiderMan.jpg'},
            { name: 'Scarlet Witch', src: 'img/ScarletWitch.jpg'},
            { name: 'Black Widow', src: 'img/BlackWidow.jpg'},
            { name: 'Black Panther', src: 'img/BlackPanther.jpg'},
            { name: 'Iron Man', src: 'img/IronMan.jpg'},
            { name: 'Captain America', src: 'img/CaptainAmerica.jpg'},
            { name: 'Thor', src: 'img/Thor.jpg'},
            { name: 'Hulk', src: 'img/Hulk.jpg'}
        ]
    },

    methods: {
        dispatchMessage() {
            // emit message event from the client side
            socket.emit('chat message', {
                content: this.message,
                name: this.nickname || "Anonymous",
                avatar: this.avatar
            });

            // reset the message field
            this.message = "";

        }
    },
    components: {
        chatMessage: ChatMessage,
        newConnMessage: NewConnMessage,
        disconnMessage: DisconnMessage
    }
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('notification', appendNotification);
socket.addEventListener('disconnect', appendMessage); // this one is optional