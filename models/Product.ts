import { TypeProductModel } from "../types/models";
import mongoose, { Model, model, Schema } from "mongoose";

type ProductModel = Model<TypeProductModel>

const schema = new Schema<TypeProductModel, ProductModel>({
         features: {
            type: String,
            default:false
        },
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        specification: {
            type: String,
            required:false
        },
        categary: {
            type: String,
            required: true
        },
        subCategories: [{
            type: String,
            required: false
        }],
        collections: [
            {
                type:String,
                required: false
            }
        ],
        tags: [
            {
                type: String,
                required: false
            }
        ],
        brand: {
            type: String,
            required: true
        },
        reviews: [
            {
                type: String,
                required: false
            }
        ],
        store: {
            type: String,
            required: true
        },
        productVariants: [
            {
                type: String,
                required: true
            }
        ],
        images:[
            {
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        price: {
            type: Number,
            default: 0
        },
        discount: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['draf', 'publish', 'archive'],
            default: "draf"
        },
        seoTitle:{
            type: String,
            required: false
        },
        seoDescription:{
            type: String,
            required: false
        },
        seoSlug:{
            type: String,
            required: false
        },
        weight: {
            type: Number,
            default: 0
        },
        unit: {
            type: String,
            default: 'kg'
        },
        inventory: {
            type: String,
            enum: ["instock", "outstock"],
            default: "instock"
        },
        sku: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
}, {
    timestamps: true
})

const product = mongoose.models.Product ||
                model<TypeProductModel, ProductModel>("Product", schema)

export default product