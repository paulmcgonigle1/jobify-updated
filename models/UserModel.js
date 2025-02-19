import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

//basically if i call this schema but then for that instantce i do .toJSON it wont give back the password
UserSchema.methods.toJSON = function(){
  let obj = this.toObject();
  delete obj.password;
  return obj;
}
export default mongoose.model('User', UserSchema);