
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // messageContent : {
    //     subject :  {
    //         type:String,
    //         trim: true,
    //     },
    //     content: {
    //         type:String,
    //         trim: true,
    //     },
    //     image : String,
    //     file : String
    // }, 
    content: {
        type: String,
        trim: true
    },
    chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
}, 
{
    timestamps: true,
})


const Messages = mongoose.model("Messages", MessageSchema)

module.exports = Messages;