import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    active:{
        type: Boolean,
        required: true,
    },
    password:{
        type: String,
        required: false,
    }
    
})

const CustomerSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    custname:{
        type: String,
        required: true,
    },
    custgst:{
        type: String,
        required: true,
    },
    contactname:{
        type: String,
        required: true,
    },
    contactemail:{
        type: String,
        required: true,
    },
    contactmobile:{
        type: String,
        required: true,
    },
    addr1:{
        type: String,
        required: true,
    },
    addr2:{
        type: String,
        required: true,
    },
    pincode:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
})

const OrderSchema = new mongoose.Schema({
    orderID:{
        type: String,
        required: true,
    },
    orderDt: {
        type: String,
        required: true,
    },
    custname: {
        type: String,
        required: true,
    },
    endDt: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    services:{
        type: Array,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    created_by:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    completeDt:{
        type: String,
        required: false,
    },
    remarks:{
        type: String,
        required: false,
    },

})

const users = mongoose.model('users', userSchema,"users");
const customers = mongoose.model('customers', CustomerSchema,"customers");
const orders = mongoose.model('orders', OrderSchema,"orders");

export {users,customers,orders};