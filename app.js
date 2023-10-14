import express from 'express'
import cors from 'cors'
import {connection} from './database/connection.js'
import { userRoute } from './routes/user.route.js';
import {custRoute} from './routes/customer.route.js';
import { orderRoute } from './routes/order.route.js';
const app = express();
const PORT = process.env.PORT || 3000;

await connection();

app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoute)
app.use('/customer',custRoute)
app.use('/orders',orderRoute)

app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})




