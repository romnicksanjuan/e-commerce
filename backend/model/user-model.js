const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid: { type: String, unique: true }, // Firebase UID (optional for email/password users)
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Only used for email/password users
    name: { type: String },
    profilePicture: { type: String },
    authProvider: { type: String, enum: ["google", "email", "facebook"] }, // Identify provider
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('users',userSchema)