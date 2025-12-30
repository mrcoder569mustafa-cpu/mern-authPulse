import mongoose from 'mongoose';

const { Schema } = mongoose;   // ✅ Correct

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model("accounts", UserSchema);

export default UserModel;
