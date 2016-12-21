import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let userModel = new Schema({
  name:{type: String},
  email:{type: String}
});

module.exports = mongoose.model('User',userModel);
