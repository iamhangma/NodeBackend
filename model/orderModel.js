const mongoose=require ('mongoose');

const orderSchema =new mongoose.Schema({
    //user order products
    orderId:{
        type: String,
        require:true,
        default: 'ORDER-NO'+Date.now()
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    status:{
        type: String,
        required: true,
        default: 'Pending'
    },
    quantity:{
        type: Number,
        required: true,
    }

});

const Orders=mongoose.model('orders',orderSchema);
module.exports=Orders;