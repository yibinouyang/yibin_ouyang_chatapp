import ChatMessage from "./modules/ChatMessage";

// imports always go first - if we're importing anything
VTTCue.component('message')

const socket = io();

function setUserId({sID, message}){
    debugger;
    vm.socketID = sID;
}

function runDisconnectMessage(packet){
    debugger;
    console.log(packet);

}

function appendNewMessage(msg){
    //take the incoming message and push it into the vue instance
    vm.message.push(msg);
}

const Vm = new Vue({
    data:{
        socketID:"",
        messages:[],
        message:"",
        nickName:""
    },

         methods:{
            dispatchMessage(){

                console.log('handle send message');

                socket.emit('chat_message', {
                    content:this.message,
                    name: this.nickName || "anonymous"
                    // || is called a double pipe operator or an "or" operator
                    // if this.nickname is set,use it as the value
                    // or just make name "anonymous"
                    
                })
                this.message = "";
            }
        
     },
    components:{

        newmessages: ChatMessage
    },
  

    mounted:function(){
        console.log('mounted');
    }
}).$mount("#apps")


//some event handing ->these events are coming from the server
socket.addEventListener('connected',setUserId);
socket.addEventListener('user_disconnect', setUserId);
socket.addEventListener('new_message',appendNewMessage);