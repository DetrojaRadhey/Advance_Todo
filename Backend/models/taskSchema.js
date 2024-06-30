const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const taskSchema = new Schema(
    {
    task:{
        type: String,
        require: true,
        unique: true
    },
    priority:{
        type: Number,
        default: 3,
        min: 1,
        max: 5
    },
    isDone:{
        type: Boolean,
        require: true
    },
    },
    {
        timestamps: true,
    }
);

module.exports=mongoose.model('Task',taskSchema);