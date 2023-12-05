import mongoose, {Schema, Types} from "mongoose";


const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    email_verified: {type: Boolean, required: true},
});

const User = mongoose.models.users||mongoose.model("users", UserSchema);

export default User;