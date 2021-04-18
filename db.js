const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/myNewDB';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connected.'))
  .catch(err=> console.log(err.message));