const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [200, 'Product name cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [8, 'Price cannot exceed 8 digits'],
        default: 0.0
    },
    discountPrice: {
        type: Number,
        maxLength: [8, 'Price cannot exceed 8 digits'],
        default: 0.0
    },
    brand: {
        type: String,
        required: [true, 'Please enter product brand']
    },
    category: {
        type: String,
        required: [true, 'Please select category']
    },
    gender: {
        type: String,
        required: [true, 'Please select gender']
    },
    movement: {
        type: String,
        required: [true, 'Please select movement type']
    },
    caseMaterial: {
        type: String,
        required: [true, 'Please enter case material']
    },
    strapMaterial: {
        type: String,
        required: [true, 'Please enter strap material']
    },
    dialColor: {
        type: String,
        required: [true, 'Please enter dial color']
    },
    waterResistance: {
        type: String,
        default: '30m'
    },
    warranty: {
        type: Number,
        default: 2
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Stock cannot exceed 5 digits'],
        default: 1
    },
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);