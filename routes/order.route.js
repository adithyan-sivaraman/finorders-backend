import express from 'express'
import { orders } from '../database/schema.js';

const orderRoute = express.Router();
orderRoute.post("/add", async (req, res) => {
    const {data,user} = req.body
    try {
        const id = await orders.find({})
        const nextId = "FIN"+ (id.length + 1).toString().padStart(5, '0');
        const services = data.services.split(",");
        const newCustomer = new orders({ ...data,services:services, orderID: nextId,status:"Pending",created_by:user });
        await newCustomer.save();
        res.status(200).json({ message: "order created", orderID: nextId });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error creating order" });
    }


})

orderRoute.post("/list", async (req, res) => {
    const {user}  = req.body;
    const orderData = await orders.find({created_by:user}, { __v: 0, _id: 0 });
    res.status(200).json(orderData);
})


orderRoute.put("/update", async (req, res) => {

    const {orderID,remarks,completeDt} = req.body;
    try {
        await orders.findOneAndUpdate({ orderID: orderID }, {$set:{status:"Completed",remarks:remarks,completeDt:completeDt}})
        res.status(200).json({ message: "order updated" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error updating order" });
    }

})

orderRoute.delete("/delete/:orderID",async(req,res)=>{
    
    const orderID = req.params.orderID;

    try{
        await orders.deleteOne({orderID:orderID})
        res.status(200).json({ message: "order deleted"});
    }
    catch(err){
        res.status(500).json({ message: "error deleting order" });
    }
})

export { orderRoute }