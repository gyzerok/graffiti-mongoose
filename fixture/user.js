import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number,
    index: true
  },
  weight: Number, // to test "floatish" numbers
  createdAt: Date,
  removed: Boolean,
  nums: [Number],
  strings: [String],
  bools: [Boolean],
  dates: [Date],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var User = mongoose.model('User', UserSchema);

export default User;
