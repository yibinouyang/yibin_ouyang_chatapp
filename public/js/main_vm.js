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
            { name: 'Blue One', src: 'img/BlueOne.jpg'},
            { name: 'Green One', src: 'img/GreenOne.jpg'},
            { name: 'Yellow One', src: 'img/YellowOne.jpg'},
            { name: 'Purple One', src: 'img/PurpleOne.jpg'},
            { name: 'Red Brother', src: 'img/RedBrother.jpg'},
            { name: 'Orange One', src: 'img/OrangeOne.jpg'},
            { name: 'White One', src: 'img/WhiteOne.jpg'},
            { name: 'Black One', src: 'img/BlackOne.jpg'},
            { name: 'Skyblue One', src: 'img/SkyblueOne.jpg'}
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