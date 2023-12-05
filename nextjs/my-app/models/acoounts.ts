import mongoose, {Schema, Types} from "mongoose";


const AccountSchema: Schema = new Schema({
    _id: {type: String, required: true},
    access_token: {type: String, required: true},
    scope: {type: String, required: true},
    token_type: {type: String, required: true},
    providerAccountId: {type: String, required: true},
    provider: {type: String, required: true},
    type: {type: String, required: true},
    userId: {type: String, required: true},
});

const Accounts = mongoose.models.accounts||mongoose.model("accounts", AccountSchema);

export default Accounts;