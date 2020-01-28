// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement
import message from "./modules/ChatMessage.js";

export default {
    props:['msg'],
    
    template:`
        <p class="new-message">
           <span>{{msg.message.name}} says:</span>
           {{msg.message.content}}
        </p>
    `,

    data: function(){
        //nothin here yet , but there will be
        return { message: "howdy do"}

    }
}