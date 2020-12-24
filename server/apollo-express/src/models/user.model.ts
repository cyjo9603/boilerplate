import { Schema, model, Document } from 'mongoose';

interface UserDocument extends Document {
  name: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
});

export default model<UserDocument>('User', userSchema);
