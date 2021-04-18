const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter a email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [2, 'Minimum password length id 2 characters']
  }
});

// fire funtion after doc daved to database
// UserSchema.post('save', (doc, next) => {
//   console.log('saved', doc);
//   next();
// });

// fire a function before doc saved to database

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
UserSchema.statics.login = async function(email, password){
  const user = await this.findOne({email});
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error('invalid password');
  }
  throw Error('incorrect email');
  // console.log('Incorrect Email');
};

const User = mongoose.model('usermodel', UserSchema);

module.exports = User;