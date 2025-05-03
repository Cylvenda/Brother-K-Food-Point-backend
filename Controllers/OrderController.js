import orderModels from "../Models/OrderModels.js"
import userModels from "../Models/UserModels.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// place user order
const placeOrder = async (req, res) => {

    const frontend_url = 'http://localhost:5173'

    try {
        const newOrder = new orderModels({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address

        })
        await newOrder.save();
        await userModels.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "TZS",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "TZS",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 1000 * 100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/Verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/Verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: 'Error'})
    }

}
const verifyOrder = async (req, res) => {
    const { orderId, success} = req.body;

    try {
        if(success == "true"){
            await orderModels.findByIdAndUpdate(orderId,{payment:true});
            res.json({success: true, message: "Paid"})
        }else{
            await orderModels.findByIdAndDelete(orderId)
            res.json({success: false, message: "Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModels.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

export { placeOrder, verifyOrder, userOrders }