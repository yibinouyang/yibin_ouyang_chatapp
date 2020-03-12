
export default {
    props: ['msg'],

    template: `
        <p class="new-message" :class="{ 'my-message' : matchedID }" :style="styleObj">
            <img class="message-avatar" :src="msg.message.avatar.src">
            <span class="message-content">
                <span class="prompt">{{msg.message.name}} says:</span>
                {{msg.message.content}}
            </span>
        </p>
    `,

    data: function() {
        return this.$parent.socketID == this.msg.id ? {
            matchedID: true,
            styleObj: {
                // my message: white font + colorful background + white border
                color: 'white',
                borderColor: 'none',
                backgroundColor: this.msg.color
            }
        } : {
            matchedID: false,
            styleObj: {
                // other messages: colorful font + white background + colorful border
                color: this.msg.color,
                borderColor: this.msg.color,
                backgroundColor: 'white'
            }
        };
    }
};