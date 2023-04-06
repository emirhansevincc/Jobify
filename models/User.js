import mongoose, { Schema } from "mongoose";
import validator from "validator";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [20, "Name must be at most 20 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Email is not valid",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "my city",
    }, 
});

export default mongoose.model("User", UserSchema);