import mongoose from 'mongoose'

const RoutesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    routes_list: {
        type: [String],
        required: true,
    },
    range: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    group_size: {
        from: {
            type: Number,
        },
        to: {
            type: Number,
        },
    },
    info: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: true,
    },
    gallery: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.routes || mongoose.model('routes', RoutesSchema)
export default Dataset