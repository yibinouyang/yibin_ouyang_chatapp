
export const NewConnMessage = {
    props: ['msg'],

    template: `
        <p v-if="matchedID" class="notification">
            <span class="dot" :style="styleObj"></span>
            You
            <span class="smaller">({{msg.id}})</span>
            joined chatting ...
        </p>
        <p v-else class="notification">
            <span class="dot" :style="styleObj"></span>
            New user
            <span class="smaller">({{msg.id}})</span>
            joined chatting ...
        </p>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
            styleObj: {
                // colorful prefix-dot
                backgroundColor : this.msg.color
            }
        };
    }
};

export const DisconnMessage = {
    props: ['msg'],

    template: `
        <p v-if="matchedID" class="notification">
            <span class="dot" :style="styleObj"></span>
            You
            <span class="smaller">({{msg.id}})</span>
            left chatting ...
        </p>
        <p v-else class="notification">
            <span class="dot" :style="styleObj"></span>
            New user
            <span class="smaller">({{msg.id}})</span>
            left chatting ...
        </p>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
            styleObj: {
                // colorful prefix-dot
                backgroundColor : this.msg.color
            }
        };
    }
};