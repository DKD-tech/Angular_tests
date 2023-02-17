// je vais creer mon premier schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let Book = new Schema({
    name: {
        type:String
    },
    price:{
        type:String
    },
    description: {
        type:String
    }
},
    {
       collection:'books' 
})

// exportons le module 
module.exports = mongoose.model('Book', Book)
