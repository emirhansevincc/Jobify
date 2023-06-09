import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        select: false, // its for not showing password in response
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "lastName",
    }, 
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "my city",
    }, 
});

UserSchema.pre("save", async function () {
    // console.log(this.modifiedPaths());      // if you changed name : [ 'name' ]
    // console.log(this.isModified("name"));   // true

    if (!this.isModified("password")) return

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            userId: this._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);