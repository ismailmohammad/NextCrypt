import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email missing"]
    },
    password: {
        type: String,
        required: [true, "Email missing"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
    verificationToken: String,
    verificationTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;