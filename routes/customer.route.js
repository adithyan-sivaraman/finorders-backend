import express from 'express'
import { customers } from '../database/schema.js';

const custRoute = express.Router();
custRoute.post("/add", async (req, res) => {
    const { custname, custgst } = req.body;

    const login = await customers.findOne({ custname: custname, custgst: custgst });
    if (login !== null) {
        res.status(401).json({ message: "customer exists" })
        return;
    }

    try {
        const id = await customers.find({})
        const nextId = custname[0] + (id.length + 1).toString().padStart(6, '0');
        const newCustomer = new customers({ ...req.body, id: nextId });
        await newCustomer.save();
        res.status(200).json({ message: "customer created", custId: nextId });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error creating customer" });
    }


})

custRoute.get("/list", async (req, res) => {
    const customerData = await customers.find({}, { __v: 0, _id: 0 });
    res.status(200).json(customerData);
})


custRoute.put("/edit", async (req, res) => {

    const { id, contactname, contactemail, contactmobile, mobile, addr1, addr2, state, pincode } = req.body;
    try {
        await customers.findOneAndUpdate({ id: id }, req.body)
        res.status(200).json({ message: "customer updated" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error updating user" });
    }

})

custRoute.post("/search", async (req, res) => {

    const { custname } = req.body;
    const custData = await customers.find({ custname: { $regex: custname, $options: 'i' } },{custname:1,custgst:1,_id:0})
    res.status(200).json(custData);



})

export { custRoute }