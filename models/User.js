const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  image: String,
});

module.exports = model('User', UserSchema);
